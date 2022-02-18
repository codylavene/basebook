import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import DemoLogin from "./DemoLogin";

const SignUpForm = ({ setShowModal }) => {
	const [errors, setErrors] = useState([]);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [contact, setContact] = useState("");
	// const [phone, setPhone] = useState("");
	const [month, setMonth] = useState(new Date().getMonth());
	const [day, setDay] = useState(new Date().getDate());
	const [year, setYear] = useState(new Date().getFullYear());
	const [birthdate, setBirthdate] = useState(new Date(year, month, day));
	const [gender, setGender] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();
	const phoneRegex = [];
	const emailRegex = [];
	const months = [
		"Jan",
		"Feb",
		"March",
		"April",
		"May",
		"June",
		"July",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	const days = [
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
		21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
	];
	const yearGenerate = (start, end) => {
		return Array(end - start + 1)
			.fill()
			.map((_, i) => start + i)
			.sort((a, b) => b - a);
	};

	const startYear = new Date().getFullYear() - 115;
	const endYear = new Date().getFullYear() - 16;
	const years = yearGenerate(startYear, endYear);
	useEffect(() => {
		setBirthdate(new Date(year, month, day));
	}, [year, month, day]);
	const onSignUp = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		const err = {};
		if (!firstName) err["firstName"] = "";

		if (password === repeatPassword) {
			const data = await dispatch(
				signUp(
					firstName,
					lastName,
					// email,
					// phone,
					contact,
					month,
					day,
					year,
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

	const updateContact = (e) => {
		setContact(e.target.value);
	};
	// const updatePhone = (e) => {
	// 	setPhone(e.target.value);
	// };
	// const updateBirthdate = (e) => {
	// 	setBirthdate(e.target.value);
	// };
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
						required={true}
					></input>
					<input
						type="text"
						placeholder="Last name"
						onChange={updateLastName}
						value={lastName}
						required={true}
					></input>
				</div>
				<input
					type="text"
					placeholder="Mobile number or email"
					onChange={updateContact}
					value={contact}
					required={true}
				></input>
				<input
					type="password"
					placeholder="New password"
					onChange={updatePassword}
					value={password}
					required={true}
				></input>
				<input
					type="password"
					placeholder="Confirm password"
					onChange={updateRepeatPassword}
					value={repeatPassword}
					required={true}
				></input>
				<div className="label">Birthday* </div>
				<div className="birthdate-selects">
					<select
						onChange={(e) => setMonth(e.target.value)}
						value={month}
					>
						{months.map((month, i) => (
							<option value={i} key={i}>
								{month}
							</option>
						))}
					</select>
					<select
						onChange={(e) => setDay(e.target.value)}
						value={day}
					>
						{days.map((day) => (
							<option value={day} key={day}>
								{day}
							</option>
						))}
					</select>
					<select
						onChange={(e) => setYear(e.target.value)}
						value={year}
					>
						{years.map((year) => (
							<option value={year} key={year}>
								{year}
							</option>
						))}
					</select>
				</div>
				<div className="label">Pronouns</div>
				<input
					type="text"
					placeholder="Optionally, help us with your pronouns!"
					onChange={updateGender}
					value={gender}
				></input>
				<div className="fake-terms--text">
					By clicking Sign Up, you agree to absolutely nothing. We
					will not harvest your data, as we are not a real company.
					You will not recieve any SMS Notifications from us.
				</div>
				<span style={{ fontSize: 10, width: "90%", textAlign: "left" }}>
					*must be 16 years of age or older
				</span>
				<button type="submit" className="signup-btn green-btn">
					Sign Up
				</button>
			</form>
		</div>
	);
};

export default SignUpForm;
