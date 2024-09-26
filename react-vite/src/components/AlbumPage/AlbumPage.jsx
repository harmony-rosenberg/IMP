import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import { thunkGetAlbumDetails } from "../../redux/albums";
import { thunkCreateComment } from '../../redux/comments';
import DeleteAlbum from "../DeleteAlbum/DeleteAlbum";
import './AlbumPage.css';
import UpdateComment from "../UpdateComment";
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteComment from "../DeleteComment/DeleteComment";
import CreateComment from "../CreateComment/CreateComment";


const AlbumPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
  const { setModalContent } = useModal();
	const {albumId} = useParams();
	const [body, setBody] = useState('');
	const albums = useSelector(state => state.albums)
	const comments = useSelector(state => state.comments)
	const [isLoaded, setIsLoaded] = useState(false);
	const selectedAlbum = Object.values(albums)[0]
  const user = useSelector(state => state.session.user)

	useEffect(() => {
		dispatch(thunkGetAlbumDetails(albumId)).then(() => setIsLoaded(true))
	}, [albumId, comments, dispatch, user])

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
		setBody("")
		navigate(`/albums/${albumId}`)
	}

	return (
		isLoaded ? (
			user && user.id == selectedAlbum.user_id ? (
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
						comment.user_id == user.id ? (
						<div
						className="comment"
						key={comment.id}>
							<div className="comment-user">{comment.user.artistName} :</div>
							{comment.body}
							<OpenModalMenuItem
							itemText='edit'
							modalComponent={<UpdateComment comment={comment} />}
							/>
							<OpenModalMenuItem
							itemText='delete'
							modalComponent={<DeleteComment comment={comment} />}
							/>
							</div>
						) : (
							<div
							className="comment"
							key={comment.id}>
								<div className="comment-user">{comment.user.artistName} :</div>
								{comment.body}
								</div>
						)
					))}
				</div>
			</div>
			) : user && selectedAlbum.user_id !== user.id ? (
			<div className="album-details-container">
			<h1>{selectedAlbum.album_title}</h1>
			<img src={selectedAlbum.artwork} />
			<div className="track-list"> {Object.values(selectedAlbum.tracks).map((track) => (
				<div key={track.id}>{track.track_title}</div>
			))}
			</div>
				<CreateComment album={selectedAlbum} />
				<div className="comments-container">
					{Object.values(selectedAlbum.comments).map((comment) => (
						comment.user_id == user.id ? (
						<div
						className="comment"
						key={comment.id}>
							<div className="comment-user">{comment.user.artistName} :</div>
							{comment.body}
							<OpenModalMenuItem
							itemText='edit'
							modalComponent={<UpdateComment comment={comment} />}
							/>
							<OpenModalMenuItem
							itemText='delete'
							modalComponent={<DeleteComment comment={comment} />}
							/>
							</div>
						) : (
							<div
							className="comment"
							key={comment.id}>
								<div className="comment-user">{comment.user.artistName} :</div>
								{comment.body}
								</div>
						)
					))}
				</div>
			</div>
			) :
			<div className="album-details-container">
				<h1>{selectedAlbum.album_title}</h1>
				<img src={selectedAlbum.artwork} />
				<div className="track-list"> {Object.values(selectedAlbum.tracks).map((track) => (
				<div key={track.id}>{track.track_title}</div>
			))}
			</div>
			</div>
		) :
			<h1>loading....</h1>
	)
}

export default AlbumPage;
