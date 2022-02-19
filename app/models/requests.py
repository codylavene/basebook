from .db import db



class Request(db.Model):
    __tablename__ = "requests"
    id = db.Column(db.Integer, primary_key=True)
    requester_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    requested_id=  db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    is_approved = db.Column(db.Boolean, nullable=False, default=False)

    requester = db.relationship("User", foreign_keys=[requester_id])
    requested = db.relationship("User", foreign_keys=[requested_id])

    def to_dict(self):
        return {
            'requester_id': self.requester_id,
            'requested_id': self.requested_id,
            'is_approved': self.is_approved
        }
    def to_frontend_dict(self):
        return {
            'requester_id': self.requester_id,
            'requested_id': self.requested_id,
            'is_approved': self.is_approved,
            'requester': self.requester.to_frontend_dict(),
            'requested': self.requested.to_frontend_dict(),
        }
