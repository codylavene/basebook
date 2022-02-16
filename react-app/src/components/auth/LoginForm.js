import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import DemoLogin from "./DemoLogin";
import SignUpFormModal from "./SignUpFormModal";

const LoginForm = () => {
	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const onLogin = async (e) => {
		e.preventDefault();
		const data = await dispatch(login(email, password));
		if (data) {
			setErrors(data);
		}
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
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
					placeholder="Email"
					value={email}
					onChange={updateEmail}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={updatePassword}
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
