from app.models import db, User
from faker import Faker
from datetime import date, datetime
fake = Faker(locale='en-US')

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name='User', contact='demo@aa.io', birthdate=date(2000, 2, 22),password='password')
    db.session.add(demo)
    for _ in range(76):
        user = User(
            first_name=fake.first_name(), last_name=fake.last_name(), contact=fake.numerify('###-###-####'), birthdate=fake.date_of_birth(minimum_age=18),password=fake.password(length=12))
        db.session.add(user)



    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
