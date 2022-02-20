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

export const getComments = (id) => async (dispatch) => {
	const res = await fetch(`/api/posts/${id}/comments`);

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
	console.log(post_id);
	const res = await fetch(`/api/posts/${post_id}/comments`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ comment_body }),
	});
	const data = await res.json();
	if (res.ok) {
		dispatch(edit(data));
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
		dispatch(edit(data));
	} else {
		console.log(data);
	}
};
export const deleteComment = (post_id, id) => async (dispatch) => {
	const res = await fetch(`/api/posts/${post_id}/comments/${id}`, {
		method: "DELETE",
	});

	const data = await res.json();
	if (res.ok) {
		dispatch(edit(data.post));
	} else {
		console.log("Uh Oh");
	}
};
