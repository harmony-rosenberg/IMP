import { useNavigate } from 'react-router-dom';
import './AlbumCard.css';

const AlbumCard = ({album}) => {
	const navigate = useNavigate()

	console.log(album.release_date)
	const date = album.release_date.slice(7, 16)

	return (
		<div className='card-container'>
			<img onClick={() => navigate(`/albums/${album.id}`)} src={album.artwork} />
			<div>{album.album_title}</div>
			<div>By {album.user.artistName}</div>
			<div>{album.genre} /  /<span className='date'>{date}</span></div>

			</div>
	)
}

export default AlbumCard;
