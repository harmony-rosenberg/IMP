from flask import Blueprint, request, jsonify
from app.models import db, Album
from flask_login import login_required, current_user

album_routes = Blueprint('albums', __name__, url_prefix='/albums')

#get all albums for a specific user
@album_routes.route('', methods=['GET'])
@login_required
def get_albums():
	albums = Album.query.filter_by(user_id=current_user.id).all()
	return jsonify([album.to_dict() for album in albums]), 200
