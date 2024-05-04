#mongoDB_models.py

from djongo import models

class Review(models.Model):
    project_id = models.ForeignKey('Project', on_delete=models.CASCADE)
    content = models.TextField()
    date = models.DateField()


