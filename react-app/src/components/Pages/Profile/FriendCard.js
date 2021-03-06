import React from "react";
import { NavLink } from "react-router-dom";

const FriendCard = ({ friend }) => {
	return (
		<div className="single-friend--card">
			<div className="image-placeholder--square">
				{/* <img src="https://via.placeholder.com/9" alt="default"></img> */}
			</div>
			<div className="friend-details">
				<NavLink to={`/users/${friend?.id}`}>
					{`${friend?.first_name} ${friend?.last_name}`}
				</NavLink>
			</div>
		</div>
	);
};

export default FriendCard;
