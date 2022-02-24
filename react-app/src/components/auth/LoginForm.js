import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import DemoLogin from "./DemoLogin";
import SignUpFormModal from "./SignUpFormModal";

const LoginForm = () => {
	const [errors, setErrors] = useState([]);
	const [contact, setContact] = useState("");
	const [password, setPassword] = useState("");
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();
	const phoneRegex = /^\d{10}$/g;
	const emailRegex = /^[\w\d-]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/g;
	const onLogin = async (e) => {
		e.preventDefault();
		// const err = [];
		// if (!emailRegex.test(contact) && !phoneRegex.test(contact)) {
		// 	err.push(
		// 		"Hmm... This doesn't seem to be a valid phone number or email"
		// 	);
		// 	console.log(err);
		// } else {
		const data = await dispatch(login(contact, password));
		if (data) {
			// err.push(data);
			setErrors(data);
			console.log(data);
		}
		// }
		// if (err.length) setErrors(err);
	};

	const updateContact = (e) => {
		setContact(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	if (user) {
		return <Redirect to="/feed" />;
	}

	return (
		<div className="login-form-card">
			<form onSubmit={onLogin} className="login-form">
				<div className="errors">
					{errors.map((error, ind) => (
						<div key={ind}>{error}</div>
					))}
				</div>
				<input
					type="text"
					placeholder="Email Address"
					value={contact}
					onChange={updateContact}
					required
				/>
				{/* {errors[0]?.email && <div>{errors[0].email}</div>} */}
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={updatePassword}
					required
				/>
				<button type="submit" className="blue-btn login-btn">
					Log In
				</button>
				<DemoLogin />
				<div className="login-bottom-btns">
					<SignUpFormModal />
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
