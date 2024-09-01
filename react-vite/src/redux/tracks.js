const CREATE_TRACK = 'tracks/createTrack'

const createTrack = (payload) => ({
	type: CREATE_TRACK,
	payload
})

export const thunkCreateTrack = (track) => async (dispatch) => {
	const res = await fetch ('/api/tracks', {
		method: "POST",
		body: post
	})

	if (res.ok) {
		const data = await res.json()

		if(data.errors) {
			return;
		}

		dispatch(createTrack(data))
		return data
	}
}

const initialState = {};

const trackReducer = (state = initialState, action) => {
	switch(action.type) {
		case CREATE_TRACK : {
			const newState = {...initialState}
			newState[action.payload.id] = action.payload
			return {...state, ...newState}
		}
		default:
			return state
	}
}

export default trackReducer;
