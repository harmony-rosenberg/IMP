from app.models import db, Album, environment, SCHEMA
from sqlalchemy.sql import text

def seed_albums():
	demo_album_1 = Album(
		album_title="demo 1",
		credits='harmony rosenberg',
		artwork='https://www.shutterstock.com/image-photo/cute-grey-british-shorthair-cat-600nw-2258972347.jpg',
		genre='Rap',
		user_id=1
	)
	demo_album_2 = Album(
		album_title="demo 2",
		credits='diet tea other cola',
		artwork='https://www.shutterstock.com/image-photo/cute-grey-british-shorthair-cat-600nw-2258972347.jpg',
		genre='Rock',
		user_id=2
	)
	demo_album_3 = Album(
		album_title="demo 3",
		credits='the scum monks',
		artwork='https://www.shutterstock.com/image-photo/cute-grey-british-shorthair-cat-600nw-2258972347.jpg',
		genre='MinceCore',
		user_id=3
	)

	db.session.add(demo_album_1)
	db.session.add(demo_album_2)
	db.session.add(demo_album_3)
	db.session.commit()

def undo_albums():
	if environment == "production":
		db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
	else:
		db.session.execute(text("DELETE FROM comments"))

	db.session.commit()
