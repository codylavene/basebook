import React, { useEffect, useState } from "react";
import User from "./User";
import UserHeader from "./UserHeader";
import "./Profile.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as profileActions from "../../../store/profile";
const Profile = (props) => {
	const dispatch = useDispatch();
	const [user, setUser] = useState({});
	const { userId } = useParams();
	const curr_profile = useSelector((state) => state.profile.profile);
	useEffect(() => {
		setUser(curr_profile);
	}, []);
	useEffect(() => {
		(async () => {
			const user = await dispatch(profileActions.loadProfile(userId));
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
