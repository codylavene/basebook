import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as postActions from "../../store/posts";
const CreatePost = (props) => {
	const dispatch = useDispatch();
	const [post, setPost] = useState("");
	const onSubmit = (e) => {
		e.preventDefault();
		if (post.length > 1 && post.length < 540) {
			dispatch(postActions.addPost(post));
			setPost("");
		}
	};
	return (
		<div>
			<form onSubmit={onSubmit}>
				<textarea
					placeholder="What's up?"
					value={post}
					onChange={(e) => setPost(e.target.value)}
				></textarea>
				<button>Submit</button>
			</form>
		</div>
	);
};

export default CreatePost;
