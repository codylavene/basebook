from datetime import datetime
from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.forms.comment_form import CommentForm
from app.forms.post_form import PostForm
from app.models import Post, db, Comment, Like, like
import click

all_likes_routes = Blueprint('all_likes', __name__)


@all_likes_routes.route('/')
@login_required
def likes():
    likes = Like.query.all()
    # click.echo(click.style(f"\n\n\n{type([like.to_frontend_dict() for like in likes])}\n\n", bg='cyan', fg='red'))
    return {'likes': [like.to_frontend_dict() for like in likes]}
