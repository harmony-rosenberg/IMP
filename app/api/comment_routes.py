from flask import Blueprint, request, jsonify
from app.models import db, Album, User, Comment
from flask_login import login_required, current_user

comment_routes = Blueprint('comments', __name__, url_prefix='/comments')

#get a users comments
@comment_routes.route('')
@login_required
def get_user_comments():
	comments = Comment.query.filter_by(user_id=current_user.id).all()
	return jsonify([comment.to_dict() for comment in comments]), 200

#create a new comment
@comment_routes.route('', methods=['POST'])
@login_required
def create_comment():
	body = request.json.get('body')

	if not body:
		return jsonify({'error': 'body is required!'})

	new_comment = Comment(body=body, user_id=current_user.id)
	db.session.add(new_comment)
	db.session.commit()

	return jsonify(new_comment.to_dict()), 201

#update a comment
@comment_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_comment(id):
	edit_comment = Comment.query.get(id)

	if edit_comment is None:
		return jsonify({'error': 'Sorry no comment like this exists'})

	body = request.json.get('body')

	if body:
		edit_comment.body=body

	db.session.commit()

	return jsonify([edit_comment.to_dict()])

#delete a comment
@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
	dead_comment = Comment.query.get(id)

	if dead_comment is None:
		return jsonify({'error': 'could not for the life of us find this comment'})

	db.session.delete(dead_comment)
	db.session.commit()

	return jsonify({'message': 'no more comment'})
