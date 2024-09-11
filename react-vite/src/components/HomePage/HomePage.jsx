import './HomePage.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllAlbums } from '../../redux/albums';
import AlbumCard from '../AlbumCard/AlbumCard';

const HomePage = () => {
	const dispatch = useDispatch();
	const albums = useSelector(state => state.albums);

	useEffect(() => {
		dispatch(thunkGetAllAlbums())
	}, [dispatch])

	return (
		<div className='home-page'>
			<h1>I.M.P.</h1>
			<div className='album-list'>{Object.values(albums).map((album) => (
				<AlbumCard key={album.id} album={album}/>
			))}</div>
		</div>
	)
}

export default HomePage;
