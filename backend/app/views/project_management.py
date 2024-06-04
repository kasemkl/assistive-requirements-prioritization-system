from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import APIView
from django.shortcuts import get_object_or_404
from app.models import ProjectCategory , Project, Requirements, Source
from app.serializers.project_management import category_serializer , project_information , RequirementSerializer,project_serializer,sources_serializer
from rest_framework.permissions import IsAuthenticated
from app.permissions import IsSystemAdmin , IsProductOwner
from app.services.project_services import CSV_File_requirements , Excel_file_requirements
from app.services.Rreview_collector import  CSV_File_reviews, excel_file_reviews
from app.mongoDB_models import Review
from app.services.AI.matching import BasicMatcher
from app.services.AI.sentiment import BasicClassifier



#done
class categories_All(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class=category_serializer
    def get(self, request:Request):
        categories=ProjectCategory.objects.all()
        serializer=self.serializer_class(instance=categories, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request:Request):
        if not IsSystemAdmin().has_permission(request, self):
            return Response(data={"message": "You are not authorized to access this resource."}, status=status.HTTP_403_FORBIDDEN)
        data=request.data
        serializer=self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            response={"message":"adding new category successfully","data":serializer.data}
            return Response(data=response, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#done
#view for the system admin to manage the categories.
class category_CRUD_view(APIView):
    permission_classes = [IsSystemAdmin]
    serializer_class=category_serializer
    
    def get(self, request:Request, pk:int):
        category=get_object_or_404(ProjectCategory,pk=pk)
        serializer=self.serializer_class(instance=category)
        response={"message":"the requested category", 'data':serializer.data}
        return Response(data=response, status=status.HTTP_200_OK)

    def put(self, request:Request,pk:int):
        data=request.data
        category=get_object_or_404(ProjectCategory,pk=pk)
        serializer=self.serializer_class(instance=category,data=data)
        if serializer.is_valid():
            serializer.save()
            response={'message':'update the category',"data":serializer.data}
            return Response(data=response,status=status.HTTP_200_OK)
        return Response(data=serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    def delete(self,request:Request, pk:int):
        category=get_object_or_404(ProjectCategory,pk=pk)
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#done
class projectsForOneCategory(APIView):
    permission_classes = [IsSystemAdmin]
    serializer_class=project_information
# this one is for getting all projects for one category - system admin dashboard.
    def get(self, request:Request, category_id:int):
        category=category_id
        projects=Project.objects.filter(category_id=category)
        number_of_projects=projects.count()
        serializer= self.serializer_class(instance=projects, many=True)
        response={'projects':serializer.data,'number_of_projects':number_of_projects}
        return Response(data=response, status=status.HTTP_200_OK)


#done
#views for project information and management.
class projectCRUD(APIView):
    permission_classes = [IsProductOwner]
    serializer_class=project_information

    def get(self, request:Request, pk:int):
        project=get_object_or_404(Project, pk=pk)
        serializer=self.serializer_class(project)
        response={'message':'project of this id', 'data':serializer.data}
        return Response(data=response, status=status.HTTP_200_OK)
    
    def patch(self, request:Request, pk:int):
        data=request.data
        project=get_object_or_404(Project, pk=pk)
        serializer=project_serializer(instance=project, data=data)
        if serializer.is_valid():
            serializer.save()
            response={"message":"project data has edited  successfully",'data':serializer.data}
            return Response(data=response, status=status.HTTP_200_OK)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self,request:Request, pk:int):
        project=get_object_or_404(Project, pk=pk)
        project.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#done
class projects(APIView):
    serializer_class=project_information
    permission_classes=[IsProductOwner]
    def post(self,request:Request):
        data=request.data
        data['product_owner_id'] = request.user.id  # Add product owner to data
        serializer=self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            response={'message':'new project created successfully', 'data':serializer.data}
            return Response(data=response, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self,request:Request):
            product_owner=request.user
            projects=Project.objects.filter(product_owner_id=product_owner)
            serializer=project_serializer(instance=projects, many=True)
            response={'message':'all projects for this user','data':serializer.data,'number':projects.count()}
            return Response(data=response, status=status.HTTP_200_OK)



#done
class projectsForOneUser(APIView):
    permission_classes = [IsSystemAdmin]
    serializer_class=project_information
# this pk is for the user, and i put it for the system admin if he want to see all the projects for one user.
# use can use this one for system user dashboard  
    def get(self,request:Request,pk:int):
        product_owner=pk
        projects=Project.objects.filter(product_owner_id=product_owner)
        number_of_projects=projects.count()
        serializer= self.serializer_class(instance=projects, many=True)
        response={'projects':serializer.data,'number_of_projects':number_of_projects}
        return Response(data=response, status=status.HTTP_200_OK)

#done
#views for requirements management
class requirements_CRUD(APIView):
        permission_classes = [IsProductOwner]
        serializer_class=RequirementSerializer

#need the id of the requirement
        def delete(self,request:Request, pk:int):
            req=get_object_or_404(Requirements,pk=pk)
            req.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

# need the id of the requirement
        def put(self,request:Request, pk:int):
            data=request.data
            req=get_object_or_404(Requirements,pk=pk)
            serializer=self.serializer_class(instance=req, data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(data={'message':'requirement edited successfully','data':serializer.data},status=status.HTTP_200_OK)



#done
class requirements(APIView):
    permission_classes = [IsProductOwner]
    serializer_class=RequirementSerializer  
#id of project.
#return all req for project.
    def get(self,request:Request, pk:int):
        requirements=Requirements.objects.filter(project_id=pk)
        serializer=self.serializer_class(instance=requirements,many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

#done
class add_req(APIView):
    serializer_class=RequirementSerializer
    permission_classes=[IsProductOwner]
    def post(self, request:Request): 
        data=request.data
        serializer=self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            response={"message":"the requirement added successfully", "data":serializer.data}
            return Response(data=response, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class add_req_by_file(APIView):
    permission_classes=[IsProductOwner]
    def post (self, request:Request, pk:int):
        project=get_object_or_404(Project, pk=pk)
        file=request.FILES.get('file')
        if not file:
            return Response(data={'message':"no file provided!"},status=status.HTTP_400_BAD_REQUEST)
        
        if file.name.endswith('.csv'):
            collector= CSV_File_requirements(project)
        elif file.name.endswith('.xlsx') or file.name.endswith('.xls'):
            collector= Excel_file_requirements(project)
        else:
            return Response(data={'message':"unsupported file format!"}, status=status.HTTP_400_BAD_REQUEST)
        
        collector.add_from_file_req(file)
        return Response(data={'message':"requirements saved successfully"}, status=status.HTTP_200_OK)



class Reviews(APIView):
    permission_classes=[IsProductOwner]
    serializer_class=sources_serializer

    def post (self, request:Request, pk:int):
        project=get_object_or_404(Project, pk=pk)
        data=request.data.copy()
        data['project_id']=project.id
        serializer=self.serializer_class(data=data)

        if serializer.is_valid():
            source=serializer.save()
            source.save()
            file=request.FILES.get('file')
            basic_classifier = BasicClassifier()
            basic_matcher = BasicMatcher()
            if not file:
                return Response(data={'message':"no file provided!"},status=status.HTTP_400_BAD_REQUEST)
            if file.name.endswith('.csv'):
                collector= CSV_File_reviews(source,basic_classifier,basic_matcher)
            elif file.name.endswith('.xlsx') or file.name.endswith('.xls'):
                collector= excel_file_reviews(source,basic_classifier,basic_matcher)
            else:
                return Response(data={'message':"unsupported file format!"}, status=status.HTTP_400_BAD_REQUEST)
            

            collector.add_from_file_rev(file)
            return Response(data={'message':"reviews saved successfully"}, status=status.HTTP_200_OK)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self,request: Request,pk:int):
        last_10_reviews = Review.objects.filter(project_id=pk).order_by('id')[:100]
        reviews_data = [{'text': review.text, 'date': review.date} for review in last_10_reviews]
        response= {"data":reviews_data, "message":"reviews related with one project"}
        return Response(data=response , status=status.HTTP_200_OK)

class delete_reviews_source(APIView):
    def delete(self,request:Request,pk:int):
        reviews=Review.objects.filter(source_id=pk)
        reviews.delete()
        reviews_source=get_object_or_404(Source,pk=pk)
        reviews_source.delete()
        response={"message":'the reviews has been deleted successfully'}
        return Response(data=response, status=status.HTTP_204_NO_CONTENT)



class sources(APIView):
    serializer_class=sources_serializer
    permission_classes=[IsProductOwner]

    def get(self, request:Request, pk:int):
        sources=Source.objects.filter(project_id=pk)
        serializer=self.serializer_class(instance=sources, many=True)
        response={"data":serializer.data,"message":"sources of one project"}
        return Response(data=response,status=status.HTTP_200_OK)