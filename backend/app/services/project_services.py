import csv
import openpyxl
from app.models import Requirements
from app.mongoDB_models import Review
from datetime import datetime


class BaseCollectorTemplate:
    def __init__(self, project):
        self.project = project
        self.parsed_data = []

    def add_from_file(self, data):
        self.parse_data(data)
        self.save_data()

    def parse_data(self, data):
        raise NotImplementedError("Subclasses must implement the parse_data method")

    def save_data(self):
        raise NotImplementedError("Subclasses must implement the save_data method")

class CSV_File(BaseCollectorTemplate):
    def __init__(self, project, template):
        super().__init__(project)
        self.template = template

    def parse_data(self, data):
        if self.template == 'requirements':
            self.parsed_data = [(row[0], row[1]) for row in data]
        elif self.template == 'reviews':
            self.parsed_data = [{'content': row[0], 'date': datetime.strptime(str(row[1]), '%Y-%m-%d')} for row in data]


    def save_data(self):
        if self.template == 'requirements':
            requirements_objects = [
                Requirements(
                    requirement_text=req_text,
                    requirements_priority=req_priority,
                    project_id=self.project
                )
                for req_text, req_priority in self.parsed_data
            ]
            Requirements.objects.bulk_create(requirements_objects)
        elif self.template == 'reviews':
            review_objects = [
                Review(
                    project_id=self.project,
                    content=review_data['content'],
                    date=review_data['date']
                )
                for review_data in self.parsed_data
            ]
            Review.objects.bulk_create(review_objects)


class Excel_File(BaseCollectorTemplate):
    def __init__(self, project, template):
        super().__init__(project)
        self.template = template

    def parse_data(self, data):
        workbook = openpyxl.load_workbook(data)
        sheet = workbook.active
        if self.template == 'requirements':
            self.parsed_data = [(row[0].value, row[1].value) for row in sheet.iter_rows(min_row=2)]
        elif self.template == 'reviews':
            self.parsed_data = [{'content': row[0].value, 'date': row[1].value} for row in sheet.iter_rows(min_row=2)]

    def save_data(self):
        if self.template == 'requirements':
            requirements_objects = [
                Requirements(
                    requirement_text=req_text,
                    requirements_priority=req_priority,
                    project_id=self.project
                )
                for req_text, req_priority in self.parsed_data
            ]
            Requirements.objects.bulk_create(requirements_objects)
        elif self.template == 'reviews':
            review_objects = [
                Review(
                    project_id=self.project,
                    content=review_data['content'],
                    date=review_data['date']
                )
                for review_data in self.parsed_data
            ]
            Review.objects.bulk_create(review_objects)
