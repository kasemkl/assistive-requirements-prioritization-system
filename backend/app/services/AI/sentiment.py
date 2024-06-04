from abc import ABC, abstractmethod
import spacy
from spacytextblob.spacytextblob import SpacyTextBlob


# the interface of the sentiment
from abc import ABC, abstractmethod

class IReviewSentimentAnalyser(ABC):
    @abstractmethod
    def classify_sentiment_reviews(self, reviews):
        pass




class BasicClassifier(IReviewSentimentAnalyser):
    def __init__(self):
        self.nlp = spacy.load('en_core_web_sm')
        if not self.nlp.has_pipe("spacytextblob"):
            self.nlp.add_pipe("spacytextblob")
    
    def classify_sentiment_reviews(self, reviews):
        for review in reviews:
            doc = self.nlp(review.text)
            if doc._.blob.polarity > 0.2:
                review.sentiment_class = 'positive'
            elif doc._.blob.polarity < -0.2:
                review.sentiment_class = 'negative'
            else:
                review.sentiment_class = 'neutral'

































# import spacy
# from spacytextblob.spacytextblob import SpacyTextBlob


# nlp = spacy.load('en_core_web_sm')
# if not nlp.has_pipe("spacytextblob"):
#     nlp.add_pipe("spacytextblob")


# def classify_reviews_based_on_sentiment(reviews):

#     for review in reviews:
#         doc = nlp(review.text)
#         if doc._.blob.polarity > 0.2:
#             review.sentiment_class = 'positive'
#         elif doc._.blob.polarity < -0.2:
#             review.sentiment_class = 'negative'
#         else:
#             review.sentiment_class = 'neutral'