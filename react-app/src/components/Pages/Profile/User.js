import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CreatePostModal from "../../Posts/CreatePostModal";
import * as profileActions from "../../../store/profile";
import * as commentActions from "../../../store/comments";
import * as likeActions from "../../../store/likes";
import Post from "../../Posts/Post";

function User({ user }) {
	const dispatch = useDispatch();
	// const [user, setUser] = useState(user);
	const { userId } = useParams();
	const curr_user = useSelector((state) => state.session.user);
	const posts = useSelector((state) => state.session.posts);
	console.log(posts);
	const comments = useSelector((state) => state.comments.comments);
	const likes = useSelector((state) => state.likes.likes);
	useEffect(() => {
		dispatch(profileActions.loadProfile(userId));
		// dispatch(commentActions.getComments());
	}, [dispatch, userId]);
	// useEffect(() => {
	// 	dispatch(commentActions.getComments());
	// });
	useEffect(() => {
		(async () => {
			// dispatch(commentActions.getComments());
			dispatch(likeActions.getLikes());
		})();
	}, []);
	// const message =
	// 	curr_user.id === +userId
	// 		? "What's on your mind?"
	// 		: `Write something to ${user?.first_name}...`;
	if (!user) {
		console.log("NOPE");
		return null;
	}
	console.log(user.posts);
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
				{user.posts?.length > 0 &&
					user.posts
						// ?.sort(
						// 	(a, b) =>
						// 		new Date(b.posted_at) - new Date(a.posted_at)
						// )
						.map((id) => (
							<Post
								post={posts[id]}
								key={id}
								// comments={post.comments}
								likes={posts[id].likes}
							/>
						))}
			</div>
		</div>
	);
}
export default User;
