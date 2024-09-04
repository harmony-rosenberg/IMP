from flask import Blueprint, request, jsonify
from app.models import db, Track, User
from flask_login import login_required, current_user
from .aws_functionality import (upload_file_to_s3, get_unique_filename)

track_routes = Blueprint('tracks', __name__, url_prefix='/tracks')

@track_routes.route('')
def get_all_tracks():
	tracks = Track.query.all()
	return jsonify([track.to_dict() for track in tracks]), 200

@track_routes.route('')
def upload_track():

	original_filename = request.json.get('originalFilename')
	filename = get_unique_filename(original_filename)
	track_title = request.json.get('trackTitle')

	new_track = Track(original_filename=original_filename, filename=filename, track_title=track_title)

	upload_file_to_s3(new_track)

	db.session.add(new_track)
	db.session.commit()

	return jsonify(new_track.to_dict()), 201
