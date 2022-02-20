const LOAD = "likes/LOAD";
const CREATE = "likes/ADD";
const DELETE = "likes/DELETE";
const EDIT = "likes/EDIT";

const load = (likes) => ({
	type: LOAD,
	likes,
});

const create = (like) => ({
	type: CREATE,
	like,
});

const remove = (like) => ({
	type: DELETE,
	like,
});

const edit = (like) => ({
	type: EDIT,
	like,
});

export const getLikes = () => async (dispatch) => {
	const res = await fetch(`/api/all_likes/`);

	if (res.ok) {
		const data = await res.json();
		dispatch(load(data.likes));
	} else {
		const errors = await res.json();
		console.error(errors);
		return errors;
	}
};

export const addLike = (post_id) => async (dispatch) => {
	const res = await fetch(`/api/posts/${post_id}/likes/`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
	});
	const data = await res.json();
	if (res.ok) {
		dispatch(create(data.like));
		return data.like.id;
	} else {
		console.log(data);
	}
};

export const editLike = (post_id, like_id) => async (dispatch) => {
	const res = await fetch(`/api/posts/${post_id}/likes/${like_id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
	});
	const data = await res.json();
	if (res.ok) {
		dispatch(edit(data.like));
	} else {
		console.log(data);
	}
};
// export const addLike = (post_id) => async (dispatch) => {
// 	const res = await fetch(`/api/posts/${post_id}/likes`, {
// 		method: "POST",
// 		headers: { "Content-Type": "application/json" },
// 	});
// 	const data = await res.json();
// 	if (res.ok) {
// 		dispatch(edit(data.post));
// 		return data.like_id;
// 	} else {
// 		console.log(data);
// 	}
// };
// export const updateLike = (post_id, id) => async (dispatch) => {
// 	const res = await fetch(`/api/posts/${post_id}/likes/${id}`, {
// 		method: "PUT",
// 	});

// 	const data = await res.json();
// 	if (res.ok) {
// 		dispatch(edit(data.post));
// 	} else {
// 		console.log("Uh Oh");
// 	}
// };
const initialState = { likes: {} };
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD: {
			const newState = { ...state };
			newState.likes = action.likes.reduce((likes, like) => {
				if (likes[like.post_id]) {
					likes[like.post_id][like.id] = like;

					like.liked
						? (likes[like.post_id]["count"] += 1)
						: (likes[like.post_id]["count"] += 0);
				} else {
					likes[like.post_id] = {};
					likes[like.post_id][like.id] = like;

					like.liked
						? (likes[like.post_id]["count"] = 1)
						: (likes[like.post_id]["count"] = 0);
				}
				return likes;
			}, {});
			console.log(newState.likes);
			return newState;
		}
		case CREATE: {
			const newState = { ...state };
			if (newState.likes[action.like.post_id]) {
				newState.likes[action.like.post_id][action.like.id] =
					action.like;
			} else {
				newState.likes[action.like.post_id] = {};
				newState.likes[action.like.post_id][action.like.id] =
					action.like;
			}
			newState.likes[action.like.post_id]["count"]
				? (newState.likes[action.like.post_id]["count"] += 1)
				: (newState.likes[action.like.post_id]["count"] = 1);
			return newState;
		}
		case EDIT: {
			const newState = { ...state };
			newState.likes[action.like.post_id][action.like.id] = action.like;
			newState.likes[action.like.post_id]["count"]
				? (newState.likes[action.like.post_id]["count"] += 1)
				: (newState.likes[action.like.post_id]["count"] = 1);
			return newState;
		}
		// case DELETE: {
		// 	const newState = { ...state };
		// 	delete newState.likes[action.like.post_id][action.like.id];
		// 	return newState;
		// }

		default:
			return state;
	}
};

export default reducer;
