import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as postActions from "../../store/posts";
import CreatePost from "./CreatePost";
import Post from "./Post";
const Posts = (props) => {
	const dispatch = useDispatch();
	const postsObj = useSelector((state) => state.posts.posts);
	const posts = Object.values(postsObj);
	console.log(posts);
	useEffect(() => {
		dispatch(postActions.getPosts());
	}, []);
	return (
		<div>
			<CreatePost />
			{posts.length &&
				posts.map((post) => <Post post={post} key={post.id} />)}
		</div>
	);
};

export default Posts;
