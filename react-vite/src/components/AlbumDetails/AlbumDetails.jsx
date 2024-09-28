import './AlbumDetails.css';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import CreateComment from "../CreateComment/CreateComment";
import CommentCard from "../CommentCard/CommentCard";
import DeleteAlbum from "../DeleteAlbum/DeleteAlbum";


const AlbumDetails = ({album}) => {
  const user = useSelector(state => state.session.user)
	const navigate = useNavigate();
  const { setModalContent } = useModal();
	const albumId = album.id

	const openDeleteAlbumModal = () => {
		setModalContent(<DeleteAlbum album={album}/>)
	}

	const openUpdateAlbumForm = () => {
		navigate(`/albums/${albumId}/edit`)
	}

	const openTrackUpload = () => {
		navigate(`/albums/${albumId}/tracks`)
	}

	return (
		user && user.id == album.user_id ? (
			<>
			<div className="album-details-container">
				<h1>{album.album_title}</h1>
				<img src={album.artwork} />
				<div className="manage-btns">
				<button onClick={openDeleteAlbumModal}>Delete</button>
				<button onClick={openUpdateAlbumForm}>Update</button>
				<button onClick={openTrackUpload}>Tracks</button>
				</div>
			</div>
				<div className="track-list"> {Object.values(album.tracks).map((track) => (
				<div key={track.id}>{track.track_title}</div>
			))}
			</div>
			<CommentCard album={album}/>
			</>
			) :
			<div className="album-details-container">
			<h1>{album.album_title}</h1>
			<img src={album.artwork} />
			<div className="track-list"> {Object.values(album.tracks).map((track) => (
				<div key={track.id}>{track.track_title}</div>
			))}
			</div>
				<CreateComment album={album} />
				<CommentCard album={album}/>
			</div>

	)
}

export default AlbumDetails;
