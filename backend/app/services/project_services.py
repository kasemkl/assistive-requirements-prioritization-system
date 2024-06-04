import csv
import openpyxl
from dateutil import parser
from app.models import Requirements
from app.mongoDB_models import Review
# from app.services.AI.matching import generate_embeddings,makeMatching
from app.serializers.project_management import RequirementSerializer



class requirements_collector_template:
    def __init__(self,project):
        self.project=project
        self.parsed_requirements=[]
    
    def add_from_file_req (self,data):
        self.parse_data(data)
        self.save_requirements()
    
    def parse_data(self, data):
        raise NotImplementedError("The subclasses of CSV or Excel files must implement this")
    
    def save_requirements(self):
        requirements_objects = [
            Requirements(
                requirement_text=req_text,
                requirements_priority=req_priority,
                project_id=self.project
            )
            for req_text, req_priority in self.parsed_requirements
        ]
        Requirements.objects.bulk_create(requirements_objects) # insert multiple records into the database in a single query

class CSV_File_requirements(requirements_collector_template):
    def parse_data(self, data):
        reader = csv.reader(data.read().decode("utf-8").splitlines())
        self.parsed_requirements = [(row[0], row[1]) for row in reader]
#reader is an object created by csv.reader,
#which reads the CSV file line by line. Each row is a list where each item represents a cell in that row of the CSV file.

class Excel_file_requirements(requirements_collector_template):
    def parse_data(self, data):
        workbook=openpyxl.load_workbook(filename=data)
        sheet=workbook.active
        self.parsed_requirements = [(row[0].value, row[1].value) for row in sheet.iter_rows(min_row=2)]





