from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Album(db.Model):
	__tablename__ = "albums"

	if environment == "production":
		__table_args__ = {'schema': SCHEMA}

	id = db.Column(db.Integer, primary_key=True)
	album_title = db.Column(db.String(40), nullable=False)
	credits = db.Column(db.String(255), nullable=True)
	artwork = db.Column(db.String(255), nullable=False)
	# release_date = db.Column(db.String(255), nullable=True)
	genre = db.Column(db.String(40), nullable=True)

	user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
	user = db.relationship('User', back_populates='albums')

	comments = db.relationship('Comment', back_populates='albums')

	tracks = db.relationship('Track', back_populates='albums')

	def _repr_(self):
		return f'Album {self.album_title}'

	def to_dict(self):
		return {
			'id': self.id,
			'album_title': self.album_title,
			'credits': self.credits,
			'artwork': self.artwork,
			# 'release_date': self.release_date,
			'genre': self.genre,
			'user_id': self.user_id,
			'user': {
				'artistName': self.user.artist_name,
				'profilePic': self.user.profile_picture
			},
			'tracks': {
				track.id: track.to_dict() for track in self.tracks
			},
			'comments': {
				comment.id: comment.to_dict() for comment in self.comments
			}
		}
