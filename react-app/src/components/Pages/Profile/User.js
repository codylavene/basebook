import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CreatePostModal from "../../Posts/CreatePostModal";
import * as profileActions from "../../../store/profile";
import * as commentActions from "../../../store/comments";
import * as likeActions from "../../../store/likes";
import * as postActions from "../../../store/posts";
import Post from "../../Posts/Post";

function User({ user }) {
	console.log(user);
	const dispatch = useDispatch();
	// const [user, setUser] = useState(user);
	// const { userId } = useParams();
	const curr_user = useSelector((state) => state.session.user);
	// const user = useSelector((state) => state.profile.profile);
	const allPosts = useSelector((state) => state.posts.posts);
	const comments = useSelector((state) => state.comments);
	// console.log(comments);
	const likes = useSelector((state) => state.likes.likes);
	const likes_by_post = useSelector((state) => state.likes.likes_by_post_id);
	const comments_post_ids = useSelector(
		(state) => state.comments.comments_post_ids
	);
	// useEffect(() => {
	// 	dispatch(profileActions.loadProfile(userId));
	// 	// dispatch(commentActions.getComments());
	// }, []);
	useEffect(() => {
		dispatch(postActions.getPosts());
	}, []);
	console.log("USER JS -- USER POSTS", user.posts);
	// console.table(allPosts);
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
	console.log("USER JS -- USER POSTS", user.posts);
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
					user.posts.map((id) => (
						<Post
							post={allPosts[id]}
							key={id}
							// comments={comments_post_ids[id]}
							// likes={allPosts[id]?.likes}
							likes={likes_by_post[id]}
						/>
					))}
			</div>
		</div>
	);
}
export default User;
