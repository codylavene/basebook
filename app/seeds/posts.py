from app.models import db, Post
from faker import Faker
from datetime import date, datetime
from random import randint
fake = Faker(locale='en-US')

# Adds a demo user, you can add other users here if you want
def seed_posts():
    for _ in range(76):
        post = Post(
            user_id=randint(1, 77), post_body=fake.text(max_nb_chars=380))
        db.session.add(post)



    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
