import { useNavigate } from 'react-router-dom';
import './AlbumCard.css';

const AlbumCard = ({album}) => {
	const navigate = useNavigate()

	console.log(album.user.username)

	return (
		<div className='card-container'>
			<img onClick={() => navigate(`/albums/${album.id}`)} src={album.artwork} />
			{album.album_title}
			</div>
	)
}

export default AlbumCard;
