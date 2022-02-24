from crypt import methods
from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Post, UserDetails, db
from app.forms import UserDetailsForm
import click
user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    click.echo(click.style(f"\n\n\n{users}\n\n", bg='red', fg='white'))
    return {'users': [user.to_frontend_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    click.echo(click.style(f"\n\n\n{'ENTER ROUTE'}\n\n", bg='red', fg='white'))
    user = User.query.get(id)
    click.echo(click.style(f"\n\n\n{user.to_frontend_dict()}\n\n", bg='red', fg='white'))
    return user.to_frontend_dict()


@user_routes.route('/<int:id>/details', methods=["PUT"])
@login_required
def update_user(id):
    form = UserDetailsForm()
    click.echo(click.style(f"\n\n\n{'ENTER ROUTE'}\n\n", bg='red', fg='white'))
    details = UserDetails.query.filter(UserDetails.user_id == id).first()
    details.bio = form.data['bio']
    details.city = form.data['city']
    details.work = form.data['work']
    details.education = form.data['education']
    db.session.add(details)
    db.session.commit()
    user = User.query.get(id)
    click.echo(click.style(f"\n\n\n{user.to_frontend_dict()}\n\n", bg='red', fg='white'))
    return user.to_frontend_dict()
