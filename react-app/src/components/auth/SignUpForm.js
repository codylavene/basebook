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

	const [month, setMonth] = useState(new Date().getMonth());
	const [day, setDay] = useState(new Date().getDate());
	const [year, setYear] = useState(new Date().getFullYear());
	const [birthdate, setBirthdate] = useState(new Date(year, month, day));
	const [gender, setGender] = useState("");
	const [password, setPassword] = useState("");
	const [type, setType] = useState("tel");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [pattern, setPattern] = useState("");
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();
	const phoneRegex = /^\d{3}-\d{3}-\d{4}$/g;
	const emailRegex = /^[\w\d-]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/g;
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
		const err = { ...errors };
		// if (!firstName || !/^\w{2,100}$/g.test(firstName))
		// 	err.firstName = "Whats your name? Cannot include symbols.";
		// if (!lastName || !/^\w{2,100}$/g.test(lastName))
		// // 	err.lastName = "Whats your name? Cannot include symbols.";
		// if (!emailRegex.test(contact) || !phoneRegex.test(contact)) {
		// 	err.contact =
		// 		"Hmm... This doesn't seem to be a valid phone number or email";
		// 	setErrors(...err);
		// 	return;
		// }
		// if (password.length < 8 && repeatPassword.length < 8) {
		// 	err.password = "Password must be 8 characters or longer";

		if (password !== repeatPassword) {
			setRepeatPassword("");
		}
		if (password === repeatPassword) {
			const data = await dispatch(
				signUp(
					firstName,
					lastName,
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

			// if (Object.values(err).length) setErrors(err);
		}
	};
	// useEffect(() => {
	// 	if (contact && /[a-zA-z]/g.test(contact[0])) {
	// 		setType("email");
	// 		setPattern(emailRegex);
	// 	} else {
	// 		setType("tel");
	// 		setPattern("[0-9]{3}-[0-9]{3}-[0-9]{4}");
	// 		// /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
	// 	}
	// }, [contact]);
	const updateFirstName = (e) => {
		setFirstName(e.target.value);
	};
	const updateLastName = (e) => {
		setLastName(e.target.value);
	};

	const updateContact = (e) => {
		setContact(e.target.value);
		e.target.setCustomValidity("");
		// if (/[a-zA-z]/g.test(contact[0])) setType("email");
		// else setType("tel");
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
	/*--------------------------------------------------------------------*/
	// const checkFirstName = (e) => {
	// 	const err = { ...errors };
	// 	if (!firstName || !/^[a-zA-Z]+$/g.test(firstName)) {
	// 		errors.firstName = "Whats your name? Cannot include symbols.";
	// 		// setErrors(...errors, err);
	// 		return false;
	// 	}
	// 	return true;
	// };
	// const checkLastName = (e) => {
	// 	const err = { ...errors };
	// 	if (!lastName || !/^[a-zA-Z]+$/g.test(lastName)) {
	// 		errors.lastName = "Whats your name? Cannot include symbols.";
	// 		// setErrors(...errors, err);
	// 	}
	// };

	// const checkContact = (e) => {
	// 	const err = { ...errors };
	// 	if (!emailRegex.test(contact) && !phoneRegex.test(contact)) {
	// 		errors.contact =
	// 			"Hmm... This doesn't seem to be a valid phone number or email";
	// 		// setErrors(...errors, err);
	// 	}
	// };

	// const checkPassword = (e) => {
	// 	const err = { ...errors };
	// 	if (password.length < 8) {
	// 		errors.password = "Password must be 8 characters or longer";
	// 		// setErrors(...errors, err);
	// 	}
	// };

	// const checkRepeatPassword = (e) => {
	// 	const err = { ...errors };
	// 	if (repeatPassword !== password) {
	// 		errors.password = "Passwords must match";
	// 		// setErrors(...errors, err);
	// 	}
	// };

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
						onInvalid={(e) =>
							e.target.setCustomValidity(
								"What's your first name?"
							)
						}
						title={"What's your first name?"}
						onInput={(e) => e.target.setCustomValidity("")}
					></input>
					<input
						type="text"
						placeholder="Last name"
						onChange={updateLastName}
						// onBlur={(e) => checkLastName(e)}
						value={lastName}
						title={"What's your last name"}
						required={true}
						onInvalid={(e) =>
							e.target.setCustomValidity("What's your last name?")
						}
						onInput={(e) => e.target.setCustomValidity("")}
					></input>
				</div>
				<input
					type={type}
					placeholder="Email Address"
					onChange={updateContact}
					// pattern={
					// 	type === "tel"
					// 		? "[0-9]{3}-[0-9]{3}-[0-9]{4}"
					// 		: /^[\w\d-]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/g
					// }
					// onBlur={(e) => checkContact(e)}
					value={contact}
					required={true}
					onInvalid={(e) =>
						// type === "tel"
						// 	? e.target.setCustomValidity(
						// 			"Format your phone number as 555-555-5555"
						// 	  )
						// :
						e.target.setCustomValidity(
							"This doesn't seem to be a valid email"
						)
					}
					onInput={(e) => e.target.setCustomValidity("")}
				></input>
				<div className="errors">
					{errors.length > 0 && errors[0].split(" : ")[1]}
				</div>
				<input
					type="password"
					placeholder="New password"
					onChange={updatePassword}
					// onBlur={(e) => checkPassword(e)}
					title={"Enter a password of at least 8 characters"}
					value={password}
					required={true}
					minLength={8}
					onInvalid={(e) =>
						e.target.setCustomValidity(
							"Password must be 8 characters or longer"
						)
					}
					onInput={(e) => e.target.setCustomValidity("")}
					// style={{ borderColor: errors.password ? "red" : "" }}
				></input>
				<input
					type="password"
					placeholder="Confirm password"
					onChange={updateRepeatPassword}
					title={"Confirm your password"}
					onBlur={(e) =>
						e.target.setCustomValidity(
							password === repeatPassword
								? ""
								: "Passwords must match"
						)
					}
					value={repeatPassword}
					required={true}
					minLength={8}
					onInvalid={(e) =>
						e.target.setCustomValidity("Passwords must match")
					}
					onInput={(e) => e.target.setCustomValidity("")}
					// style={{ borderColor: errors.password ? "red" : "" }}
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
