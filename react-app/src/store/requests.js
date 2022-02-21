const LOAD = "requests/LOAD";
const CREATE = "requests/ADD";
const DELETE = "requests/DELETE";
const EDIT = "requests/EDIT";

const load = (requests) => ({
	type: LOAD,
	requests,
});

const create = (request) => ({
	type: CREATE,
	request,
});

const remove = (request) => ({
	type: DELETE,
	request,
});

const edit = (request) => ({
	type: EDIT,
	request,
});

export const getRequests = () => async (dispatch) => {
	const res = await fetch(`/api/requests/`);

	if (res.ok) {
		const data = await res.json();
		dispatch(load(data));
	} else {
		const errors = await res.json();
		console.error(errors);
		return errors;
	}
};

export const sendRequest = (user_id) => async (dispatch) => {
	const res = await fetch(`/api/requests/send/${user_id}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
	});
	const data = await res.json();
	if (res.ok) {
		dispatch(create(data.request));
		return data.request;
	} else {
		console.log(data);
	}
};

export const approveRequest = (req_id, user_id) => async (dispatch) => {
	const res = await fetch(`/api/requests/${req_id}/accept/${user_id}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
	});
	const data = await res.json();
	if (res.ok) {
		dispatch(remove(data.request));
	} else {
		console.log(data);
	}
};
export const declineRequest = (req_id, user_id) => async (dispatch) => {
	const res = await fetch(`/api/requests/${req_id}/decline/${user_id}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
	});
	const data = await res.json();
	if (res.ok) {
		dispatch(remove(data.request));
	} else {
		console.log(data);
	}
};
const initialState = { requests: { sent: {}, received: {} } };
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD: {
			const newState = { ...state };
			newState.requests.sent = action.requests.sent_requests.reduce(
				(sent, request) => {
					sent[request.id] = request;
					return sent;
				},
				{}
			);
			newState.requests.received = action.requests.rec_requests.reduce(
				(received, request) => {
					received[request.id] = request;
					return received;
				},
				{}
			);
			return newState;
		}
		case CREATE: {
			const newState = { ...state };
			if (newState.requests[action.request.post_id]) {
				newState.requests[action.request.post_id][action.request.id] =
					action.request;
			} else {
				newState.requests[action.request.post_id] = {};
				newState.requests[action.request.post_id][action.request.id] =
					action.request;
			}
			newState.requests[action.request.post_id]["count"]
				? (newState.requests[action.request.post_id]["count"] += 1)
				: (newState.requests[action.request.post_id]["count"] = 1);
			return newState;
		}
		case EDIT: {
			const newState = { ...state };
			newState.requests[action.request.post_id][action.request.id] =
				action.request;
			newState.requests[action.request.post_id]["count"]
				? (newState.requests[action.request.post_id]["count"] += 1)
				: (newState.requests[action.request.post_id]["count"] = 1);
			return newState;
		}
		// case DELETE: {
		// 	const newState = { ...state };
		// 	delete newState.requests[action.request.post_id][action.request.id];
		// 	return newState;
		// }

		default:
			return state;
	}
};

export default reducer;
