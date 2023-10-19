import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL") or "mysql+pymysql://{}:{}@{}:{}/{}".format(
        os.environ.get("DB_USER", "flask"),
        os.environ.get("DB_PASSWORD", "admin"),
        os.environ.get("DB_HOST", "mysql"),
        os.environ.get("DB_PORT", "3306"),
        os.environ.get("DB_NAME", "demo_db"),
    )
    IMAGES_LOCATION = os.path.join(basedir, "static", "images")
