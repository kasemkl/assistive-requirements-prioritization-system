from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import APIView
from django.shortcuts import get_object_or_404
from app.permissions import IsSystemAdmin , IsProductOwner
from app.models import ProjectCategory , Project, Account,Requirements
from datetime import datetime
from django.utils.dateformat import DateFormat
from app.mongoDB_models import Review
from app.services.dashboard_services import get_sentiment_reviews_by_month
from app.serializers.project_management import RequirementSerializer
from django.db.models import F, Sum
# admin dashboard for categories
class category_dashboard(APIView):
    permission_classes = [IsSystemAdmin]
    def get(self,request:Request):
        categories=ProjectCategory.objects.all()
        data=[]

        for category in categories:
            projects_number=Project.objects.filter(category_id=category).count()
            category_data={
                "category_name":category.category_name,
                "projects_number":projects_number
            }
            data.append(category_data)
        return Response(data=data,status=status.HTTP_200_OK)


class users_dashboard(APIView):
    permission_classes = [IsSystemAdmin]
    def get(self,request:Request):
        current_year= datetime.now().year
        first_day_of_each_month = []
        
        for month in range(1, 13): 
            first_day = datetime(current_year, month, 1)
            first_day_of_each_month.append(first_day)
        
        dashboard_data = []
        for i in range(len(first_day_of_each_month)-1):
            current_month=first_day_of_each_month[i]
            next_month=first_day_of_each_month[i + 1]
            accounts_count = Account.objects.filter(creation_date__gte=current_month,creation_date__lt=next_month, type=2).count()
            month_name = DateFormat(current_month).format('F')
            data = {'date':month_name , 'accounts_count': accounts_count}
            dashboard_data.append(data)
        return Response(data=dashboard_data, status=status.HTTP_200_OK)

class reviews_pie_chart(APIView):
    # permission_classes=[IsProductOwner]
    def get(self, request:Request, pk:int):
        positive_reviews=Review.objects.filter(project_id=pk, sentiment_class='positive')
        negative_reviews=Review.objects.filter(project_id=pk, sentiment_class='negative')
        neutral_reviews=Review.objects.filter(project_id=pk, sentiment_class='neutral')
        chart_data=[
            {'name':'Positive', 'value':positive_reviews.count()},
            {'name':'Negative','value':negative_reviews.count()},
            {'name':'Neutral','value':neutral_reviews.count()}
            ]
        if(neutral_reviews.count()==0 and negative_reviews.count()==0 and positive_reviews.count()==0):
            chart_data=[]
        return Response(data=chart_data,status=status.HTTP_200_OK)

class reviews_area_chart(APIView):
    # permission_classes=[IsProductOwner]
    def get(self, request:Request, pk:int):
        chart_data=get_sentiment_reviews_by_month(pk)
        return Response(data=chart_data, status=status.HTTP_200_OK)


class Top5Requirement(APIView):

    def get(self, request, pk):
        top_positive_requirements = Requirements.objects.filter(project_id=pk).order_by('-positive_reviews_count')[:10]
        serializer_positive = RequirementSerializer(top_positive_requirements, many=True)

        top_negative_requirements = Requirements.objects.filter(project_id=pk).order_by('-negative_reviews_count')[:10]
        serializer_negative = RequirementSerializer(top_negative_requirements, many=True)

        top_total_requirements = Requirements.objects.filter(project_id=pk).annotate(
            total_reviews=F('positive_reviews_count') + F('negative_reviews_count')
        ).order_by('-total_reviews')[:10]
        serializer_total = RequirementSerializer(top_total_requirements, many=True)

        return Response(
            {
                'top_positive_req': serializer_positive.data,
                'top_negative_req': serializer_negative.data,
                'top_total_req': serializer_total.data
            },
            status=status.HTTP_200_OK
        )
class NumberOfAllReviews(APIView):
    
    def get(self, request, pk):
        reviews_count = Review.objects.filter(project_id=pk).count()
        
        return Response({'reviews_number': reviews_count}, status=status.HTTP_200_OK)
    