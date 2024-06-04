
from app.services.AI.sentiment import IReviewSentimentAnalyser
from app.services.AI.matching import IReviewMatcher

class NLPProcessor:
    def __init__(self, sentiment_analyser: IReviewSentimentAnalyser, review_matcher: IReviewMatcher):
        self.sentiment_analyser = sentiment_analyser
        self.review_matcher = review_matcher
    
    def make_classification(self, reviews):
        self.sentiment_analyser.classify_sentiment_reviews(reviews)

    def make_matching(self, requirements, reviews):
        self.review_matcher.make_matching(requirements, reviews)
        