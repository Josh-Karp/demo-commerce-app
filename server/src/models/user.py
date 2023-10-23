from dataclasses import dataclass
from datetime import datetime
from api.factory import db
from models.role import users_roles

@dataclass
class User(db.Model):
    id: int
    username: str
    email: str
    password: str
    first_name: str
    last_name: str
    created_at: datetime
    updated_at: datetime

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255))
    first_name = db.Column(db.String(300), nullable=False)
    last_name = db.Column(db.String(300), nullable=False)

    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    roles = db.relationship('Role', secondary=users_roles, backref='users')

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def is_admin(self):
        return 'ROLE_ADMIN' in [r.name for r in self.roles]