from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo',
        email='demo@aa.io',
        password='password',
        bio='hey this is a test bio',
        artist_name='Demo',
        profile_picture='https://www.shutterstock.com/image-photo/cute-grey-british-shorthair-cat-600nw-2258972347.jpg'
        )
    demo_one = User(
        username='HarmonyRosenberg',
        email='harmony@aa.io',
        password='password',
        bio='this is also a test bio',
        artist_name='Diet Tea Other Cola',
        profile_picture='https://www.shutterstock.com/image-photo/cute-grey-british-shorthair-cat-600nw-2258972347.jpg'
        )
    demo_two = User(
        username='Euronymous',
        email='bobbie@aa.io',
        password='password',
        bio='hehehehahahahHAHAHAHAH',
        artist_name="Mayhem",
        profile_picture='https://www.shutterstock.com/image-photo/cute-grey-british-shorthair-cat-600nw-2258972347.jpg'
        )

    db.session.add(demo)
    db.session.add(demo_one)
    db.session.add(demo_two)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
