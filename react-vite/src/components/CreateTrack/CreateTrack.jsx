import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { thunkCreateTrack } from '../../redux/tracks';

const CreateTrack = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const albumId = useParams();
	const [originalFilename, setOriginalFilename] = useState('')
	const [trackTitle, setTrackTitle] = useState('')

	const handleSubmit = async (e) => {
		e.preventDefault()

		const formData = new FormData();
		formData.append("originalFilename", originalFilename);
		formData.append("trackTitle", trackTitle);
		dispatch(thunkCreateTrack(formData))
	}

	return (
		<div>
			<form onSubmit={handleSubmit} encType='multipart/form-data'>
			<label>your file</label>
				<input
					type='file'
					accept='audio/*'
					onChange={(e) => setOriginalFilename(e.target.files[0])}
				/>
				<label>name yr song</label>
				<input
					type='text'
					value={trackTitle}
					onChange={(e) => setTrackTitle(e.target.value)}
				/>
				<button type='submit'>upload it</button>
			</form>
		</div>
	)
}

export default CreateTrack
