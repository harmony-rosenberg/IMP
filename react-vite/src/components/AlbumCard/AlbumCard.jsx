import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import './AlbumCard.css';

const AlbumCard = ({album}) => {
	const navigate = useNavigate()
  const user = useSelector(state => state.session.user)

	return (
		<div className='card-container'>
			<img onClick={() => user ? (
				navigate(`/albums/${album.id}`)
			) : (
				alert('log in to view albums!')
			)}
			src={album.artwork} />
			<div>{album.album_title}</div>
			<div>By {album.user.artistName}</div>
			{/* <div>{album.genre} /  /<span className='date'>{date}</span></div> */}

			</div>
	)
}

export default AlbumCard;
