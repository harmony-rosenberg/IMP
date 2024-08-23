import './HomePage.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllAlbums } from '../../redux/albums';

const HomePage = () => {
	const dispatch = useDispatch();
	const albums = useSelector(state => state.albums);

	useEffect(() => {
		dispatch(thunkGetAllAlbums())
	}, [dispatch])

	return (
		<div>{Object.values(albums).map((album) => (
			<div key={album.id}>{album.album_title}</div>
		))}</div>
	)
}

export default HomePage;
