import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as profileActions from "../store/profile";
import FriendCard from "./Pages/Profile/FriendCard";
import "./Friends.css";
function UsersList() {
	const dispatch = useDispatch();
	const [friends, setFriends] = useState([]);
	const curr_user = useSelector((state) => state.session.user);
	// const allUsers = useSelector((state) => state.profile.allProfiles);

	useEffect(() => {
		setFriends(curr_user.friends);
	}, []);
	console.log(friends);
	console.log(curr_user.friends);
	// const userComponents = Object.values(friends).map((friend) => {
	// 	return (
	// 		// <li key={friend.id}>
	// 		// 	<NavLink to={`/users/${friend.id}`}>
	// 		// 		{`${friend.first_name} ${friend.last_name}`}
	// 		// 	</NavLink>
	// 		// </li>
	// 		<FriendCard />
	// 	);
	// });

	return (
		<div className="friends--container" style={{ marginTop: 70 }}>
			<h2>Friends</h2>
			<div className="friends--cards">
				{curr_user.friends.map((friend) => (
					<FriendCard key={friend.id} friend={friend} />
				))}
			</div>
		</div>
	);
}

export default UsersList;
