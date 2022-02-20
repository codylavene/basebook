
from datetime import datetime
from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.forms.comment_form import CommentForm
from app.forms.post_form import PostForm
from app.models import Post, db, Comment, Like
import click

post_routes = Blueprint('posts', __name__)


#####################################################################
### POSTS ###


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

    if form.validate_on_submit():
        # click.echo(click.style("hello0oooooooooooooo", bg='blue', fg='white') )
        post = Post(user_id=current_user.get_id(), post_body=form['post_body'].data)
        db.session.add(post)
        db.session.commit()
        return post.to_frontend_dict()
    return {'errors': [form['post_body'].message]}


@post_routes.route('/<int:id>', methods=["PUT"])
@login_required
def updatePost(id):
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post.query.get(id)
        post.post_body = form['post_body'].data
        post.update_at = datetime.now()
        db.session.add(post)
        db.session.commit()
        return post.to_frontend_dict()
    return {'errors': "error"}, 401


@post_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def deletePost(id):
    click.echo(click.style("\n \n HIT ROUTE <><><><><><><><><><><><><> \n \n", bg='red', fg='white'))
    data = {}
    post = Post.query.get(int(id))
    click.echo(click.style(f"{post}", bg='red', fg='white'))
    data['post'] = post.to_frontend_dict()
    db.session.delete(post)
    db.session.commit()
    return data


#####################################################################
#####################################################################
### COMMENTS ###


@post_routes.route('/<int:id>/comments')
@login_required
def getComments(id):
    click.echo(click.style("\n \n HIT ROUTE <><><><><><><><><><><><><> \n \n", bg='red', fg='white'))
    comments = Comment.query.filter(Comment.post_id == id).all()
    click.echo(click.style(f"\n \n {[comment.to_frontend_dict() for comment in comments]} \n \n", bg='red', fg='white'))
    return {'comments': [comment.to_frontend_dict() for comment in comments]}


@post_routes.route('/<int:id>/comments', methods=["POST"])
@login_required
def createComment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    comment = form['comment_body'].data

    if form.validate_on_submit():
        comment = Comment(user_id=current_user.get_id(), post_id=id, comment_body=form['comment_body'].data)
        db.session.add(comment)
        db.session.commit()
        # post = Post.query.get(id)

        return {"comment": comment.to_frontend_dict()}

    return {'errors': [form['comment_body'].message]}


@post_routes.route('/<int:post_id>/comments/<int:id>', methods=["DELETE"])
@login_required
def deleteComment(post_id,id):
    comment = Comment.query.get(id)
    click.echo(click.style(f"{comment}", bg='red', fg='white'))
    db.session.delete(comment)
    db.session.commit()
    return {'comment': comment.to_frontend_dict()}


@post_routes.route('/<int:post_id>/comments/<int:id>', methods=["PUT"])
@login_required
def editComment(post_id,id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment.query.get(id)
        comment.comment_body = form['comment_body'].data
        comment.updated_at = datetime.now()
        db.session.add(comment)
        db.session.commit()
        # post = Post.query.get(post_id)
        return {"comment": comment.to_frontend_dict()}
    return {'errors': "error"}, 401


#####################################################################
#####################################################################
### LIKES ###


@post_routes.route('/<int:post_id>/likes/<int:id>', methods=["PUT"])
@login_required
def updateLike(post_id,id):
    data = {}
    like = Like.query.get(id)
    if like.liked:
        like.liked = False
    else: like.liked = True
    click.echo(click.style(f"{like}", bg='red', fg='white'))
    db.session.add(like)
    db.session.commit()
    post = Post.query.get(post_id)
    data['post'] = post.to_frontend_dict()
    return data


@post_routes.route('/<int:id>/likes', methods=["POST"])
@login_required
def createLike(id):
    data = {}
    like = Like(user_id=current_user.get_id(), post_id=id, liked=True)
    click.echo(click.style(f"{like}", bg='red', fg='white'))
    db.session.add(like)
    db.session.commit()
    post = Post.query.get(id)
    data['post'] = post.to_frontend_dict()
    data['like_id'] = like.id
    return data
