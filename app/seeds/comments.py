from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():
	demo_comment_1 = Comment(
		body="hey this is a test comment",
		album_id=1,
		user_id=1,
	)
	demo_comment_2 = Comment(
	body="hey this is a second test comment",
	album_id=2,
	user_id=1,
	)
	demo_comment_3 = Comment(
	body="hey this is the third test comment",
	album_id=3,
	user_id=2,
	)

	db.session.add(demo_comment_1)
	db.session.add(demo_comment_2)
	db.session.add(demo_comment_3)

def undo_comments():
	if environment == "production":
		db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
	else:
		db.session.execute(text("DELETE FROM comments"))

	db.session.commit()
