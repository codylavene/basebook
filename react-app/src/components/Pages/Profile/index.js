import React, { useEffect, useState } from "react";
import User from "./User";
import UserHeader from "./UserHeader";
import "./Profile.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as profileActions from "../../../store/profile";
import * as commentActions from "../../../store/comments";
import * as requestActions from "../../../store/requests";
const Profile = (props) => {
	const curr_profile = useSelector((state) => state.profile.profile);
	const curr_user = useSelector((state) => state.session.user);
	console.log(curr_user.friends);
	const dispatch = useDispatch();
	const [user, setUser] = useState({});
	const { userId } = useParams();
	// const requestsObj = useSelector((state) => state.requests.requests);
	const sent_reqs = curr_user.sent_requests;
	// const sent_reqs = Object.values(requestsObj.sent);
	const rec_reqs = curr_user.rec_requests;
	// const rec_reqs = Object.values(requestsObj.received);
	console.log(sent_reqs);
	console.log(rec_reqs);
	const comments = useSelector((state) => state.comments.comments);
	useEffect(() => {
		dispatch(requestActions.getRequests());
	}, [dispatch]);
	useEffect(() => {
		const getUser = async () => {
			const user = await dispatch(profileActions.loadProfile(userId));
			dispatch(commentActions.getComments());
			setUser(user);
		};
		getUser();
	}, []);
	document.title = `${user?.full_name} | basebook`;

	if (!user) {
		return null;
	}
	return (
		<div>
			<UserHeader user={user} sent_reqs={sent_reqs} rec_reqs={rec_reqs} />
			<User user={user} />
		</div>
	);
};

export default Profile;
