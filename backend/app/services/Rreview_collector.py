
from app.services.AI.NLP import NLPProcessor
from app.services.AI.sentiment import IReviewSentimentAnalyser
from app.services.AI.matching import IReviewMatcher
import csv
import openpyxl
from dateutil import parser
from app.models import Requirements
from app.mongoDB_models import Review
# from app.services.AI.matching import generate_embeddings,makeMatching
from app.serializers.project_management import RequirementSerializer


class ReviewsCollectorTemplate:
    def __init__(self, source, sentiment_analyser: IReviewSentimentAnalyser, review_matcher: IReviewMatcher):
        self.source = source
        self.parsed_reviews = []
        self.nlp_processor = NLPProcessor(sentiment_analyser, review_matcher)

    def add_from_file_rev(self, data):
        self.parse_data(data)
        self.save_reviews()

    def parse_data(self, data):
        raise NotImplementedError("The subclasses of CSV or Excel files must implement this")

    def save_reviews(self):
        review_objects = [
            Review(
                source_id=self.source.id,
                project_id=self.source.project_id.id,
                text=review_data['text'],
                date=review_data['date']
            )
            for review_data in self.parsed_reviews
        ]
        
        # Use NLPProcessor to classify reviews
        self.nlp_processor.make_classification(review_objects)

        Review.objects.bulk_create(review_objects)
        reviews = [{'text': review.text, 'polarity': review.sentiment_class} for review in review_objects]
        req_data = Requirements.objects.filter(project_id=self.source.project_id.id)
        requirements = RequirementSerializer(req_data, many=True).data
        
        # Use NLPProcessor to match reviews with requirements
        self.nlp_processor.make_matching(requirements, reviews)


class CSV_File_reviews(ReviewsCollectorTemplate):
    def parse_data(self, data):
        reader = csv.reader(data.read().decode("utf-8").splitlines())
        self.parsed_reviews = [{'text': row[0], 'date': parser.parse(row[1])} for row in reader]

class excel_file_reviews(ReviewsCollectorTemplate):
    def parse_data(self, data):
        workbook = openpyxl.load_workbook(filename=data)
        sheet = workbook.active
        self.parsed_reviews = [{'text': row[0].value, 'date': parser.parse(str(row[1].value))} for row in sheet.iter_rows(min_row=2)]