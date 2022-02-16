import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as postActions from "../../store/posts";
import CreatePost from "./CreatePost";
import Post from "./Post";
import "./Posts.css";
const Posts = (props) => {
	const dispatch = useDispatch();
	const postsObj = useSelector((state) => state.posts.posts);
	const posts = Object.values(postsObj);
	useEffect(() => {
		dispatch(postActions.getPosts());
	}, []);
	return (
		<div className="main-posts-container">
			<CreatePost />
			{posts.length &&
				posts.map((post) => <Post post={post} key={post.id} />)}
		</div>
	);
};

export default Posts;
