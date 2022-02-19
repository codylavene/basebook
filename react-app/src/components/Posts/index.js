import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as postActions from "../../store/posts";

import CreatePostModal from "./CreatePostModal";
import Post from "./Post";
import "./Posts.css";
const Posts = (props) => {
	const dispatch = useDispatch();
	const postsObj = useSelector((state) => state.posts.posts);
	const curr_user = useSelector((state) => state.session.user);
	const posts = Object.values(postsObj);
	useEffect(() => {
		dispatch(postActions.getPosts());
	}, []);
	return (
		<div className="main-posts-container">
			<div className="create-post--container">
				<div className="create-post--wrapper">
					<div className="image-placeholder"></div>
					<CreatePostModal
						user={curr_user}
						message={`What's on your mind, ${curr_user.first_name}?`}
					/>
				</div>
			</div>
			<div className="main-posts--wrapper">
				{posts.length > 0 &&
					posts
						.sort(
							(a, b) =>
								new Date(b.posted_at) - new Date(a.posted_at)
						)
						.map((post) => <Post post={post} key={post.id} />)}
			</div>
		</div>
	);
};

export default Posts;
