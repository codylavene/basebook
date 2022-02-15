from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Length



class PostForm(FlaskForm):
    post_body = TextAreaField('post_body', validators=[DataRequired()])

# , Length(min=1, max=540, message='Post must be between 1 and 540 characters')
