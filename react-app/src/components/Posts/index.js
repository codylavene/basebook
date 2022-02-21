import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as postActions from "../../store/posts";
import * as commentActions from "../../store/comments";
import * as likeActions from "../../store/likes";

import CreatePostModal from "./CreatePostModal";
import Post from "./Post";
import "./Posts.css";
const Posts = (props) => {
	const dispatch = useDispatch();
	const postsObj = useSelector((state) => state.posts.posts);
	const commentsObj = useSelector((state) => state.comments.comments);
	const likesObj = useSelector((state) => state.likes.likes);
	const curr_user = useSelector((state) => state.session.user);
	console.log(likesObj);
	// console.log(Array.isArray(Object.entries(commentsObj)));
	// const comments = commentsObj[post.id];
	document.title = "basebook";
	const posts = Object.values(postsObj);
	useEffect(() => {
		(async () => {
			await dispatch(postActions.getPosts());
			dispatch(commentActions.getComments());
			dispatch(likeActions.getLikes());
		})();
	}, []);

	// console.log(JSON.stringify(4, null, comments));

	// useEffect(() => {
	// 	dispatch(commentActions.getComments(post.id));
	// }, []);

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
						.map((post) => (
							<Post
								post={post}
								key={post.id}
								comments={
									commentsObj[post.id]
										? commentsObj[post.id]
										: {}
								}
								likes={
									likesObj[post.id] ? likesObj[post.id] : {}
								}
							/>
						))}
			</div>
		</div>
	);
};

export default Posts;
