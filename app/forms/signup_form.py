from tkinter.tix import Select
from flask_wtf import FlaskForm
from wtforms import StringField, DateField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    contact = field.data
    user = User.query.filter(User.contact == contact).first()
    if user:
        raise ValidationError('Email address is already in use.')





class SignUpForm(FlaskForm):
    first_name = StringField(
        'first_name', validators=[DataRequired()])
    last_name = StringField(
        'last_name', validators=[DataRequired()])
    contact = StringField('contact', validators=[DataRequired(), user_exists])
    month = SelectField('month', validators=[DataRequired()], validate_choice=False)
    day = SelectField('day', validators=[DataRequired()], validate_choice=False)
    year = SelectField('year', validators=[DataRequired()], validate_choice=False)
    gender = StringField('gender')
    password = StringField('password', validators=[DataRequired()])
