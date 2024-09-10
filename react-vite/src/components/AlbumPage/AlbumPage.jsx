import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import { thunkGetAlbumDetails } from "../../redux/albums";
import { thunkCreateComment } from '../../redux/comments';
import DeleteAlbum from "../DeleteAlbum/DeleteAlbum";
import './AlbumPage.css';

const AlbumPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
  const { setModalContent } = useModal();
	const {albumId} = useParams();
	const [body, setBody] = useState('');
	const albums = useSelector(state => state.albums)
	const [isLoaded, setIsLoaded] = useState(false);
	const selectedAlbum = Object.values(albums)[0]
  const user = useSelector(state => state.session.user)

	useEffect(() => {
		dispatch(thunkGetAlbumDetails(albumId)).then(() => setIsLoaded(true))
	}, [albumId, dispatch])

	const openDeleteAlbumModal = () => {
		setModalContent(<DeleteAlbum album={selectedAlbum}/>)
	}

	const openUpdateAlbumForm = () => {
		navigate(`/albums/${albumId}/edit`)
	}

	const openTrackUpload = () => {
		navigate(`/albums/${albumId}/tracks`)
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		const newComment = {
			body,
			album_id: albumId
		}
		dispatch(thunkCreateComment(newComment))
		navigate(`/albums/${albumId}`)
	}

	return (
		isLoaded && user.id == selectedAlbum.user_id ?
		(
		<div className="album-details-container">
			<h1>{selectedAlbum.album_title}</h1>
			<img src={selectedAlbum.artwork} />
			<div className="manage-btns">
			<button className="delete-btn btn" onClick={openDeleteAlbumModal}>DELETE</button>
			<button className="update-btn btn" onClick={openUpdateAlbumForm}>UPDATE</button>
			<button className="upload-btn btn" onClick={openTrackUpload}>TRACKS</button>
			</div>
			<div className="track-list"> {Object.values(selectedAlbum.tracks).map((track) => (
			<div key={track.id}>{track.track_title}</div>
		))}
		</div>
		<div className="comments-container">
				{Object.values(selectedAlbum.comments).map((comment) => (
					<div
					className="comment"
					key={comment.id}>
						<div className="comment-user">{comment.user.artistName} :</div>
						{comment.body}
						</div>
				))}
			</div>
		</div>
		) : isLoaded && selectedAlbum.user_id !== user.id ? (
		<div className="album-details-container">
		<h1>{selectedAlbum.album_title}</h1>
		<img src={selectedAlbum.artwork} />
		<div className="track-list"> {Object.values(selectedAlbum.tracks).map((track) => (
			<div key={track.id}>{track.track_title}</div>
		))}
		</div>
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
			<div className="comments-container">
				{Object.values(selectedAlbum.comments).map((comment) => (
					<div
					className="comment"
					key={comment.id}>
						<div className="comment-user">{comment.user.artistName} :</div>
						{comment.body}
						</div>
				))}
			</div>
		</div>
		) :
			<h1>loading....fart</h1>
	)
}

export default AlbumPage;
