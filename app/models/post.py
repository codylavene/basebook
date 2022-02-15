from .db import db
from datetime import datetime


class Post(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    post_body = db.Column(db.Text(540), nullable=False)
    posted_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())



    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'post_body': self.post_body,
            'posted_at': self.posted_at,
            'updated_at': self.updated_at,
        }
