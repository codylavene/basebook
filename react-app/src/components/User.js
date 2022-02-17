import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Post from "./Posts/Post";

function User() {
	const [user, setUser] = useState({});
	const { userId } = useParams();

	useEffect(() => {
		if (!userId) {
			return;
		}
		(async () => {
			const response = await fetch(`/api/users/${userId}`);
			const user = await response.json();
			setUser(user);
		})();
	}, [userId]);

	if (!user) {
		return null;
	}

	return (
		<ul>
			<li>
				<strong>User Id</strong> {userId}
			</li>
			<li>
				<strong>First Name</strong> {user.first_name}
			</li>
			<li>
				<strong>Last Name</strong> {user.last_name}
			</li>
			<li>
				<strong>Contact</strong> {user.contact}
			</li>
			<li>
				<strong>Birthdate</strong> {user.birthdate}
			</li>
			{user?.posts?.length > 0 &&
				user?.posts?.map((post) => <Post post={post} key={post.id} />)}
		</ul>
	);
}
export default User;
