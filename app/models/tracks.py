from .db import db, environment, SCHEMA, add_prefix_for_prod

class Track(db.Model):
	__tablename__ = "tracks"

	if environment == "production":
		__table_args__ = {'schema': SCHEMA}

	id = db.Column(db.Integer, primary_key=True)
	original_filename = db.Column(db.Integer, nullable=False)
	filename = db.Column(db.String(100), nullable=False)
	track_title = db.Column(db.String(100), nullable=False)

	album_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id'), ondelete='CASCADE'), nullable=False)
	albums = db.relationship('Album', back_populates='tracks')

	def _repr_(self):
		return f'Album {self.track_title}'

	def to_dict(self):
		return {
			'id': self.id,
			'original_filename': self.original_filename,
			'filename': self.filename,
			'track_title': self.track_title
		}
