# Generated by Django 5.0.4 on 2024-04-21 08:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_account_is_superuser'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='account',
            name='is_superuser',
        ),
    ]
