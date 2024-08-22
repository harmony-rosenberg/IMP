const LOAD_ALL_ALBUMS = 'tags/loadAllTags'

const loadAllAlbums = (payload) => ({
	type: LOAD_ALL_ALBUMS,
	payload
})

export const thunkGetAllAlbums = () => async (dispatch) => {
	const res = await fetch('/api/albums')

	if (res.ok) {
		const data = await res.json()

		if(data.errors) {
			return;
		}

		dispatch(loadAllAlbums(data))
	}
}

const initialState = {};

const albumReducer = (state = initialState, action) => {
	switch(action.type) {
		case LOAD_ALL_ALBUMS: {
			const newState = {}
			action.payload.forEach(album => {
				newState[album.id] = album
			});
			return {...newState}
		}
		default:
			return state
	}
}

export default albumReducer;
