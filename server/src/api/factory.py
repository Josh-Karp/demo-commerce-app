import os
from flask import Flask, request, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from config import Config

basedir = os.path.abspath(os.path.dirname(__file__))
app = Flask("flask_app", root_path=os.getcwd())

app.config.from_object(Config)
CORS(app, resources={r"/*": {"origins": "*", "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"]}})

db = SQLAlchemy(app)