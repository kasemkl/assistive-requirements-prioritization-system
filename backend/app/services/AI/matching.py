import json
import numpy as np
import nltk
from nltk.corpus import stopwords
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
from abc import ABC, abstractmethod
from app.models import Requirements  # Assuming Django ORM

# Add the NLTK data path

# nltk.download('stopwords')
# stop_words = set(stopwords.words('english'))

class IReviewMatcher(ABC):
    @abstractmethod
    def make_matching(self, requirements, reviews):
        pass

class BasicMatcher(IReviewMatcher):
    def make_matching(self, requirements, reviews):
        similarity_matrix = generate_embeddings(requirements, reviews)
        similarity_threshold = 0.2
        for requirement_idx, requirement_row in enumerate(similarity_matrix):
            requirement = Requirements.objects.get(id=requirements[requirement_idx]['id'])  # Get the requirement object
            for review_idx, similarity_score in enumerate(requirement_row):
                if similarity_score > similarity_threshold:
                    # Update positive_reviews_count for the requirement
                    if reviews[review_idx]['polarity'] == 'positive':
                        requirement.positive_reviews_count += 1
                    elif reviews[review_idx]['polarity'] == 'negative':
                        requirement.negative_reviews_count += 1
            requirement.save()

def tokenize(text):
    # Simple tokenizer to convert text into a set of words, removing stop words
    tokens = text.lower().split()
    # filtered_tokens = [word for word in tokens if word not in stop_words]
    return set(tokens)

def jaccard_index(x, y):
    intersection_cardinality = len(set.intersection(*[set(x), set(y)]))
    min_len = min(len(set(x)), len(set(y)))
    if min_len == 0:
        return 0
    return intersection_cardinality / min_len

def generate_embeddings(requirements, reviews):
    requirement_texts = [req['requirement_text'] for req in requirements]
    review_texts = [review['text'] for review in reviews]

    requirement_tokens = [tokenize(text) for text in requirement_texts]
    review_tokens = [tokenize(text) for text in review_texts]

    # Compute Jaccard similarity between each pair of requirement and review
    similarity_matrix = np.zeros((len(requirements), len(reviews)))

    for i, req_tokens in enumerate(requirement_tokens):
        for j, rev_tokens in enumerate(review_tokens):
            similarity_matrix[i, j] = jaccard_index(req_tokens, rev_tokens)

    return similarity_matrix


# Example usage
# requirements = [{'id': 1, 'requirement_text': 'Sample requirement text 1'}, ...]
# reviews = [{'id': 1, 'text': 'Sample review text 1', 'polarity': 'positive'}, ...]
# matcher = BasicMatcher()
# matcher.make_matching(requirements, reviews)
