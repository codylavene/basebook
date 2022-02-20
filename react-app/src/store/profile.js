// constants
const LOAD_ALL_PROFILES = "profiles/LOAD_ALL_PROFILES";
const SET_PROFILE = "profiles/SET_PROFILE";
const REMOVE_PROFILE = "profiles/REMOVE_PROFILE";

const load = (users) => ({
	type: LOAD_ALL_PROFILES,
	users,
});
const set = (user) => ({
	type: SET_PROFILE,
	user,
});

// const removeProfile = () => ({
// 	type: REMOVE_PROFILE,
// });
export const loadAllProfiles = () => async (dispatch) => {
	const res = await fetch(`/api/users/`);
	const users = await res.json();
	load(users);
	return users;
};
export const loadProfile = (id) => async (dispatch) => {
	if (!id) {
		return;
	}
	const res = await fetch(`/api/users/${id}`);
	const user = await res.json();
	set(user);
	return user;
};

const initialState = { profile: null, allProfiles: {} };

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_PROFILE: {
			return action.user;
		}
		case LOAD_ALL_PROFILES: {
			const newState = { ...state };
			newState.allProfiles = action.users.reduce((users, user) => {
				users[user.id] = user;
				return users;
			}, {});
			return newState;
		}
		default:
			return state;
	}
}
