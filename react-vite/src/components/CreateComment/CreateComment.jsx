import './CreateComment.css';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { thunkCreateComment } from '../../redux/comments';

const CreateComment = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const albumId = useParams();
	const [body, setBody] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log('ALBUM ID', albumId)

		const newComment = {
			body,
			album_id: albumId
		}
		dispatch(thunkCreateComment(newComment))
		navigate('/')
	}

	return (
		<div>
		<form onSubmit={handleSubmit}>
		<h2>say somethin</h2>
		<div>
		<label>body</label>
		<input
			type='text'
			value={body}
			onChange={(e) => setBody(e.target.value)}
			required
			/>
		</div>
		<button type='submit'>post!</button>
		</form>
		</div>
	)
}

export default CreateComment
