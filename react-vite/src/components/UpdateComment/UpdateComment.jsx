import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkUpdateComment } from '../../redux/comments';
import { useEffect, useState } from "react";

const UpdateComment = ({comment}) => {
	console.log(comment)
	const dispatch = useDispatch();
	const [body, setBody] = useState('');
	const {closeModal} = useModal();

	const handleSubmit = (e) => {
		e.preventDefault()

		const editComment = {
			id: comment.id,
			body
		}
		console.log(editComment)
		dispatch(thunkUpdateComment(editComment))
		closeModal()
	}

	return (
		<form onSubmit={handleSubmit}>
			<div>
		<label>body</label>
		<input
			type='text'
			placeholder={comment.body}
			value={body}
			onChange={(e) => setBody(e.target.value)}
			required
			/>
		</div>
		<button type='submit'>confirm</button>
		<button onClick={() => closeModal()}>nvm</button>
		</form>
	)
}

export default UpdateComment;
