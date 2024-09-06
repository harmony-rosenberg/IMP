from flask import Blueprint, request, jsonify
from app.models import db, Track, User
from flask_login import login_required, current_user
from .aws_functionality import (upload_file_to_s3, get_unique_filename)

track_routes = Blueprint('tracks', __name__, url_prefix='/tracks')

@track_routes.route('')
def get_all_tracks():
	tracks = Track.query.all()
	return jsonify([track.to_dict() for track in tracks]), 200

@track_routes.route('', methods=['POST'])
def upload_track():

	original_filename = request.files['originalFilename']
	filename = get_unique_filename(original_filename.filename)
	original_filename.filename = filename
	track_title = request.form.get('trackTitle')
	album_id = request.json.get('albumId')

	if not original_filename:
		return jsonify({'error': 'need that file, buddy'})
	if not track_title:
		return jsonify({'error': 'name your track plz!'})

	upload_file_to_s3(original_filename)

	new_track = Track(original_filename=original_filename.filename, filename=filename, track_title=track_title, album_id=album_id)


	db.session.add(new_track)
	db.session.commit()

	return jsonify(new_track.to_dict()), 201
