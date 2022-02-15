
from app.models.user import User
from app.models.comment import Comment
from .db import db
from datetime import datetime


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'), nullable=False)
    post_body = db.Column(db.String(540), nullable=False)
    posted_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    owner = db.relationship("User", back_populates="posts")
    comments = db.relationship("Comment", back_populates="post", cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'post_body': self.post_body,
            'posted_at': self.posted_at,
            'updated_at': self.updated_at,
        }
    def to_frontend_dict(self):
        user = User.query.get(self.user_id)
        name = f'{user.first_name} {user.last_name}'
        comments = Comment.query.filter(Comment.post_id == self.id).all()
        comments = [comment.to_frontend_dict() for comment in comments]
        print(comments)
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': name,
            'post_body': self.post_body,
            'comments': comments,
            'posted_at': self.posted_at,
            'updated_at': self.updated_at,
        }
