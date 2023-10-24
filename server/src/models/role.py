from api.factory import db


class Role(db.Model):
    """
    A class representing a user role in the system.

    Attributes:
        id (int): The unique identifier for the role.
        name (str): The name of the role.
        description (str): A description of the role.
    """
    __tablename__ = "roles"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    description = db.Column(db.String(100), nullable=True)
