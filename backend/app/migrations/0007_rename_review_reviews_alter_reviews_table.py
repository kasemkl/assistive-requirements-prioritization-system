# Generated by Django 4.1.13 on 2024-04-28 09:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0006_review'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Review',
            new_name='Reviews',
        ),
        migrations.AlterModelTable(
            name='reviews',
            table='reviews',
        ),
    ]