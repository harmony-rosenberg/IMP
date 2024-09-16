import { useModal } from '../../context/Modal';
import { useDispatch } from "react-redux";
import { thunkDeleteComment } from '../../redux/comments';

const DeleteComment = ({comment}) => {
	const dispatch = useDispatch();
	const {closeModal} = useModal();

	const handleSubmit = (e) => {
		e.preventDefault()

		const payload = {
			...comment
		}
		dispatch(thunkDeleteComment(payload))
		closeModal()
	}

	return (
		<form onSubmit={handleSubmit}>
		<h2>are u suuuuure?</h2>
		<button type="submit">ya dude</button>
		<button onClick={() => closeModal()}>nvm</button>
	</form>
	)
}

export default DeleteComment;
