import React from "react";

const UserHeader = ({ user }) => {
	return (
		<div className="user-header--container">
			<div className="user-header--wrapper">
				<div className="user-header--cover-img"></div>
				<div className="user-img-name--container">
					<div className="user-header--profile-img"></div>
					<h2 className="user-header--user-name">{user.full_name}</h2>
				</div>
			</div>
			<div className="user-header--nav">
				<div>Posts</div>
				<div>About</div>
			</div>
		</div>
	);
};

export default UserHeader;
