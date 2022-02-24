import React, { useState } from "react";

const EditDetailsForm = ({}) => {
	const [bio, setBio] = useState("");
	const [city, setCity] = useState("");
	const [work, setWork] = useState("");
	const [education, setEducation] = useState("");
	const onSubmit = (e) => {
		e.preventDefault();
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
				></textarea>
				<input
					type="text"
					placeholder="Where are you from?"
					onChange={(e) => setCity(e.target.value)}
				></input>
				<input
					type="text"
					placeholder="Where do you work?"
					onChange={(e) => setWork(e.target.value)}
				></input>
				<input
					type="text"
					placeholder="Where did you go to school?"
					onChange={(e) => setEducation(e.target.value)}
				></input>
				<button>Save</button>
			</form>
		</div>
	);
};

export default EditDetailsForm;
