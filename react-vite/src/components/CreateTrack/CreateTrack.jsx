import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { thunkCreateTrack } from '../../redux/tracks';

const CreateTrack = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [originalFilename, setOriginalFilename] = useState('')
	const [trackTitle, setTrackTitle] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()

		const newTrack = {
			originalFilename,
			trackTitle
		}
		dispatch(thunkCreateTrack(newTrack))
	}
	return (
		<div>
			<form onSubmit={handleSubmit} encType='multipart/form-data'>
			<label>your file</label>
				<input
					type='file'
					value={originalFilename}
					onChange={(e) => setOriginalFilename(e.target.files[0])}
				/>
				<label>name yr song</label>
				<input
					type='text'
					value={trackTitle}
					onChange={(e) => setTrackTitle(e.target.value)}
				/>
			</form>
		</div>
	)
}

export default CreateTrack
