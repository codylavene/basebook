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
		<div className="signup-form-card">
			<div className="modal-head">
				<div className="modal-head--text-wrapper">
					<div className="modal-head--main">Sign Up</div>
					<div className="modal-head--text">It's quick and easy.</div>
				</div>
				<div className="close-modal">
					<i
						className="fa-solid fa-xmark"
						onClick={() => setShowModal(false)}
					></i>
				</div>
			</div>

			<form onSubmit={onSignUp} className="signup-form">
				<div className="errors">
					{errors.map((error, ind) => (
						<div key={ind}>{error}</div>
					))}
				</div>
				<div className="name">
					<input
						type="text"
						placeholder="First name"
						onChange={updateFirstName}
						value={firstName}
					></input>
					<input
						type="text"
						placeholder="Last name"
						onChange={updateLastName}
						value={lastName}
					></input>
				</div>
				<input
					type="text"
					placeholder="Email"
					onChange={updateEmail}
					value={email}
				></input>
				<input
					type="text"
					placeholder="Mobile Number"
					onChange={updatePhone}
					value={phone}
				></input>
				<input
					type="password"
					placeholder="New password"
					onChange={updatePassword}
					value={password}
				></input>
				<input
					type="password"
					placeholder="Confirm new password"
					onChange={updateRepeatPassword}
					value={repeatPassword}
					required={true}
				></input>
				<div className="label">Birthday</div>
				<input
					type="date"
					placeholder="Birthday"
					onChange={updateBirthdate}
					value={birthdate}
				></input>
				<div className="label">Gender</div>
				<input
					type="text"
					placeholder="Gender"
					onChange={updateGender}
					value={gender}
				></input>
				<div className="fake-terms--text">
					By clicking Sign Up, you agree to absolutely nothing. We
					will not harvest your data, as we are not a real company.
					You will not recieve any SMS Notifications from us.
				</div>
				<button type="submit" className="signup-btn green-btn">
					Sign Up
				</button>
			</form>
		</div>
	);
};

export default SignUpForm;
