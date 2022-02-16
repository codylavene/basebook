import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import DemoLogin from "./DemoLogin";

const SignUpForm = ({ setShowModal }) => {
	const [errors, setErrors] = useState([]);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [birthdate, setBirthdate] = useState(new Date());
	const [gender, setGender] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const onSignUp = async (e) => {
		e.preventDefault();
		if (password === repeatPassword) {
			const data = await dispatch(
				signUp(
					firstName,
					lastName,
					email,
					phone,
					birthdate,
					gender,
					password
				)
			);
			if (data) {
				setErrors(data);
			} else {
				setShowModal(false);
			}
		}
	};

	const updateFirstName = (e) => {
		setFirstName(e.target.value);
	};
	const updateLastName = (e) => {
		setLastName(e.target.value);
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};
	const updatePhone = (e) => {
		setPhone(e.target.value);
	};
	const updateBirthdate = (e) => {
		setBirthdate(e.target.value);
	};
	const updateGender = (e) => {
		setGender(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	const updateRepeatPassword = (e) => {
		setRepeatPassword(e.target.value);
	};

	if (user) {
		return <Redirect to="/feed" />;
	}

	return (
		<form onSubmit={onSignUp}>
			<div>
				{errors.map((error, ind) => (
					<div key={ind}>{error}</div>
				))}
			</div>
			<div>
				<input
					type="text"
					placeholder="First Name"
					onChange={updateFirstName}
					value={firstName}
				></input>
			</div>
			<div>
				<input
					type="text"
					placeholder="Last Name"
					onChange={updateLastName}
					value={lastName}
				></input>
			</div>
			<div>
				<input
					type="text"
					placeholder="Email"
					onChange={updateEmail}
					value={email}
				></input>
			</div>
			<div>
				<input
					type="text"
					placeholder="Phone Number"
					onChange={updatePhone}
					value={phone}
				></input>
			</div>
			<div>
				<input
					type="date"
					placeholder="Birthday"
					onChange={updateBirthdate}
					value={birthdate}
				></input>
			</div>
			<div>
				<input
					type="text"
					placeholder="Gender"
					onChange={updateGender}
					value={gender}
				></input>
			</div>
			<div>
				<label>Password</label>
				<input
					type="password"
					name="password"
					onChange={updatePassword}
					value={password}
				></input>
			</div>
			<div>
				<label>Repeat Password</label>
				<input
					type="password"
					name="repeat_password"
					onChange={updateRepeatPassword}
					value={repeatPassword}
					required={true}
				></input>
			</div>
			<button type="submit">Sign Up</button>
			<DemoLogin />
		</form>
	);
};

export default SignUpForm;
