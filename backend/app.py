from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import random
import pickle
import json

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return 'Hello World!'

def func(x):
    return 27*np.sin(x/43) + 53 + 10*np.sin(x)/5

def expected(x, poverty):
    if poverty == 0:
        poverty = 1000
    return int(func(x)*5*(poverty/24376))

def getDailyTemps(id):
    f = open("temps.json", "r")
    temps = json.load(f)
    #print(temps)
    return temps[str(id)] 

def getLocalX_test(id, zipcode):
    X = []
    poverty = pd.read_csv("datasets/Philadelphia-CensusZipCodeTabulationArea.csv")["Value:Count_Person_BelowPovertyLevelInThePast12Months"][id]
    for i in range(0, 365):
        X.append(expected(i, poverty))
    for t in getDailyTemps(id):
        X.append(t)
    X.pop()
    X.append(poverty)
    X.append(zipcode)
    #print(len(X), X)
    return np.array(X)

@app.route('/centers', methods=['GET'])
def mlbackend():
    print("running ml backend")
    model = pickle.load(open("TodayNeedPredictor.sav", "rb"))
    i=0
    response = {}
    lat=""
    longitude=""
    data = pd.read_csv('datasets/cleaned_data.csv')
    currentId = ""
    for latlon in data["LatLon"]:
        currentId = i
        lat = latlon.split(',')[1]
        longitude = latlon.split(',')[0]
        hours=""
        if data["Time: Open"][i] == "Contact for Hours":
            hours = "Contact for Hours"
        else:
            hours = data["Time: Open"][i] + "-" + data["Time: Close"][i]
        
        need = int(model.predict(getLocalX_test(currentId, data["Zip Code"][i]).reshape(1, -1))[0]) - random.randint(0,40)
        if(i == 0):
            response[i]= json.load(open("center1.json", "r"))["0"]
        else:
            response[i]= {"lat": lat, 
                    "long": longitude, 
                    "need": need,
                    "stock": random.randint(0,50),
                    "name": data["Organization Name"][i], 
                    "address": data["Address"][i], 
                    "hours": hours,
                    "phone": data["Phone Number"][i]}
        i+=1

    return jsonify(response)

@app.route('/news', methods = ['GET'])
def get_posts():
    with open("news.json", "r") as json_file:
        json_data = json.load(json_file)
    return jsonify(json_data)


if __name__ == '__main__':
    app.run("debug=True")