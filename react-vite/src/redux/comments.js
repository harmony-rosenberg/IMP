const LOAD_USER_COMMENTS = 'comments/loadUserComments'
const CREATE_COMMENT = 'comments/createComment'
const UPDATE_COMMENT = 'comments/updateComment'
const DELETE_COMMENT = 'comments/deleteComment'

const loadUserComments = (payload) => ({
	type: LOAD_USER_COMMENTS,
	payload
})

const createComment = (payload) => ({
	type: CREATE_COMMENT,
	payload
})

const updateComment = (payload) => ({
	type: UPDATE_COMMENT,
	payload
})

const deleteComment = (payload) => ({
	type: DELETE_COMMENT,
	payload
})

export const thunkGetUserComments = () => async (dispatch) => {
	const res = await fetch('/api/comments')

	if (res.ok) {
		const data = await res.json()

		if (data.errors) {
			return;
		}
		dispatch(loadUserComments(data))
	}
}

export const thunkCreateComment = (comment) => async (dispatch) => {
	const res = await fetch('/api/comments', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(comment)
	})

	if (res.ok) {
		const data = await res.json()

		if (data.errors) {
			return;
		}
		dispatch(createComment(data))
		return data
	}
}

export const thunkUpdateComment = (comment) => async (dispatch) => {
	const res = await fetch(`/api/comments/${comment.id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(comment)
	})

	if (res.ok) {
		const data = await res.json()

		if (data.errors) {
			return;
		}
		dispatch(updateComment(data))
		return data
	}
}

export const thunkDeleteComment = (comment) => async (dispatch) => {
	const res = await fetch(`/api/comments/${comment.id}`, {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
	})

	if (res.ok) {
		const data = await res.json()

		if (data.errors) {
			return;
		}

		dispatch(deleteComment(data))
	}
}

const initialState = {};

const commentReducer = (state = initialState, action) => {
	switch(action.type) {
		case LOAD_USER_COMMENTS: {
			const newState = {}
			action.payload.forEach(comment => {
				newState[comment.id] = comment
			});
			return {...newState}
		}
		case CREATE_COMMENT: {
			const newState = {}
			newState[action.payload.id] = action.payload
			return {...state, ...newState}
		}
		case UPDATE_COMMENT: {
			const newState = {}
			newState[action.payload.id] = action.payload.updatedComment
			return {...state, ...newState}
		}
		case DELETE_COMMENT: {
			return Object.values(state).filter(comment => comment.id !== action.comment.id)
		}
		default:
			return state
	}
}

export default commentReducer;
