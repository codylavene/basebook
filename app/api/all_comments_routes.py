from datetime import datetime
from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.forms.comment_form import CommentForm
from app.forms.post_form import PostForm
from app.models import Post, db, Comment, Like
import click

all_comments_routes = Blueprint('all_comments', __name__)


@all_comments_routes.route('/')
@login_required
def comments():
    comments = Comment.query.all()
    # click.echo(click.style(f"\n\n\n{type([comment.to_frontend_dict() for comment in comments])}\n\n", bg='cyan', fg='red'))
    return {'comments': [comment.to_frontend_dict() for comment in comments]}
