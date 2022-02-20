const LOAD = "posts/LOAD";
const CREATE = "posts/ADD";
const DELETE = "posts/DELETE";
const EDIT = "posts/EDIT";

const load = (posts) => ({
	type: LOAD,
	posts,
});

const create = (post) => ({
	type: CREATE,
	post,
});

const remove = (post) => ({
	type: DELETE,
	post,
});

const edit = (post) => ({
	type: EDIT,
	post,
});

export const getUserPosts = (id) => async (dispatch) => {
	const res = await fetch(`/api/users/${id}/posts`);

	if (res.ok) {
		const data = await res.json();
		dispatch(load(data));
	} else {
		const errors = await res.json();
		console.error(errors);
		return errors;
	}
};
export const getPosts = (id) => async (dispatch) => {
	const res = await fetch(`/api/posts/`);

	if (res.ok) {
		const data = await res.json();
		dispatch(load(data.posts));
	} else {
		const errors = await res.json();
		console.error(errors);
		return errors;
	}
};

export const addPost = (post_body) => async (dispatch) => {
	console.log(post_body);
	const res = await fetch(`/api/posts/`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ post_body }),
	});
	const data = await res.json();
	if (res.ok) {
		dispatch(create(data));
	} else {
		console.log(data);
	}
};

export const editPost = (post_body, id) => async (dispatch) => {
	const res = await fetch(`/api/posts/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ post_body }),
	});
	const data = await res.json();
	if (res.ok) {
		dispatch(edit(data));
	} else {
		console.log(data);
	}
};
export const deletePost = (id) => async (dispatch) => {
	const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });

	const data = await res.json();
	if (res.ok) {
		dispatch(remove(data.post));
	} else {
		console.log("Uh Oh");
	}
};

// export const addComment = (post_id, comment_body) => async (dispatch) => {
// 	console.log(post_id);
// 	const res = await fetch(`/api/posts/${post_id}/comments`, {
// 		method: "POST",
// 		headers: { "Content-Type": "application/json" },
// 		body: JSON.stringify({ comment_body }),
// 	});
// 	const data = await res.json();
// 	if (res.ok) {
// 		dispatch(edit(data));
// 	} else {
// 		console.log(data);
// 	}
// };

// export const editComment = (comment_body, post_id, id) => async (dispatch) => {
// 	const res = await fetch(`/api/posts/${post_id}/comments/${id}`, {
// 		method: "PUT",
// 		headers: { "Content-Type": "application/json" },
// 		body: JSON.stringify({ comment_body }),
// 	});
// 	const data = await res.json();
// 	if (res.ok) {
// 		dispatch(edit(data));
// 	} else {
// 		console.log(data);
// 	}
// };
// export const deleteComment = (post_id, id) => async (dispatch) => {
// 	const res = await fetch(`/api/posts/${post_id}/comments/${id}`, {
// 		method: "DELETE",
// 	});

// 	const data = await res.json();
// 	if (res.ok) {
// 		dispatch(edit(data.post));
// 	} else {
// 		console.log("Uh Oh");
// 	}
// };
export const addLike = (post_id) => async (dispatch) => {
	const res = await fetch(`/api/posts/${post_id}/likes`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		// body: JSON.stringify({ comment_body }),
	});
	const data = await res.json();
	if (res.ok) {
		dispatch(edit(data.post));
		return data.like_id;
	} else {
		console.log(data);
	}
};
export const updateLike = (post_id, id) => async (dispatch) => {
	const res = await fetch(`/api/posts/${post_id}/likes/${id}`, {
		method: "PUT",
	});

	const data = await res.json();
	if (res.ok) {
		dispatch(edit(data.post));
	} else {
		console.log("Uh Oh");
	}
};
const initialState = {
	posts: {},
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD: {
			const newState = { ...state };
			newState.posts = action.posts.reduce((posts, post) => {
				posts[post.id] = post;
				return posts;
			}, {});
			return newState;
		}
		case CREATE: {
			const newState = {
				...state,
				posts: { ...state.posts, [action.post.id]: action.post },
			};
			return newState;
		}
		case EDIT: {
			const newState = { ...state };
			newState.posts[action.post.id] = action.post;

			return newState;
		}
		case DELETE: {
			const newState = { ...state };
			delete newState.posts[action.post.id];
			return newState;
		}

		default:
			return state;
	}
};

export default reducer;
