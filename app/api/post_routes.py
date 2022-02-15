
from datetime import datetime
from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.forms.post_form import PostForm
from app.models import Post, db
import click

post_routes = Blueprint('posts', __name__)


@post_routes.route('/')
@login_required
def posts():
    posts = Post.query.all()
    return {'posts': [post.to_frontend_dict() for post in posts]}


@post_routes.route('/<int:id>')
@login_required
def post(id):
    post = Post.query.get(id)
    return post.to_frontend_dict()


@post_routes.route('/', methods=["POST"])
@login_required
def createPost():
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    post = form['post_body'].data

    if form.validate_on_submit():

        post = Post(user_id=current_user.get_id(), post_body=post)
        db.session.add(post)
        db.session.commit()
        return post.to_frontend_dict()
    else:

        return {'errors': [form['post_body'].message]}

@post_routes.route('/<int:id>', methods=["PUT"])
@login_required
def updatePost(id):
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    post = form['post_body'].data
    if form.validate_on_submit():
        post = Post.query.get(id)
        post.post_body = form['post_body'].data
        post.update_at = datetime.now()
        db.session.add(post)
        db.session.commit()
        return post.to_frontend_dict()
    else:
        return {'errors': "error"}, 401


@post_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def deletePost(id):
    click.echo(click.style("HIT ROUTE <><><><><><><><><><><><><>", bg='red', fg='white'))
    data = {}
    post = Post.query.get(int(id))
    click.echo(click.style(f"{post}", bg='red', fg='white'))
    data['post'] = post.to_frontend_dict()
    db.session.delete(post)
    db.session.commit()
    return data
