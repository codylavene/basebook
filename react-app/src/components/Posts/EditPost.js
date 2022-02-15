import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as postActions from "../../store/posts";
const EditPost = ({ setShowModal, post }) => {
	const dispatch = useDispatch();
	const [newPost, setNewPost] = useState(post.post_body);
	const onSubmit = async (e) => {
		e.preventDefault();
		if (newPost.length > 1 && newPost.length < 540) {
			await dispatch(postActions.editPost(newPost, post.id));
			dispatch(postActions.getPosts());
			setNewPost("");
			setShowModal(false);
		}
	};
	return (
		<div>
			<form onSubmit={onSubmit}>
				<textarea
					placeholder="What's up?"
					value={newPost}
					onChange={(e) => setNewPost(e.target.value)}
				></textarea>
				<button>Submit</button>
			</form>
		</div>
	);
};

export default EditPost;
