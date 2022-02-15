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

export const addPost = (post) => async (dispatch) => {
	console.log(post);
	const res = await fetch(`/api/posts/`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ post_body: post }),
	});
	const data = await res.json();
	if (res.ok) {
		dispatch(create(data));
	} else {
		console.log(data);
	}
};

export const editPost = (post, id) => async (dispatch) => {
	const res = await fetch(`/api/posts/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ post_body: post }),
	});
	const data = await res.json();
	if (res.ok) {
		dispatch(edit(data));
	} else {
		console.log(data);
	}
};
export const deletePost = (post) => async (dispatch) => {};

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

		default:
			return state;
	}
};

export default reducer;
