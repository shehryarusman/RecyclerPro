import flask
from flask import jsonify
from flask import request
import requests
import os
import flask_sqlalchemy
import flask_praetorian
import flask_cors
import pandas as pd
import numpy as np
import random
import pickle
import json
import tensorflow as tf
from tensorflow import keras
from PIL import Image

db = flask_sqlalchemy.SQLAlchemy()
guard = flask_praetorian.Praetorian()
cors = flask_cors.CORS()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Text, unique=True)
    password = db.Column(db.Text)
    roles = db.Column(db.Text)
    is_active = db.Column(db.Boolean, default=True, server_default='true')

    @property
    def rolenames(self):
        try:
            return self.roles.split(',')
        except Exception:
            return []

    @classmethod
    def lookup(cls, username):
        return cls.query.filter_by(username=username).one_or_none()

    @classmethod
    def identify(cls, id):
        return cls.query.get(id)

    @property
    def identity(self):
        return self.id

    def is_valid(self):
        return self.is_active


app = flask.Flask(__name__)
app.debug = True
app.config['SECRET_KEY'] = 'top secret'
app.config['JWT_ACCESS_LIFESPAN'] = {'hours': 24}
app.config['JWT_REFRESH_LIFESPAN'] = {'days': 30}

guard.init_app(app, User)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///database.db"
db.init_app(app)

cors.init_app(app)

with app.app_context():
    db.create_all()
    if db.session.query(User).filter_by(username='admin').count() < 1:
        db.session.add(User(
          username='admin',
          password=guard.hash_password('admin'),
          roles='admin'
            ))
    db.session.commit()

@app.route('/api/login', methods=['POST'])
def login():
    req = flask.request.get_json(force=True)
    username = req.get('username', None)
    password = req.get('password', None)
    user = guard.authenticate(username, password)
    ret = {'access_token': guard.encode_jwt_token(user)}
    return ret, 200

  
@app.route('/api/refresh', methods=['POST'])
def refresh():
    print("refresh request")
    old_token = flask.request.get_data()
    new_token = guard.refresh_jwt_token(old_token)
    ret = {'access_token': new_token}
    return ret, 200
  
  
@app.route('/api/protected')
@flask_praetorian.auth_required
def protected():
    return {'message': f'protected endpoint (allowed user {flask_praetorian.current_user().username})'}

@app.route('/')
def index():
    return {"Hello": "World"}, 200

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

@app.route('/products/<int:product_id>', methods = ['GET'])
def get_products(product_id):
    with open ("records.json", "r") as json_file:
        json_data = json.load(json_file)
    for object_name, object_data in json_data.items():
        if object_data.get('id') == product_id:
            return "product found"
    return "product not found"

@app.route('/api/save-canvas', methods=['POST'])
def save_canvas():
    data = flask.request.get_json()
    dataURL = data['dataURL']
    #print(json.loads(dataURL))
    return jsonify({'message': 'Canvas saved successfully'})
    
    #jsonify({'modelTopology': model_json, 'weightsManifest': weights_manifest})

@app.route('/model')
def export_model():
    return json.load('\backend\model\model.json')

if __name__ == '__main__':
    app.run()