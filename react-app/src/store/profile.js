// constants
const SET_PROFILE = "profiles/SET_PROFILE";
const REMOVE_PROFILE = "profiles/REMOVE_PROFILE";

const load = (user) => ({
	type: SET_PROFILE,
	user,
});

// const removeProfile = () => ({
// 	type: REMOVE_PROFILE,
// });
export const loadProfile = (id) => async (dispatch) => {
	if (!id) {
		return;
	}
	const res = await fetch(`/api/users/${id}`);
	const user = await res.json();
	load(user);
	return user;
};

const initialState = { profile: null };

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_PROFILE:
			return action.user;
		// case REMOVE_USER:
		// 	return { user: null };
		default:
			return state;
	}
}
