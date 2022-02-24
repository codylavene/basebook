from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField



class UserDetailsForm(FlaskForm):
    bio = TextAreaField('bio')
    city = StringField('city')
    work = StringField('work')
    education = StringField('education')
