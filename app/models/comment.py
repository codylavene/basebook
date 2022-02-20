from app.models.user import User
from .db import db
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID
import uuid


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(UUID(as_uuid=True), nullable=False, default=uuid.uuid4, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    comment_body = db.Column(db.String(280), nullable=False)
    posted_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now)

    user = db.relationship("User", back_populates="comments")
    post = db.relationship("Post", back_populates="comments")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'post_id': self.post_id,
            'comment_body': self.comment_body,
            'posted_at': self.posted_at,
            'updated_at': self.updated_at,
        }
    def to_frontend_dict(self):
        user = User.query.get(self.user_id)
        name = f'{user.first_name} {user.last_name}'
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': name,
            'post_id': self.post_id,
            'comment_body': self.comment_body,
            'posted_at': self.posted_at,
            'updated_at': self.updated_at,
        }
