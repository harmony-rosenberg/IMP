import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { thunkGetAlbumDetails, thunkUpdateAlbum } from "../../redux/albums";
import './UpdateAlbum.css';

const UpdateAlbum = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {albumId} = useParams();
	const albums = useSelector(state => state.albums)
	const album = Object.values(albums)[0]
	const [albumTitle, setAlbumTitle] = useState("");
	const [credits, setCredits] = useState("");
	const [artwork, setArtwork] = useState("");
	// const [releaseDate, setReleaseDate] = useState('00/00/0000');
	const [genre, setGenre] = useState("")
	const [isLoaded, setIsLoaded] = useState(false);
	// const [errors, setErrors] = useState('');

	useEffect(() => {
		dispatch(thunkGetAlbumDetails(albumId)).then(() => setIsLoaded(true))
	}, [albumId, dispatch])

	const handleSubmit = async (e) => {
		e.preventDefault()

		const payload = {
			id: albumId,
			albumTitle: albumTitle || album.album_title,
			credits: credits || album.credits,
			artwork: artwork || album.artwork,
			// releaseDate: releaseDate || album.releaseDate,
			genre: genre || album.genre
		}
		const updatedAlbum = dispatch(thunkUpdateAlbum(payload))
		navigate(`/albums/${albumId}`) //will update to album page once created
		return updatedAlbum
	}

	return (
		isLoaded ? (
		<form onSubmit={handleSubmit}>
			<h2>update yr info</h2>
			<div>
				<label>Album Title</label>
				<input
				type='text'
				placeholder={album.album_title}
				value={albumTitle}
				onChange={(e) => setAlbumTitle(e.target.value)}
				/>
			</div>
			{/* <div>
				<label>Release Date</label>
				<input
				type='text'
				value={releaseDate}
				onChange={(e) => setReleaseDate(e.target.value)}
				/>
			</div> */}
			<div>
				<label>Genre</label>
				<input
				type='text'
				placeholder={album.genre}
				value={genre}
				onChange={(e) => setGenre(e.target.value)}
				/>
			</div>
			<div>
				<label>Credits</label>
				<input
				type='text'
				placeholder={album.credits}
				value={credits}
				onChange={(e) => setCredits(e.target.value)}
				/>
			</div>
			<div>
				<label>Artwork</label>
				<input
				type='text'
				placeholder={album.artwork}
				value={artwork}
				onChange={(e) => setArtwork(e.target.value)}
				/>
			</div>
			<button type='submit'>Update</button>
		</form>
		) : (
			<h1>loading...</h1>
		)
	)
}

export default UpdateAlbum;
