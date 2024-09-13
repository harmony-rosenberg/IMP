from app.models import db, Track, environment, SCHEMA
from sqlalchemy.sql import text

def seed_tracks():
	demo_track_1 = Track(
		original_filename="mysong.wav1",
		filename='mysongnewfile.wav1',
		track_title='My Song!',
		album_id=1,
	)
	demo_track_2 = Track(
		original_filename="mysong.wav2",
		filename='mysongnewfile.wav2',
		track_title='My Song!',
		album_id=1,
	)
	demo_track_3 = Track(
		original_filename="mysong.wav3",
		filename='mysongnewfile.wav3',
		track_title='My Song!',
		album_id=1,
	)

	db.session.add(demo_track_1)
	db.session.add(demo_track_2)
	db.session.add(demo_track_3)
	db.session.commit()

def undo_tracks():
	if environment == "production":
		db.session.execute(f"TRUNCATE table {SCHEMA}.tracks RESTART IDENTITY CASCADE;")
	else:
		db.session.execute(text("DELETE FROM tracks"))

	db.session.commit()
