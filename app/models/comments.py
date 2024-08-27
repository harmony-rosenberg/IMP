from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Comment(db.Model):
	__tablename__ = "comments"

	if environment == "production":
		__table_args__ = {'schema': SCHEMA}

	id = db.Column(db.Integer, primary_key=True)
	body = db.Column(db.String(400), nullable=False)

	album_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id'), ondelete='CASCADE'), nullable=False)
	albums = db.relationship('Album', back_populates='comments')

	user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
	user = db.relationship('User', back_populates='comments')

	def _repr_(self):
		return f'Comment {self.body}'

	def to_dict(self):
		return {
			'id': self.id,
			'body': self.body,
			'album_id': self.album_id,
			'user_id': self.user_id,
		}
