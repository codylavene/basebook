import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CreatePostModal from "../../Posts/CreatePostModal";
import * as profileActions from "../../../store/profile";
import Post from "../../Posts/Post";

function User() {
	const dispatch = useDispatch();
	const [user, setUser] = useState({});
	const { userId } = useParams();
	const curr_user = useSelector((state) => state.session.user);
	const curr_profile = useSelector((state) => state.profile.profile);
	useEffect(() => {
		setUser(curr_profile);
	}, []);
	useEffect(() => {
		(async () => {
			const user = await dispatch(profileActions.loadProfile(userId));
			setUser(user);
		})();
	}, [userId, dispatch]);
	const message =
		curr_user.id === +userId
			? "What's on your mind?"
			: `Write something to ${user?.first_name}...`;
	if (!user) {
		return null;
	}

	return (
		<div className="user-profile--container">
			<div className="profile-details--container">
				<div className="profile-details--wrapper">
					<h2>Intro</h2>
					<div>{user.full_name}</div>
					<button>Add Bio</button>
					<div>From: </div>
					<div>Joined: </div>
					<button>Edit details</button>
					<button>Add Hobbies</button>
				</div>
			</div>
			<div className="profile-posts--container">
				<div className="create-post--container">
					<div className="create-post--wrapper">
						<div className="image-placeholder"></div>
						<CreatePostModal user={user} message={message} />
					</div>
				</div>
				{user.posts?.length > 0 &&
					user.posts
						?.sort(
							(a, b) =>
								new Date(b.posted_at) - new Date(a.posted_at)
						)
						.map((post) => <Post post={post} key={post.id} />)}
			</div>
		</div>
	);
}
export default User;
