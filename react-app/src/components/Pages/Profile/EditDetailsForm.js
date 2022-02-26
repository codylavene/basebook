import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loadProfile } from "../../../store/profile";
import * as sessionActions from "../../../store/session";
import * as profileActions from "../../../store/profile";

const EditDetailsForm = ({ user, setShowModal }) => {
	const dispatch = useDispatch();
	const [bio, setBio] = useState(user?.details?.bio);
	const [city, setCity] = useState(user?.details?.city);
	const [work, setWork] = useState(user?.details?.work);
	const [education, setEducation] = useState(user?.details?.education);
	const [bioDisabled, setBioDisabled] = useState(false);
	const [cityDisabled, setCityDisabled] = useState(false);
	const [workDisabled, setWorkDisabled] = useState(false);
	const [educationDisabled, setEducationDisabled] = useState(false);
	const [loading, setLoading] = useState(false);

	const onSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		// if (
		// 	bio.length === 0 &&
		// 	city.length === 0 &&
		// 	work.length === 0 &&
		// 	education.length === 0
		// ) {
		// 	setShowModal(false);
		// 	return;
		// }
		if (bio.length === 0 || bioDisabled) setBio(null);
		if (city.length === 0 || cityDisabled) setCity(null);
		if (work.length === 0 || workDisabled) setWork(null);
		if (education.length === 0 || educationDisabled) setEducation(null);
		const details = {
			bio,
			city,
			work,
			education,
		};
		// await dispatch(sessionActions.updateDetails(details, user.id));
		await dispatch(profileActions.updateDetails(details, user.id));
		dispatch(profileActions.loadProfile(user.id));
		setTimeout(() => {
			setLoading(false);
			setShowModal(false);
		}, 300);
	};
	return (
		<div className="details--form">
			<div className="modal-head details-form--head">
				<div className="modal-head--text-wrapper">
					<div className="modal-head--main">Edit details</div>
				</div>
				<div className="close-modal">
					<i
						className="fa-solid fa-xmark"
						onClick={() => setShowModal(false)}
					></i>
				</div>
			</div>
			<form onSubmit={onSubmit}>
				<div>Bio</div>
				<textarea
					placeholder="In a short message, tell everyone about you! this will be displayed on your profile."
					onChange={(e) => setBio(e.target.value)}
					value={bio}
					disabled={bioDisabled}
				></textarea>
				<div>Current City </div>
				<input
					type="text"
					placeholder="Where are you from?"
					onChange={(e) => setCity(e.target.value)}
					value={city}
					disabled={cityDisabled}
				></input>
				<div>Employment </div>
				<input
					type="text"
					placeholder="Where do you work?"
					onChange={(e) => setWork(e.target.value)}
					value={work}
					disabled={workDisabled}
				></input>
				<div>Education </div>
				<input
					type="text"
					placeholder="Where did you go to school?"
					onChange={(e) => setEducation(e.target.value)}
					value={education}
					disabled={educationDisabled}
				></input>
				<button>
					{loading ? (
						<i className="fa-solid fa-spinner fa-spin-pulse"></i>
					) : (
						"Save"
					)}
				</button>
			</form>
		</div>
	);
};

export default EditDetailsForm;
