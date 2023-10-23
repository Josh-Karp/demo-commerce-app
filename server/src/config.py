import os

# Determine the folder of the top-level directory of this project
BASEDIR = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    FLASK_ENV = "development"
    DEBUG = False
    TESTING = False
    SECRET_KEY = os.getenv("SECRET_KEY", default="DEFAULT_SECRET_KEY")
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DATABASE_URL",
        default="mysql+pymysql://{}:{}@{}:{}/{}".format(
            os.environ.get("DB_USER", "flask"),
            os.environ.get("DB_PASSWORD", "admin"),
            os.environ.get("DB_HOST", "mysql"),
            os.environ.get("DB_PORT", "3306"),
            os.environ.get("DB_NAME", "demo_db"),
        ),
    )


class ProductionConfig(Config):
    FLASK_ENV = "production"


class DevelopmentConfig(Config):
    DEBUG = True


class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "TEST_DATABASE_URI",
        default="mysql+pymysql://{}:{}@{}:{}/{}".format(
            os.environ.get("DB_USER", "flask"),
            os.environ.get("DB_PASSWORD", "admin"),
            os.environ.get("DB_HOST", "mysql"),
            os.environ.get("DB_PORT", "3306"),
            os.environ.get("DB_NAME", "test_db"),
        ),
    )
