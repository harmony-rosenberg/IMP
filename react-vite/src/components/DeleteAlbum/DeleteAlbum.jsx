import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from '../../context/Modal';
import { thunkDeleteAlbum } from "../../redux/albums";
import './DeleteAlbum.css';

const DeleteAlbum = ({album}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {closeModal} = useModal();

	const handleSubmit = (e) => {
		e.preventDefault()

		const payload = {
			...album
		}
		dispatch(thunkDeleteAlbum(payload))
		closeModal()
		navigate('/') //will navigate to users album page when created
	}

	return (
		<form onSubmit={handleSubmit}>
			<h2>are u suuuuure?</h2>
			<button type="submit">ya dude</button>
			<button onClick={() => closeModal()}>nvm</button>
		</form>
	)
}

export default DeleteAlbum
