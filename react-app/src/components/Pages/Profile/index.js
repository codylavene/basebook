import React, { useEffect, useState } from "react";
import User from "./User";
import UserHeader from "./UserHeader";
import "./Profile.css";
import { BrowserRouter, Route, Switch, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as profileActions from "../../../store/profile";
import * as commentActions from "../../../store/comments";
import * as requestActions from "../../../store/requests";
import * as postActions from "../../../store/posts";

import Friends from "./Friends";
import Requests from "./Requests";
const Profile = (props) => {
	const curr_user = useSelector((state) => state.session.user);
	console.log(curr_user.friends);
	const dispatch = useDispatch();
	const [user, setUser] = useState({});
	const [isFriend, setIsFriend] = useState(false);
	const [isPendingFriend, setIsPendingFriend] = useState(false);
	const { userId } = useParams();
	const [loading, setLoading] = useState(false);
	const sent_reqs = useSelector((state) => state.requests.requests.sent);
	const rec_reqs = useSelector((state) => state.requests.requests.received);
	console.log(sent_reqs);
	console.table(curr_user.sent_requests);
	console.table(curr_user.rec_requests);
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
	}, [userId]);
	useEffect(() => {
		dispatch(postActions.getPosts());
	}, [user.posts]);
	document.title = `${user?.full_name} | basebook`;
	useEffect(() => {
		setLoading(true);
		const checkIfFriends = () => {
			curr_user.friends.forEach((friend) => {
				if (friend.id === user.id) {
					setIsFriend(true);
					return true;
				}
			});
			return false;
		};
		checkIfFriends();
		const checkForRequests = () => {
			if (!isFriend || !checkIfFriends()) {
				curr_user.sent_requests.forEach((req) => {
					if (req.receiver_id === user.id) {
						setIsPendingFriend(true);
						console.log("<><><><><>", isPendingFriend);
						return true;
					}
				});
				return false;
			}
			return false;
		};
		checkForRequests();
		setLoading(false);
	}, [
		curr_user.friends,
		curr_user.sent_requests,
		user.id,
		isFriend,
		isPendingFriend,
	]);
	if (!user) {
		return null;
	}
	return (
		<>
			{!loading && (
				<div className="profile--container">
					<UserHeader
						user={user}
						sent_reqs={sent_reqs}
						rec_reqs={rec_reqs}
						isFriend={isFriend}
						isPendingFriend={isPendingFriend}
						setIsPendingFriend={setIsPendingFriend}
					/>
					<Switch>
						<Route exact path="/users/:userId">
							<User user={user} />
						</Route>
						<Route path="/users/:userId/friends">
							<Friends user={user} />
						</Route>
						{/* <Route path="/users/:userId/requests">
							{curr_user.id === user.id && (
								<Requests user={user} rec_requests={rec_reqs} />
							)}
						</Route> */}
					</Switch>
				</div>
			)}
		</>
	);
};

export default Profile;
