from rest_framework import serializers
from app.models import ProjectCategory , Project , Requirements , Account, Source


#this serializer for the category model with out relationships
class category_serializer(serializers.ModelSerializer):
    category_name=serializers.CharField(max_length=50)
    class Meta:
        model=ProjectCategory
        fields=['id','category_name','photo']



#this serializer is for project info with relations
class project_information(serializers.ModelSerializer):
    category_id=serializers.PrimaryKeyRelatedField(queryset=ProjectCategory.objects.all())
    product_owner_id=serializers.PrimaryKeyRelatedField(queryset=Account.objects.all())

    class Meta:
        model=Project
        fields=['id','title','description','product_owner_id','category_id']



#this serializer is for project info without relations
class project_serializer(serializers.ModelSerializer):
    class Meta:
        model=Project
        fields=['id','title','description','category_id']


class RequirementSerializer(serializers.ModelSerializer):
    project_id = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all())

    class Meta:
        model = Requirements
        fields = ['id', 'requirement_text', 'requirements_priority', 'project_id', 'addition_date','positive_reviews_count','negative_reviews_count']


class sources_serializer(serializers.ModelSerializer):
    
    source_name=serializers.CharField(max_length=40)
    class Meta:
        model = Source
        fields=['id','source_name','source_type','project_id']


