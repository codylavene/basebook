
from .db import db


class UserDetails(db.Model):
    __tablename__ = 'user_details'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    bio = db.Column(db.Text)
    city = db.Column(db.String)
    work = db.Column(db.String)
    education = db.Column(db.String)

    user = db.relationship("User", back_populates="details")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'bio': self.bio,
            'city': self.city,
            'work': self.work,
            'education': self.education

        }
    def to_frontend_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'bio': self.bio,
            'city': self.city,
            'work': self.work,
            'education': self.education
        }
