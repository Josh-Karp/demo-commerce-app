import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from config import Config

basedir = os.path.abspath(os.path.dirname(__file__))
app = Flask("flask_app", root_path=os.getcwd())

app.config.from_object(Config)

print(app.config["SQLALCHEMY_DATABASE_URI"])

db = SQLAlchemy(app)