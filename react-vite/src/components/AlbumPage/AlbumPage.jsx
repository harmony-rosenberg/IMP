import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { thunkGetAlbumDetails } from "../../redux/albums";
import './AlbumPage.css';
import AlbumDetails from "../AlbumDetails";

const AlbumPage = () => {
	const dispatch = useDispatch();
	const {albumId} = useParams();
	const albums = useSelector(state => state.albums)
	const comments = useSelector(state => state.comments)
	const [isLoaded, setIsLoaded] = useState(false);
	const selectedAlbum = Object.values(albums)[0]
  const user = useSelector(state => state.session.user)

	useEffect(() => {
		dispatch(thunkGetAlbumDetails(albumId)).then(() => setIsLoaded(true))
	}, [albumId, comments, dispatch, user])

	return (
		isLoaded ? (
			<AlbumDetails album={selectedAlbum}/>
			) :
			<h1>loading....</h1>
	)
}

export default AlbumPage;
