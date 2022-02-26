import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loadProfile } from "../../../store/profile";
import * as sessionActions from "../../../store/session";
import * as profileActions from "../../../store/profile";

const AddDetailsForm = ({ user, setShowModal }) => {
	const dispatch = useDispatch();
	const [bio, setBio] = useState("");
	const [city, setCity] = useState("");
	const [work, setWork] = useState("");
	const [education, setEducation] = useState("");
	const [loading, setLoading] = useState(false);

	const onSubmit = async (e) => {
		e.preventDefault();
		if (
			bio.length === 0 &&
			city.length === 0 &&
			work.length === 0 &&
			education.length === 0
		) {
			setShowModal(false);
			return;
		}
		setLoading(true);
		const details = {
			bio,
			city,
			work,
			education,
		};
		// await dispatch(sessionActions.updateDetails(details, user.id));
		await dispatch(profileActions.addDetails(details, user.id));
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
					<div className="modal-head--main">Add details</div>
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
				></textarea>
				<div>Current City</div>
				<input
					type="text"
					placeholder="Where are you from?"
					onChange={(e) => setCity(e.target.value)}
					value={city}
				></input>
				<div>Employment</div>
				<input
					type="text"
					placeholder="Where do you work?"
					onChange={(e) => setWork(e.target.value)}
					value={work}
				></input>
				<div>Education</div>
				<input
					type="text"
					placeholder="Where did / do you go to school?"
					onChange={(e) => setEducation(e.target.value)}
					value={education}
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

export default AddDetailsForm;
