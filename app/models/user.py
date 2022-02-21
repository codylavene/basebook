from datetime import datetime
from .db import db
from sqlalchemy.dialects.postgresql import UUID
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

friends = db.Table(
    "friends",
    db.Column("friend1_id", db.Integer, db.ForeignKey("users.id"), nullable=False),
    db.Column("friend2_id", db.Integer, db.ForeignKey("users.id"), nullable=False),
)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(UUID(as_uuid=True), nullable=False, default=uuid.uuid4, unique=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    contact = db.Column(db.String(255), nullable=False, unique=True)
    birthdate = db.Column(db.Date, nullable=False)
    gender = db.Column(db.String, nullable=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    joined_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    friends = db.relationship("User",
    secondary=friends,
    primaryjoin=friends.c.friend1_id == id,
    secondaryjoin=friends.c.friend2_id == id,
    backref=db.backref("all_friends", lazy="dynamic"),
    lazy="dynamic")

    posts = db.relationship("Post", back_populates="owner")
    comments = db.relationship("Comment", back_populates="user")
    likes = db.relationship("Like", back_populates="user")
    images = db.relationship("Image", back_populates="owner")

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
            'contact': self.contact,
            'birthdate': self.birthdate,
            'gender': self.gender,
        }
    def to_frontend_dict(self):
        from app.models import Post, Like, Request
        user_posts = Post.query.filter(Post.user_id == self.id).all()
        posts = [post.to_frontend_dict() for post in user_posts]
        user_likes = Like.query.filter(Like.user_id == self.id).all()
        likes = [like.to_dict() for like in user_likes]
        rec_requests = Request.query.filter(Request.receiver_id == self.id).all()
        sent_requests = Request.query.filter(Request.sender_id == self.id).all()
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'full_name': f"{self.first_name} {self.last_name}",
            'contact': self.contact,
            'birthdate': self.birthdate,
            'gender': self.gender,
            'posts': posts,
            'likes': likes,
            'friends': [friend.to_frontend_dict() for friend in self.friends],
            'rec_requests': [request.to_frontend_dict() for request in rec_requests],
            'sent_requests': [request.to_frontend_dict() for request in sent_requests],
        }
