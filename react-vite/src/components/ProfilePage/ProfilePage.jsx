import './ProfilePage.css';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";


const ProfilePage = () => {
  const user = useSelector(state => state.session.user)
	console.log(user)

	return (
		<>
		<h1>{user.artistName}</h1>
		<img className='pfp' src={user.profilePicture} />
		<div>{user.bio}</div>
		</>
	)
}

export default ProfilePage;
