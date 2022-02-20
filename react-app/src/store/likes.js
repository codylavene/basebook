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
