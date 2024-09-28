import './ProfilePage.css';
import { useSelector } from "react-redux";
import { useState } from "react";
import AlbumCard from '../AlbumCard/AlbumCard';


const ProfilePage = () => {
  const user = useSelector(state => state.session.user)
	const albums = useSelector(state => state.albums);

	const userAlbums = Object.values(albums).filter(album => {
		return album.user_id === user.id
	})

	return (
		<>
		<h1>{user.id}</h1>
		<img className='pfp' src={user.profilePicture} />
		<div>{user.bio}</div>
		<div className='album-list'>Releases: {userAlbums.map((album) => (
				<AlbumCard key={album.id} album={album}/>
			))}</div>
		</>
	)
}

export default ProfilePage;
