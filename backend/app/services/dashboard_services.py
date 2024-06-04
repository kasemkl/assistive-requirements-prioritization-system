from app.mongoDB_models import Review
from collections import defaultdict


def get_sentiment_reviews_by_month(project_id):
    # Fetch all reviews for the given project
    reviews = Review.objects.filter(project_id=project_id)
    # Structure to hold the aggregated data
    # Defaultdict with a lambda to initialize a dictionary with positive and negative counts
    results = defaultdict(lambda: {'positive_review': 0, 'negative_review': 0})
    # Process each review
    for review in reviews:
        # Format date as 'Month-Year' for grouping
        month_year = review.date.strftime("%Y-%m")
        # Increment the appropriate sentiment count
        if review.sentiment_class.lower() == 'positive':
            results[month_year]['positive_review'] += 1
        elif review.sentiment_class.lower() == 'negative':
            results[month_year]['negative_review'] += 1

    # Convert results to a list of dictionaries for easier consumption by an API
    formatted_results = [
        {'date': key, 'positive_review': value['positive_review'], 'negative_review': value['negative_review']}
        for key, value in sorted(results.items())
    ]

    return formatted_results