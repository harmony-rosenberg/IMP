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
