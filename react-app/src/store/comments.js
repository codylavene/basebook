const LOAD = "comments/LOAD";
const CREATE = "comments/ADD";
const DELETE = "comments/DELETE";
const EDIT = "comments/EDIT";

const load = (comments) => ({
	type: LOAD,
	comments,
});

const create = (comment) => ({
	type: CREATE,
	comment,
});

const remove = (comment) => ({
	type: DELETE,
	comment,
});

const edit = (comment) => ({
	type: EDIT,
	comment,
});

export const getComments = (post_id) => async (dispatch) => {
	const res = await fetch(`/api/all_comments/`);

	if (res.ok) {
		const data = await res.json();
		dispatch(load(data.comments));
	} else {
		const errors = await res.json();
		console.error(errors);
		return errors;
	}
};

export const addComment = (post_id, comment_body) => async (dispatch) => {
	const res = await fetch(`/api/posts/${post_id}/comments/`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ comment_body }),
	});
	const data = await res.json();
	if (res.ok) {
		dispatch(create(data.comment));
	} else {
		console.log(data);
	}
};

export const editComment = (comment_body, post_id, id) => async (dispatch) => {
	const res = await fetch(`/api/posts/${post_id}/comments/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ comment_body }),
	});
	const data = await res.json();
	if (res.ok) {
		dispatch(edit(data.comment));
	} else {
		console.log(data);
	}
};
export const deleteComment = (post_id, comment_id) => async (dispatch) => {
	const res = await fetch(`/api/posts/${post_id}/comments/${comment_id}`, {
		method: "DELETE",
	});

	const data = await res.json();
	if (res.ok) {
		console.log(data.comment);
		dispatch(remove(data.comment));
	} else {
		console.log("Uh Oh");
	}
};
const initialState = { comments: {} };
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD: {
			const newState = { ...state };
			newState.comments = action.comments.reduce((comments, comment) => {
				// const newComment = {};
				// const id = comment.id;
				// newComment[id] = comment;
				if (comments[comment.post_id]) {
					comments[comment.post_id][comment.id] = comment;
				} else {
					comments[comment.post_id] = {};
					comments[comment.post_id][comment.id] = comment;
				}
				return comments;
			}, {});
			return newState;
		}
		case CREATE: {
			const newState = { ...state };
			// const comment = {};
			// const id = action.comment.id;
			// comment[id] = action.comment;
			if (newState.comments[action.comment.post_id]) {
				newState.comments[action.comment.post_id][action.comment.id] =
					action.comment;
			} else {
				newState.comments[action.comment.post_id] = {};
				newState.comments[action.comment.post_id][action.comment.id] =
					action.comment;
			}
			return newState;
		}
		case EDIT: {
			const newState = { ...state };
			newState.comments[action.comment.post_id][action.comment.id] =
				action.comment;

			return newState;
		}
		case DELETE: {
			const newState = { ...state };
			delete newState.comments[action.comment.post_id][action.comment.id];
			return newState;
		}

		default:
			return state;
	}
};

export default reducer;
