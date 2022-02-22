from crypt import methods
from datetime import datetime
from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.forms.comment_form import CommentForm
from app.forms.post_form import PostForm
from app.models import Post, db, Comment, Like
import click

post_likes_routes = Blueprint('likes', __name__)


@post_likes_routes.route('/<int:like_id>', methods=["PUT"])
@login_required
def updateLike(post_id,like_id):
    like = Like.query.get(like_id)
    if like.liked:
        like.liked = False
    else: like.liked = True
    # click.echo(click.style(f"{like}", bg='red', fg='white'))
    db.session.add(like)
    db.session.commit()
    return {'like': like.to_frontend_dict()}

@post_likes_routes.route('/<int:like_id>', methods=["DELETE"])
@login_required
def deleteLike(post_id,like_id):
    like = Like.query.get(like_id)
    # click.echo(click.style(f"{like}", bg='red', fg='white'))
    db.session.delete(like)
    db.session.commit()
    return {'like': like.to_frontend_dict()}

@post_likes_routes.route('/', methods=["POST"])
@login_required
def createLike(post_id):
    like = Like(user_id=current_user.get_id(), post_id=post_id, liked=True)
    # click.echo(click.style(f"{like}", bg='red', fg='white'))
    db.session.add(like)
    db.session.commit()
    return {'like': like.to_frontend_dict()}
