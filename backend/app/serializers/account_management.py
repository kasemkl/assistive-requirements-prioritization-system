from rest_framework import serializers
from app.models import Account





#this serializer is for SIGN UP, create account by admin.
# i see that the admin must not add a product owner password, it must take the default value and we must make the product owner change it later.
class UserSerializer(serializers.ModelSerializer):
    #some validations:
    email=serializers.CharField(max_length=60)
    password=serializers.CharField(min_length=8,write_only=True,default='00000000')
    date_of_birth=serializers.DateField()
    class Meta:
        model=Account
        fields=['id','email','password','first_name','last_name','date_of_birth','profile_photo','type']
    def create(self, validated_data):
        email = validated_data.get('email')
        if Account.objects.filter(email=email).exists():
            raise serializers.ValidationError({'message':'Email already exists.'})
        password = validated_data.pop("password")
        user = super().create(validated_data)
        user.set_password(password)
        user.save()
        return user




class UpdateUserSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    date_of_birth = serializers.DateField(required=False)

    class Meta:
        model = Account
        fields = ['first_name', 'last_name', 'date_of_birth']

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance






