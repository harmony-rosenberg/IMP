from flask import Blueprint, request, jsonify
from app.models import db, Album, User
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload, Load

album_routes = Blueprint('albums', __name__, url_prefix='/albums')

#get all albums
@album_routes.route('')
def get_all_albums():
	albums = Album.query.all()
	return jsonify([album.to_dict() for album in albums]), 200

#get all albums for a specific user
@album_routes.route('/current')
@login_required
def get_user_albums():
	albums = Album.query.filter_by(user_id=current_user.id).all()
	return jsonify([album.to_dict() for album in albums]), 200

#create a new album
@album_routes.route('', methods=['POST'])
@login_required
def create_album():
	album_title = request.json.get('albumTitle')
	credits = request.json.get('credits')
	artwork = request.json.get('artwork')

	if not album_title:
		return jsonify({'error': 'Title is required'})
	if not artwork:
		return jsonify({'error': 'Artwork is required'})

	new_album = Album(album_title=album_title, credits=credits, artwork=artwork, user_id=current_user.id)
	db.session.add(new_album)
	db.session.commit()

	return jsonify(new_album.to_dict()), 201

#update an existing album
@album_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_album(id):
	edit_album = Album.query.get(id)

	if edit_album is None:
		return jsonify({'error': 'Sorry, bud. That album does not exist'})

	album_title = request.json.get('albumTitle')
	credits = request.json.get('credits')
	artwork = request.json.get('artwork')

	if album_title:
		edit_album.album_title=album_title
	if credits:
		edit_album.credits=credits
	if artwork:
		edit_album.artwork=artwork

	db.session.commit()

	return jsonify(edit_album.to_dict())

#get details for existing album
@album_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_album_details(id):
	album = Album.query.get(id)
	return jsonify([album.to_dict()])

#delete an album
@album_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_album(id):
	dead_album = Album.query.get(id)

	if dead_album is None:
		return jsonify({'error': 'We could not find that album :/'})

	db.session.delete(dead_album)
	db.session.commit()

	return jsonify({'message': 'we took care of that little problem for you'})
