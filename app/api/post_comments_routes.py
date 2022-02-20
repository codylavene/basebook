from crypt import methods
from datetime import datetime
from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.forms.comment_form import CommentForm
from app.forms.post_form import PostForm
from app.models import Post, db, Comment, Like
import click

post_comments_routes = Blueprint('comments', __name__)


@post_comments_routes.route('/', methods=["POST"])
@login_required
def createComment(post_id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    comment = form['comment_body'].data
    click.echo(click.style("\n\n\n HIT ROUTE \n\n", bg='cyan', fg='red'))
    if form.validate_on_submit():
        comment = Comment(user_id=current_user.get_id(), post_id=post_id, comment_body=form['comment_body'].data)
        db.session.add(comment)
        db.session.commit()


        return {"comment": comment.to_frontend_dict()}

    return {'errors': [form['comment_body'].message]}


@post_comments_routes.route('/<int:comment_id>', methods=["DELETE"])
@login_required
def deleteComment(post_id,comment_id):
    comment = Comment.query.get(comment_id)
    click.echo(click.style(f"{comment}", bg='red', fg='white'))
    db.session.delete(comment)
    db.session.commit()
    return {'comment': comment.to_frontend_dict()}


@post_comments_routes.route('/<int:comment_id>', methods=["PUT"])
@login_required
def editComment(post_id,comment_id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment.query.get(comment_id)
        comment.comment_body = form['comment_body'].data
        comment.updated_at = datetime.now()
        db.session.add(comment)
        db.session.commit()
        # post = Post.query.get(post_id)
        return {"comment": comment.to_frontend_dict()}
    return {'errors': "error"}, 401
