const LOAD_ALL_ALBUMS = 'albums/loadAllAlbums'
const LOAD_ALBUM_DETAILS = 'albums/loadDetails'
const CREATE_ALBUM = 'albums/createAlbum'
const UPDATE_ALBUM = 'albums/updateAlbum'

const loadAllAlbums = (payload) => ({
	type: LOAD_ALL_ALBUMS,
	payload
})

const loadAlbumDetails = (payload) => ({
	type: LOAD_ALBUM_DETAILS,
	payload
})

const createAlbum = (payload) => ({
	type: CREATE_ALBUM,
	payload
})

const updateAlbum = (payload) => ({
	type: UPDATE_ALBUM,
	payload
})

export const thunkGetAllAlbums = () => async (dispatch) => {
	const res = await fetch('/api/albums')

	if (res.ok) {
		const data = await res.json()

		if (data.errors) {
			return;
		}

		dispatch(loadAllAlbums(data))
	}
}

export const thunkGetAlbumDetails = (id) => async (dispatch) => {
	const res = await fetch(`/api/albums/${id}`)

	if (res.ok) {
		const data = await res.json()

		if (data.errors) {
			return;
		}

		dispatch(loadAlbumDetails(data))
	}
}

export const thunkCreateAlbum = (album) => async (dispatch) => {
	const res = await fetch('/api/albums', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(album)
	})

	if (res.ok) {
		const data = await res.json()

		if(data.errors) {
			return;
		}

		dispatch(createAlbum(data))
		return data
	}
}

export const thunkUpdateAlbum = (album) => async (dispatch) => {
	const res = await fetch(`/api/albums/${album.id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(album)
	})

	if (res.ok) {
		const data = await res.json()

		if (data.errors) {
			return;
		}

		dispatch(updateAlbum(data))
		return data
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
		case LOAD_ALBUM_DETAILS: {
			return {...action.payload}
		}
		case CREATE_ALBUM: {
			const newState = {}
			newState[action.payload.id] = action.payload
			return {...state, ...newState}
		}
		case UPDATE_ALBUM: {
			const newState = {}
			newState[action.payload.id] = action.payload.updatedAlbum
			return {...state, ...newState}
		}
		default:
			return state
	}
}

export default albumReducer;
