from io import BytesIO
import pickle

from fastapi import UploadFile
import nltk
import re
import string
import numpy as np
import pandas as pd
from wordcloud import WordCloud

from nltk.corpus import stopwords
from string import punctuation
from nltk.stem import WordNetLemmatizer

from nltk.tokenize import word_tokenize

nltk.download('wordnet')
nltk.download('omw-1.4')
nltk.download('stopwords')
nltk.download('punkt')

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

stopwords_list = set(stopwords.words('english') + list(punctuation))
lemma = WordNetLemmatizer()

from database.database import CATEGORY_CODES

with open(r'C:\Users\Javier\UPM\TFG\GarmentWise\app\nlp\pickles\fit_words.pkl', 'rb') as f:
    fit_words = pickle.load(f)
with open(r'C:\Users\Javier\UPM\TFG\GarmentWise\app\nlp\pickles\color_words.pkl', 'rb') as f:
    color_words = pickle.load(f)
with open(r'C:\Users\Javier\UPM\TFG\GarmentWise\app\nlp\pickles\quality_words.pkl', 'rb') as f:
    quality_words = pickle.load(f)

with open(r'C:\Users\Javier\UPM\TFG\GarmentWise\app\nlp\pickles\clothing-categories_models.pkl', 'rb') as f:
    mnb_fit, mnb_color, mnb_quality, cv_fit, cv_color, cv_quality = pickle.load(f)
with open(r'C:\Users\Javier\UPM\TFG\GarmentWise\app\nlp\pickles\clothing-sgd_model.pkl', 'rb') as f:
    sgd, cv = pickle.load(f)


def clean_review(review):
    review = re.sub("[^a-zA-Z]", " ", review)
    review = review.translate(str.maketrans("", "", string.punctuation))
    review = review.lower()
    review = word_tokenize(review)
    review = [w for w in review if w not in stopwords_list]
    review = [lemma.lemmatize(w) for w in review]
    review = [w for w in review if len(w) > 1]
    return ' '.join(review)


def classify_review(review):
    words = set(review.split())
    categories = []
    
    if any(word in words for word in fit_words):
        categories.append(CATEGORY_CODES['FIT']) 
    elif any(word in words for word in color_words):
        categories.append(CATEGORY_CODES['COLOR'])
    elif any(word in words for word in quality_words):
        categories.append(CATEGORY_CODES['QUALITY'])
    else:
        categories.append(CATEGORY_CODES['OTHER'])
    
    return categories

def generate_score(df, model, cv):
    X = cv.transform(df['reviewTextPreprocessed'])
    y_pred = model.predict(X)
    df['prediction'] = y_pred
    score = np.mean(y_pred)
    return score

def drop_columns(df):
    cols_to_keep = ['reviewText', 'category', 'prediction', 'reviewNumber']
    df.drop(columns=[col for col in df.columns if col not in cols_to_keep], inplace=True)

def generate_wordcloud(df: pd.DataFrame):
    text = ' '.join(df['reviewTextPreprocessed'])
    wordcloud = WordCloud(background_color='white', width=800, height=400, max_words=200, stopwords=stopwords_list, colormap='inferno').generate(text)
    plt.imshow(wordcloud, interpolation='bilinear')
    plt.axis('off')
    image_file = BytesIO()
    plt.savefig(image_file, format='png')
    image_file.seek(0)
    image_data = image_file.read()
    return image_data
    
def predict(file: UploadFile):
    df = pd.read_csv(file.file)

    # Women's clothing reviews specific
    df.rename(columns={'Review Text': 'reviewText', 'Rating': 'rating'}, inplace=True)
    df['reviewText'] = df['reviewText'].fillna('')
    df['reviewTextPreprocessed'] = df['reviewText'].apply(clean_review)
    df['category'] = df['reviewTextPreprocessed'].apply(classify_review)
    df = df.reset_index(drop=False)
    df = df.rename(columns={'index': 'reviewNumber'})

    fit_df = df[df['category'].apply(lambda x: CATEGORY_CODES['FIT'] in x)].copy()
    color_df = df[df['category'].apply(lambda x: CATEGORY_CODES['COLOR'] in x)].copy()
    quality_df = df[df['category'].apply(lambda x: CATEGORY_CODES['QUALITY'] in x)].copy()

    df['reviewTextPreprocessed'] = df['reviewTextPreprocessed'].fillna('')
    df['category'] = df['category'].fillna('')

    wordcloud = generate_wordcloud(df)

    overall_score = generate_score(df, sgd, cv)
    fit_score = generate_score(fit_df, mnb_fit, cv_fit)
    color_score = generate_score(color_df, mnb_color, cv_color)
    quality_score = generate_score(quality_df, mnb_quality, cv_quality)

    drop_columns(df)
    
    predictions = {
        "scores": {
            "overall_score": overall_score,
            "fit_score": fit_score,
            "color_score": color_score,
            "quality_score": quality_score
        },
        "number_of_reviews": {
            "total_reviews": df.shape[0],
            "fit_reviews": fit_df.shape[0],
            "color_reviews": color_df.shape[0],
            "quality_reviews": quality_df.shape[0],
        }
    }

    report_metadata = {
        "dataset_title": file.filename
    }

    reviews_list = df.to_dict(orient='records')

    return predictions, report_metadata, reviews_list, wordcloud