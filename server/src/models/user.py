from dataclasses import dataclass
from datetime import datetime
from api.factory import db
from models.role import Role
from werkzeug.security import check_password_hash, generate_password_hash


@dataclass
class User(db.Model):
    """
    A class representing a user in the system.

    Attributes:
        id (int): The unique identifier of the user.
        username (str): The username of the user.
        email (str): The email address of the user.
        password (str): The password of the user.
        first_name (str): The first name of the user.
        last_name (str): The last name of the user.
        created_at (datetime): The date and time when the user was created.
        updated_at (datetime): The date and time when the user was last updated.
        roles (list): The list of roles assigned to the user.
    """

    id: int
    username: str
    email: str
    password: str
    first_name: str
    last_name: str
    created_at: datetime
    updated_at: datetime

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255))
    first_name = db.Column(db.String(300), nullable=False)
    last_name = db.Column(db.String(300), nullable=False)

    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    role_id = db.Column(db.Integer, db.ForeignKey("roles.id"))

    def __repr__(self):
        return f"<User: {self.username}>"

    def __str__(self):
        return f"<User: {self.username}>"

    def __init__(self, username: str, email: str, password: str, first_name: str, last_name: str, role_id: str = "1"):
        """
        Create a new User object using the email address and hashing the
        plaintext password using Werkzeug.Security.
        """
        self.username = username
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = self._generate_password_hash(password)
        self.role_id = role_id

    def is_password_correct(self, password: str):
        return check_password_hash(self.password, password)

    @staticmethod
    def _generate_password_hash(password):
        return generate_password_hash(password)
