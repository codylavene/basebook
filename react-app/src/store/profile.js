// constants
const LOAD_ALL = "profiles/LOAD_ALL_PROFILES";
const SET_PROFILE = "profiles/SET_PROFILE";
const REMOVE_PROFILE = "profiles/REMOVE_PROFILE";

const load = (users) => ({
	type: LOAD_ALL,
	users,
});
const set = (user) => ({
	type: SET_PROFILE,
	user,
});
// const updateUser = (user) => ({
// 	type: UPDATE_USER,
// 	payload: user,
// });
// const removeProfile = () => ({
// 	type: REMOVE_PROFILE,
// });
export const loadAllProfiles = () => async (dispatch) => {
	const res = await fetch(`/api/users/`);
	const data = await res.json();
	load(data.users);
	return data.users;
};
export const loadProfile = (id) => async (dispatch) => {
	const res = await fetch(`/api/users/${id}`);
	const user = await res.json();
	console.log(user);
	set(user);
	return user;
};
export const updateDetails = (details, userId) => async (dispatch) => {
	const { bio, city, work, education } = details;
	const res = await fetch(`/api/users/${userId}/details`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ bio, city, work, education }),
	});
	if (res.ok) {
		const data = await res.json();
		dispatch(set(data));
	} else {
		return ["An error occured, please try again."];
	}
};
export const addDetails = (details, userId) => async (dispatch) => {
	const { bio, city, work, education } = details;
	const res = await fetch(`/api/users/${userId}/details`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ bio, city, work, education }),
	});
	if (res.ok) {
		const data = await res.json();
		dispatch(set(data));
	} else {
		return ["An error occured, please try again."];
	}
};

const initialState = { profile: null, allProfiles: {} };

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_PROFILE: {
			return { profile: action.user };
		}
		case LOAD_ALL: {
			const newState = { ...state };
			console.log("HERE");
			newState.allProfiles = action.users.reduce((users, user) => {
				console.log(user);
				users[user.id] = user;
				return users;
			}, {});
			return newState;
		}
		default:
			return state;
	}
}
