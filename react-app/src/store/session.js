// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const UPDATE_USER = "session/UPDATE_USER";
const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const updateUser = (details) => ({
	type: UPDATE_USER,
	details,
});

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (contact, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			contact,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};
export const updateDetails = (details, userId) => async (dispatch) => {
	const res = await fetch(`/api/users/${userId}/details`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ details }),
	});
	if (res.ok) {
		const data = await res.json();
		dispatch(updateUser(data));
	} else {
		return ["An error occured, please try again."];
	}
};
export const signUp =
	(first_name, last_name, contact, month, day, year, gender, password) =>
	async (dispatch) => {
		const response = await fetch("/api/auth/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				first_name,
				last_name,
				contact,
				month,
				day,
				year,
				gender,
				password,
			}),
		});

		if (response.ok) {
			const data = await response.json();
			dispatch(setUser(data));
			return null;
		} else if (response.status < 500) {
			const data = await response.json();
			if (data.errors) {
				return data.errors;
			}
		} else {
			return ["An error occurred. Please try again."];
		}
	};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		case UPDATE_USER:
			return { user: action.payload };
		default:
			return state;
	}
}
