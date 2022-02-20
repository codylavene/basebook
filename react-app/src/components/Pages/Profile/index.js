import React, { useEffect, useState } from "react";
import User from "./User";
import UserHeader from "./UserHeader";
import "./Profile.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as profileActions from "../../../store/profile";
import * as commentActions from "../../../store/comments";
const Profile = (props) => {
	const dispatch = useDispatch();
	const [user, setUser] = useState({});
	const { userId } = useParams();
	const curr_profile = useSelector((state) => state.profile.profile);
	const comments = useSelector((state) => state.comments.comments);
	useEffect(() => {
		dispatch(commentActions.getComments());
		setUser(curr_profile);
	}, []);
	useEffect(() => {
		const getUser = async () => {
			const user = await dispatch(profileActions.loadProfile(userId));
			setUser(user);
		};
		getUser();
	}, []);

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
