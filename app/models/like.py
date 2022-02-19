from app.models.user import User
from .db import db


class Like(db.Model):
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    liked = db.Column(db.Boolean, nullable=False, default=False)
    user = db.relationship("User", back_populates="likes")
    post = db.relationship("Post", back_populates="likes")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'post_id': self.post_id,
        }
    def to_frontend_dict(self):
        user = User.query.get(self.user_id)
        name = f'{user.first_name} {user.last_name}'
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': name,
            'post_id': self.post_id,
        }
