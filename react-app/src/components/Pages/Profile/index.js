import React, { useEffect, useState } from "react";
import User from "./User";
import UserHeader from "./UserHeader";
import "./Profile.css";
import { useParams } from "react-router-dom";
const Profile = (props) => {
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
		<div>
			<UserHeader user={user} />
			<User user={user} />
		</div>
	);
};

export default Profile;
