import './CreateComment.css';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { thunkCreateComment } from '../../redux/comments';

const CreateComment = ({album}) => {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const albumId = album.id
	const [body, setBody] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault()
		const newComment = {
			body,
			album_id: albumId
		}
		dispatch(thunkCreateComment(newComment))
		setBody("")
		navigate(`/albums/${albumId}`)
	}

	return (
		<form onSubmit={handleSubmit}>
		<h2>say somethin</h2>
	<div>
		<textarea
		rows={8}
		cols={80}
		value={body}
		onChange={(e) => setBody(e.target.value)}
		required
		/>
	</div>
	<button type='submit'>post!</button>
		</form>
	)
}

export default CreateComment
