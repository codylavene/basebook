import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loadProfile } from "../../../store/profile";
import { updateDetails } from "../../../store/session";

const EditDetailsForm = ({ user, setShowModal }) => {
	const dispatch = useDispatch();
	const [bio, setBio] = useState(user.details.bio);
	const [city, setCity] = useState(user.details.city);
	const [work, setWork] = useState(user.details.work);
	const [loading, setLoading] = useState(false);
	const [education, setEducation] = useState(user.details.education);
	const onSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const details = {
			bio,
			city,
			work,
			education,
		};
		await dispatch(updateDetails(details, user.id));
		await dispatch(loadProfile(user.id));
		setTimeout(() => {
			setLoading(false);
			setShowModal(false);
		}, 300);
	};
	return (
		<div className="details--form">
			<div className="details-form--head">
				Edit details
				<div>
					<i className="fa-solid fa-xmark"></i>
				</div>
			</div>
			<form onSubmit={onSubmit}>
				<textarea
					placeholder="In a short message, tell everyone about you! this will be displayed on your profile."
					onChange={(e) => setBio(e.target.value)}
					value={bio}
				></textarea>
				<input
					type="text"
					placeholder="Where are you from?"
					onChange={(e) => setCity(e.target.value)}
					value={city}
				></input>
				<input
					type="text"
					placeholder="Where do you work?"
					onChange={(e) => setWork(e.target.value)}
					value={work}
				></input>
				<input
					type="text"
					placeholder="Where did you go to school?"
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

export default EditDetailsForm;
