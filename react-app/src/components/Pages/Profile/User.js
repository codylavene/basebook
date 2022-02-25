import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CreatePostModal from "../../Posts/CreatePostModal";
import * as profileActions from "../../../store/profile";
import * as commentActions from "../../../store/comments";
import * as likeActions from "../../../store/likes";
import * as sessionActions from "../../../store/session";
import Post from "../../Posts/Post";
import EditDetailsModal from "./EditDetailsModal";
import AddDetailsModal from "./AddDetailsModal";

function User({ user }) {
	const dispatch = useDispatch();
	// const [_user, setUser] = useState(user);
	const [showEdit, setShowEdit] = useState(false);
	const { userId } = useParams();
	const curr_user = useSelector((state) => state.session.user);
	const profile = useSelector((state) => state.profile.profile);
	const comments = useSelector((state) => state.comments.comments);
	const likesObj = useSelector((state) => state.likes.likes);
	useEffect(() => {
		const update = async () => {
			await dispatch(profileActions.loadProfile(userId));
			// dispatch(commentActions.getComments());
		};
		update();
	}, [user.posts, dispatch, userId, user.details]);
	// useEffect(() => {
	// 	dispatch(sessionActions.updateDetails());
	// }, [user.details]);
	useEffect(() => {
		(async () => {
			// dispatch(commentActions.getComments());
			dispatch(likeActions.getLikes());
		})();
	}, []);
	useEffect(() => {
		// const getUser = async () => {
		// 	const user = await dispatch(profileActions.loadProfile(userId));
		// 	// dispatch(commentActions.getComments());
		// 	setUser(user);
		// 	console.log(user);
		// };
		// getUser();
	}, [userId]);
	// const message =
	// 	curr_user.id === +userId
	// 		? "What's on your mind?"
	// 		: `Write something to ${user?.first_name}...`;
	if (!user) {
		console.log("NOPE");
		return null;
	}
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const date = new Date(user.joined_at);
	const year = date.getFullYear();
	const numMonth = date.getMonth();
	const month = months[numMonth];
	const joined = `${month} ${year}`;
	return (
		<div className="user-profile--container">
			<div className="profile-details--container">
				<div className="profile-details--wrapper">
					<h2>Intro</h2>
					<h3>{profile ? profile?.full_name : user?.full_name}</h3>
					{/* <button>Add Bio</button> */}
					<div>
						{profile ? profile?.details?.bio : user?.details?.bio}
					</div>
					<div>
						<i className="fa-solid fa-location-dot"></i> From{" "}
						{profile ? profile?.details?.city : user?.details?.city}
					</div>
					<div>
						<i className="fa-solid fa-briefcase"></i> Works at{" "}
						{profile ? profile?.details?.work : user?.details?.work}
					</div>
					<div>
						<i className="fa-solid fa-clock"></i> Joined {joined}
					</div>
					<div className="edit-btn--container">
						{curr_user.id === user.id &&
							(!user.details || !profile?.details ? (
								<AddDetailsModal
									user={profile ? profile : user}
								/>
							) : (
								<EditDetailsModal
									user={profile ? profile : user}
								/>
							))}
					</div>
					{/* <button>Add Hobbies</button> */}
				</div>
			</div>
			<div className="profile-posts--container">
				{user.posts?.length > 0 &&
					user?.posts
						?.sort(
							(a, b) =>
								new Date(b.posted_at) - new Date(a.posted_at)
						)
						.map((post) => (
							<Post
								post={post}
								key={post.id}
								comments={
									comments[post.id] ? comments[post.id] : {}
								}
								likes={
									likesObj[post.id] ? likesObj[post.id] : {}
								}
							/>
						))}
			</div>
		</div>
	);
}
export default User;
