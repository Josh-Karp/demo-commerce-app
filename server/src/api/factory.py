import os
from flask import Flask, request, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
from config import Config

load_dotenv()
basedir = os.path.abspath(os.path.dirname(__file__))
app = Flask("flask_app", root_path=os.getcwd())

app.config.from_object(Config)
CORS(app, resources={r"/*": {"origins": "*", "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"]}})
app.config['CORS_HEADERS'] = 'Content-Type'

db = SQLAlchemy(app)