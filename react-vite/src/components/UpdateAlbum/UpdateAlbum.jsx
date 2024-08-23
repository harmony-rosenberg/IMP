import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { thunkGetAlbumDetails, thunkUpdateAlbum } from "../../redux/albums";
import './UpdateAlbum.css';

const UpdateAlbum = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {albumId} = useParams();
	const album = useSelector(state => state.albums)
	const [albumTitle, setAlbumTitle] = useState('');
	const [credits, setCredits] = useState('');
	const [artwork, setArtwork] = useState('');
	// const [errors, setErrors] = useState('');

	useEffect(() => {
		dispatch(thunkGetAlbumDetails(albumId))
	}, [albumId, dispatch])

	const handleSubmit = async (e) => {
		e.preventDefault()

		const payload = {
			id: albumId,
			albumTitle: albumTitle || album.albumTitle,
			credits: credits || album.credits,
			artwork: artwork || album.artwork
		}
		const updatedAlbum = dispatch(thunkUpdateAlbum(payload))
		navigate(`/albums/${albumId}`) //will update to album page once created
		return updatedAlbum
	}

	return (
		<form onSubmit={handleSubmit}>
			<h2>update yr info</h2>
			<div>
				<label>Album Title</label>
				<input
				type='text'
				value={albumTitle}
				onChange={(e) => setAlbumTitle(e.target.value)}
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
			</div>
			<button type='submit'>Update</button>
		</form>
	)
}

export default UpdateAlbum;
