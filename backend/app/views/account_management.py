from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import APIView
from django.shortcuts import get_object_or_404
from app.serializers.account_management import  UserSerializer , UpdateUserSerializer
from app.models import Account
from django.contrib.auth.hashers import check_password
from rest_framework.permissions import IsAuthenticated
from app.permissions import IsSystemAdmin, IsProductOwner
from rest_framework.permissions import AllowAny





#done
class signUpView(APIView):
    serializer_class=UserSerializer
    permission_classes=[AllowAny]
    def post(self, request=Request):
        data=request.data
        serializer=self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            response={"message":"user was created successfully","data":serializer.data}
            return Response(data=response,status=status.HTTP_201_CREATED)
        return Response({'message':serializer.errors},status=status.HTTP_400_BAD_REQUEST)



#done
class ProductOwnerAccount(APIView):
# this functionality is only for the system admin..
    serializer_class=UserSerializer
    permission_classes=[IsSystemAdmin]
#create product owner
    def post(self, request=Request):
        data=request.data
        serializer=self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            response={"message":"user was created successfully","data":serializer.data}
            return Response(data=response,status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors,status=status.HTTP_400_BAD_REQUEST)

#get all product owner accounts.
    def get(self, request:Request):
        users = Account.objects.filter(type=2)
        serializer=self.serializer_class(instance=users, many=True)
        response={'message':'users of the system','data':serializer.data}
        return Response(data=response, status=status.HTTP_200_OK)


#done
class userInfoView(APIView):
    serializer_class=UserSerializer
    permission_classes=[IsSystemAdmin | IsProductOwner]
# i put the pk here, for the system admin if he want to see the detailed info about one user(not only the request maker can see his info!)
    def get(self,request:Request, pk:int):
        user=get_object_or_404(Account, pk=pk)
        serializer=self.serializer_class(instance=user)
        response={"message":"the user of this id","data":serializer.data}
        return Response(data=response, status=status.HTTP_200_OK)

# same... 
    def delete(self,request:Request, pk:int):
        print(request)
        user=get_object_or_404(Account,pk=pk)
        user.delete()
        return Response(data={'message':"user has been deleted"}, status=status.HTTP_204_NO_CONTENT)

#done
#only the user(any..)can update his own data.
class updateUserInfo(APIView):
    permission_classes=[IsAuthenticated]
    def patch(self, request:Request):
        user=request.user
        new_data=request.data
        serializer=UpdateUserSerializer(instance=user, data=new_data)
        if serializer.is_valid():
            serializer.save()
            response={'message':'the profile data has been updated successfully', 'data':serializer.data}
            return Response(data=response, status=status.HTTP_200_OK)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#done
#endpoint for password changing only..
class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]
    def put(self, request:Request):
            user = request.user
            old_password = request.data.get('old_password')
            new_password = request.data.get('new_password')
            
            if check_password(old_password, user.password):
                if len(new_password)>=8:
                    user.set_password(new_password)
                    user.save()
                    return Response({'message': 'Password changed successfully'})
                return Response({'message':'the new password need to be more than 8 characters'},status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'detail': 'Old password is incorrect'}, status=status.HTTP_400_BAD_REQUEST)
