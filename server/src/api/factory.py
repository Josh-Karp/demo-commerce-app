import os
from flask import Flask, request, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import Config

# -------------
# Configuration
# -------------

db = SQLAlchemy()

# ----------------------------
# Application Factory Function
# ----------------------------


def create_app():
    # Create the Flask application
    app = Flask("flask_app", root_path=os.getcwd())

    # Configure the Flask application
    config_type = os.getenv("CONFIG_TYPE", default="config.DevelopmentConfig")
    app.config.from_object(config_type)

    CORS(app, resources={r"/*": {"origins": "*", "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"]}})
    app.config["CORS_HEADERS"] = "Content-Type"

    initialize_extensions(app)
    register_blueprints(app)

    return app


# ----------------
# Helper Functions
# ----------------


def initialize_extensions(app):
    db.init_app(app)


def register_blueprints(app):
    from controllers.users import users_bp
    from controllers.product import product_bp
    from controllers.authentication import auth_bp

    app.register_blueprint(users_bp)
    app.register_blueprint(product_bp)
    app.register_blueprint(auth_bp)
