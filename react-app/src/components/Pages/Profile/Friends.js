import React from "react";
import { Link, NavLink } from "react-router-dom";
import FriendCard from "./FriendCard";

const Friends = ({ user }) => {
	return (
		<>
			<div className="friends-container--profile">
				<h2>Friends</h2>
				<div className="friends--cards">
					{user.friends?.length > 0 &&
						user.friends.map((friend) => (
							<FriendCard friend={friend} key={friend.id} />
						))}
				</div>
			</div>
		</>
	);
};

export default Friends;
