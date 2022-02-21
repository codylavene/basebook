from sqlalchemy import ForeignKey
from app.models.user import User
from .db import db
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID


class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    relation_uuid = db.Column(UUID(as_uuid=True), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    type = db.Column(db.String, nullable=False)
    url = db.Column(db.String, nullable=False)
    posted_at = db.Column(db.DateTime, nullable=False, default=datetime.now)

    owner = db.relationship("User", back_populates="images")

    def to_dict(self):
        return {
            'id': self.id,
            'relation_uuid': self.relation_uuid,
            'user_id': self.user_id,
            'type': self.type,
            'url': self.url,
            'posted_at': self.posted_at,
        }
    def to_frontend_dict(self):

        return {
            'id': self.id,
            'relation_uuid': self.relation_uuid,
            'user_id': self.user_id,
            'type': self.type,
            'url': self.url,
            'posted_at': self.posted_at,
        }
