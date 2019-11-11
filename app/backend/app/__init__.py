from flask import Flask, send_from_directory
from flask_restful import Api
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__, static_folder="./www/")
app.config["SECRET_KEY"] = "thisissecretkey"
mongo = PyMongo(app, uri='mongodb://db:27017/test')
CORS(app)
