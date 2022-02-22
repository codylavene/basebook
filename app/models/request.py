from .db import db



class Request(db.Model):
    __tablename__ = "requests"
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    receiver_id=  db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    is_approved = db.Column(db.Boolean, nullable=False, default=False)

    sender = db.relationship("User", foreign_keys=[sender_id])
    receiver = db.relationship("User", foreign_keys=[receiver_id])

    def to_dict(self):
        return {
            'id': self.id,
            'sender_id': self.sender_id,
            'receiver_id': self.receiver_id,
            'is_approved': self.is_approved,
            # 'sender': self.sender.to_dict(),
            # 'receiver': self.receiver.to_dict(),
        }
    def to_frontend_dict(self):
        return {
            'id': self.id,
            'sender_id': self.sender_id,
            'receiver_id': self.receiver_id,
            'is_approved': self.is_approved,
            'sender': self.sender.to_dict(),
            'receiver': self.receiver.to_dict(),
        }
