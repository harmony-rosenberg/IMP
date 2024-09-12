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
	const [releaseDate, setReleaseDate] = useState('00/00/0000');
	const [genre, setGenre] = useState('')
  const [formErrors, setFormErrors] = useState({});

	const handleSubmit = (e) => {
		e.preventDefault()

		const errors = {}

		if(!albumTitle) {
			errors.albumTitle = "Needs a title"
		}

		if(!artwork) {
			errors.artwork = "Every album needs a pretty picture!"
		}

		if(Object.keys(errors).length > 0) {
			setFormErrors(errors)
			return;
		}

		const newAlbum = {
			albumTitle,
			credits,
			artwork,
			releaseDate,
			genre
		}
			dispatch(thunkCreateAlbum(newAlbum)) //will nav to album details
			navigate('/')
	}

	return (
		<form className='album-form' onSubmit={handleSubmit}>
			<h2>Create your album</h2>
			<div>
				<label>Album Title</label>
				<input
				type='text'
				value={albumTitle}
				onChange={(e) => setAlbumTitle(e.target.value)}
				/>
				<div className='error-box'>
			{formErrors.albumTitle && <p>{formErrors.albumTitle}</p>}
			</div>
			</div>
			<div>
				<label>Release Date</label>
				<input
				type='text'
				value={releaseDate}
				onChange={(e) => setReleaseDate(e.target.value)}
				/>
			</div>
			<div>
				<label>Genre</label>
				<input
				type='text'
				value={genre}
				onChange={(e) => setGenre(e.target.value)}
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
				/>
				<div className='error-box'>
			{formErrors.artwork && <p>{formErrors.artwork}</p>}
			</div>
			</div>
			<button type='submit'>Submit</button>
		</form>
	)
}

export default CreateAlbum
