# Generated by Django 5.0.4 on 2024-04-25 09:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_account_is_superuser'),
    ]

    operations = [
        migrations.AddField(
            model_name='projectcategory',
            name='photo',
            field=models.ImageField(default='../photos/category_default_photo.png', upload_to='photos/%y/%m/%d'),
        ),
    ]