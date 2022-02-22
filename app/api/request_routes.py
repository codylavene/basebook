from crypt import methods
from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import User, Post, Request, db
import click
request_routes = Blueprint('requests', __name__)


@request_routes.route('/')
@login_required
def all_requests():
    click.echo(click.style(f"\n\n\n{'HELLO'}\n\n", bg='red', fg='white'))
    sent_requests = Request.query.filter(Request.sender_id == current_user.get_id()).all()
    rec_requests = Request.query.filter(Request.receiver_id ==  current_user.get_id()).all()
    click.echo(click.style(f"\n\n\n{rec_requests}\n\n{sent_requests}\n\n\n", bg='red', fg='white'))
    return {'sent_requests': [request.to_frontend_dict() for request in sent_requests], "rec_requests": [request.to_frontend_dict() for request in rec_requests]}


@request_routes.route('/send/<int:user_id>', methods=['POST'])
@login_required
def send_request(user_id):
    request = Request(receiver_id=user_id, sender_id=int(current_user.get_id()), is_approved=False)
    click.echo(click.style(f"\n\n\n{request}\n\n", bg='blue', fg='white'))
    db.session.add(request)
    db.session.commit()
    return {'request': request.to_frontend_dict()}



@request_routes.route('/<int:req_id>/accept/<int:user_id>', methods=['POST'])
@login_required
def accept_request(req_id, user_id):
    click.echo(click.style(f"\n\n\n{1}\n\n", bg='green', fg='white'))
    request = Request.query.filter(Request.id == req_id).first()
    click.echo(click.style(f"\n\n\n{2}\n\n", bg='green', fg='white'))
    user1 = current_user
    click.echo(click.style(f"\n\n\n{3}\n\n", bg='green', fg='white'))
    user2 = User.query.filter(User.id == user_id).first()
    click.echo(click.style(f"\n\n\n{4}\n\n", bg='green', fg='white'))
    user1.friends.append(user2)
    click.echo(click.style(f"\n\n\n{5}\n\n", bg='green', fg='white'))
    user2.friends.append(user1)
    db.session.delete(request)
    click.echo(click.style(f"\n\n\n{6}\n\n", bg='green', fg='white'))
    db.session.commit()
    click.echo(click.style(f"\n\n\n{7}\n\n", bg='green', fg='white'))
    return {'request': request.to_frontend_dict()}


@request_routes.route('/<int:req_id>/decline', methods=['DELETE'])
@login_required
def decline_request(req_id):
    request = Request.query.filter(Request.id == req_id).first()
    click.echo(click.style(f"\n\n\n{request.id}\n\n", bg='red', fg='white'))
    db.session.delete(request)
    db.session.commit()
    return {'request': request.to_frontend_dict()}
