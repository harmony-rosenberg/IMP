from flask import Blueprint, request, jsonify
from app.models import db, Album
from flask_login import login_required, current_user

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
