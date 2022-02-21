import React from "react";
import { useSelector } from "react-redux";

const UserHeader = ({ user }) => {
	const curr_user = useSelector((state) => state.session.user);
	return (
		<div className="user-header--container">
			<div className="user-header--wrapper">
				<div className="user-header--cover-img"></div>
				<div className="user-img-name--container">
					<div className="user-img--wrapper">
						<div className="user-header--profile-img">
							{user.id === curr_user.id && (
								<i className="fa-solid fa-camera"></i>
							)}
						</div>
					</div>
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
