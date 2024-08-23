import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { thunkCreateAlbum } from '../../redux/albums';
import './CreateAlbum.css';

const CreateAlbum = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [albumTitle, setAlbumTitle] = useState('');
	const [credits, setCredits] = useState('');
	const [artwork, setArtwork] = useState('');
	// const [errors, setErrors] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault()

		const newAlbum = {
			albumTitle,
			credits,
			artwork
		}
		dispatch(thunkCreateAlbum(newAlbum)) //will nav to album details
		navigate('/')
	}

	return (
		<form onSubmit={handleSubmit}>
			<h2>Create your album</h2>
			<div>
				<label>Album Title</label>
				<input
				type='text'
				value={albumTitle}
				onChange={(e) => setAlbumTitle(e.target.value)}
				required
				/>
			</div>
			<div>
				<label>Credits</label>
				<input
				type='text'
				value={credits}
				onChange={(e) => setCredits(e.target.value)}
				/>
			</div>
			<div>
				<label>Artwork</label>
				<input
				type='text'
				value={artwork}
				onChange={(e) => setArtwork(e.target.value)}
				required
				/>
			</div>
			<button type='submit'>Submit</button>
		</form>
	)
}

export default CreateAlbum
