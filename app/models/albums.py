from .db import db, environment, SCHEMA, add_prefix_for_prod

class Album(db.Model):
	__tablename__ = "albums"

	if environment == "production":
		__table_args__ = {'schema': SCHEMA}

	id = db.Column(db.Integer, primary_key=True)
	album_title = db.Column(db.String(40), nullable=False)
	credits = db.Column(db.String(255), nullable=True)
	artwork = db.Column(db.String(255), nullable=False)

	user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
	user = db.relationship('User', back_populates='albums')

	def _repr_(self):
		return f'Notebook {self.title}'

	def to_dict(self):
		return {
			'id': self.id,
			'album_title': self.album_title,
			'credits': self.credits,
			'artwork': self.artwork,
			'user_id': self.user_id,
			'user': {
				'username': self.user.username
			}
		}
