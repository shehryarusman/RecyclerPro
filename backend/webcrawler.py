import os
key = os.environ.get('API')
import json
import requests
from newspaper import Article
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer

nltk.download('vader_lexicon')
nltk.download('punkt')



key = '18dbac97e84a4b0891fd86ba11dcfec3'

def analyser(text):
    sid = SentimentIntensityAnalyzer()
    out = sid.polarity_scores(text)
    score = out['compound']
    if score>0:
        return 'positive'
    if score<0:
        return 'negative'
    else: 
        return 'neutral'

def summariser(url):
    article = Article(url)
    try:
        article.download()
        article.parse()
    except:
        return None
    if not article.text:
        return None
    article.nlp()
    return article.summary


def newsparser():
    url = "https://newsapi.org/v2/everything?"
    parameters = {
        'q' : "recycling OR reduce OR reuse OR repurpose OR upcycle OR compost OR sustainability OR waste management OR circular economy OR green living OR zero waste OR eco-friendly OR environmentally friendly OR recyclable OR biodegradable OR landfill diversion",
        'pageSize' : '50',
        'apiKey' : key
    }

    response = requests.get(url, params=parameters)
    news = {}
    response.json = response.json()
    
    for i in response.json['articles']:
        i['url'] = i['url'].replace('http://', 'https://')
        summary = summariser(i['url'])
        if not summary:
            continue   
        summary = summary.strip('\n')
        summary = summary.strip('\u2019')

        ind = {
            'source': i["source"]["name"],
            'url' : i['url'],
            'title' : i['title'],
            'img' : i['urlToImage'],
            'summary' : summary,
            'sentiment' : analyser(summary)
        }
        if(ind['sentiment'] == 'positive'):
            news[str(len(news)+1)] = ind
    with open("news.json", "w") as outfile:
        json.dump(news, outfile)  
    

def main():
       newsparser()
main()