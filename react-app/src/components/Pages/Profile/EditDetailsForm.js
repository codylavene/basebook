import React from "react";

const EditDetailsForm = (props) => {
	return (
		<div className="details--form">
			<div className="details-form--head">
				Edit details
				<div>
					<i className="fa-solid fa-xmark"></i>
				</div>
			</div>
			<form>
				<textarea placeholder="In a short message, tell everyone about you! this will be displayed on your profile."></textarea>
				<input type="text" placeholder="Where are you from?"></input>
				<input type="text" placeholder="Where do you work?"></input>
				<input
					type="text"
					placeholder="Where did you go to school?"
				></input>
				<button>Save</button>
			</form>
		</div>
	);
};

export default EditDetailsForm;
