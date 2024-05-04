#models.py
from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser



class AccountManager(BaseUserManager):

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        account = self.model(email=email, **extra_fields)
        account.set_password(password)
        account.save(using=self._db)
        return account

    def create_superuser(self, email, password=None, **extra_fields):
        account= self.create_user(email, password, **extra_fields)
        account.is_staff=True
        account.is_superuser=True
        account.type=1
        account.save()
        return account


class Account(AbstractBaseUser):
    
    id = models.AutoField(primary_key=True)
    email = models.CharField(unique=True, max_length=60)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    creation_date = models.DateTimeField(auto_now_add=True)
    date_of_birth = models.DateField(null=True)
    profile_photo = models.ImageField(upload_to='photos/%y/%m/%d', default='../photos/user_default_photo.jpg')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser=models.BooleanField(default=False)
    USER_TYPE_CHOICES = (
        (1, 'system_admin'),
        (2, 'product_owner'),
    )
    type = models.IntegerField(choices=USER_TYPE_CHOICES, default=2)

    USERNAME_FIELD = 'email'
    objects = AccountManager()
    def __str__(self):
        return self.email
    
    def has_perm(self, perm, obj=None):
        return self.is_superuser
    def has_module_perms(self, app_label):
        return self.is_superuser


class ProjectCategory(models.Model):
    id = models.AutoField(primary_key=True)
    category_name=models.CharField(max_length=50, unique=True)
    photo = models.ImageField(upload_to='photos/%y/%m/%d', default='../photos/category_default_photo.png')

    def __str__(self):
        return  self.category_name



class Project(models.Model):
    id = models.AutoField(primary_key=True)
    title=models.CharField(max_length=100)
    description=models.TextField()
    creation_date=models.DateTimeField(auto_now_add=True)
    product_owner_id=models.ForeignKey(Account,on_delete=models.CASCADE, related_name='projects')
    category_id=models.ForeignKey(ProjectCategory,on_delete=models.PROTECT,related_name="projects")
    def __str__(self):
        return f"{self.id} - {self.title}"




class Requirements(models.Model):
    id = models.AutoField(primary_key=True)
    requirement_text=models.TextField()
    REQUIREMENT_PRIORITY_CHOICES = (
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),  )
    requirements_priority=models.CharField(max_length=10, choices=REQUIREMENT_PRIORITY_CHOICES)
    project_id=models.ForeignKey(Project,on_delete=models.CASCADE, related_name='requirements')
    addition_date=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.id} - {self.requirement_text}"

