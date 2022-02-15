from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String, nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    birthdate = db.Column(db.Date, nullable=False)
    gender = db.Column(db.String, nullable=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    posts = db.relationship("Post", back_populates="owner")
    comments = db.relationship("Comment", back_populates="user")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'phone': self.phone,
            'email': self.email,
            'birthdate': self.birthdate,
            'gender': self.gender,
        }
    def to_frontend_dict(self):
        from app.models import Post
        user_posts = Post.query.filter(Post.user_id == self.id).all()
        posts = [post.to_frontend_dict() for post in user_posts]
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'phone': self.phone,
            'email': self.email,
            'birthdate': self.birthdate,
            'gender': self.gender,
            'posts': posts,
        }
