# Generated by Django 5.0.4 on 2024-04-21 08:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='is_superuser',
            field=models.BooleanField(default=False),
        ),
    ]