from flask_login import current_user
from sqlalchemy.dialects.postgresql import UUID
import uuid
from app.models.db import db
from datetime import datetime


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(UUID(as_uuid=True), nullable=False, default=uuid.uuid4, unique=True)
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'), nullable=False)
    post_body = db.Column(db.String(540), nullable=False)
    posted_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now)

    owner = db.relationship("User", back_populates="posts")
    comments = db.relationship("Comment", back_populates="post", cascade="all, delete")
    likes = db.relationship("Like", back_populates="post", cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'post_body': self.post_body,
            'posted_at': self.posted_at,
            'updated_at': self.updated_at,
        }
    def to_frontend_dict(self):
        from app.models import User
        from app.models import Comment
        from app.models import Like
        user = User.query.get(self.user_id)
        name = f'{user.first_name} {user.last_name}'
        comments = Comment.query.filter(Comment.post_id == self.id).all()
        comments = [comment.id for comment in comments]
        all_likes = Like.query.filter(Like.post_id == self.id, Like.liked == True).all()
        likes = [like.id for like in all_likes]
        user_liked = Like.query.filter(Like.post_id == self.id, Like.user_id == current_user.get_id()).first()
        print(user_liked)
        if user_liked:
            liked_status = {"liked": user_liked.liked, "like_id": user_liked.id}
        else: liked_status = {"liked": False}
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': name,
            'post_body': self.post_body,
            'comments': comments,
            'posted_at': self.posted_at,
            'updated_at': self.updated_at,
            "likes": likes,
            "liked_status": liked_status
        }
