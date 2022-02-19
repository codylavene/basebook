import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CreatePostModal from "../../Posts/CreatePostModal";
import Post from "../../Posts/Post";

function User() {
	const [user, setUser] = useState({});
	const { userId } = useParams();
	const curr_user = useSelector((state) => state.session.user);
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
	const message =
		curr_user.id === +userId
			? "What's on your mind?"
			: `Write something to ${user.first_name}...`;
	if (!user) {
		return null;
	}

	return (
		<div className="user-profile--container">
			<div className="profile-details--container">
				<h2>Intro</h2>
				<div>{user.full_name}</div>
			</div>
			<div className="profile-posts--container">
				<div className="create-post--container">
					<div className="create-post--wrapper">
						<div className="image-placeholder"></div>
						<CreatePostModal
							user={curr_user}
							message={`What's on your mind, ${curr_user.first_name}?`}
						/>
					</div>
				</div>
				{user?.posts?.length > 0 &&
					user?.posts
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
