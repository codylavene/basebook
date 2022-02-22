import React from "react";
import { Link } from "react-router-dom";

const Friends = ({ user }) => {
	return (
		<>
			<Link to={`/users/${user.id}/requests`}>Friend Requests</Link>
			<div>
				{user.friends?.length > 0 &&
					user.friends.map((friend) => <h2>{friend.id}</h2>)}
			</div>
		</>
	);
};

export default Friends;
