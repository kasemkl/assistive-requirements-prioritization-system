#mongoDB_models.py

from djongo import models

class Review(models.Model):

    text = models.TextField()
    date = models.DateField()
    project_id = models.IntegerField()
    source_id=models.IntegerField()
    sentiment_class=models.TextField()
    type_class=models.TextField()

    class Meta():
        indexes=[
            models.Index(fields=['project_id']),
            models.Index(fields=['source_id']),
        ]
