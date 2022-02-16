import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as postActions from "../../store/posts";
const AddComment = ({ post }) => {
	const dispatch = useDispatch();
	const [comment, setComment] = useState("");
	const onSubmit = async (e) => {
		e.preventDefault();
		if (comment.length > 1 && comment.length < 280) {
			await dispatch(postActions.addComment(post.id, comment));
			dispatch(postActions.getPosts());
			setComment("");
		}
	};
	return (
		<div>
			<form onSubmit={onSubmit}>
				<textarea
					placeholder="Comment..."
					value={comment}
					onChange={(e) => setComment(e.target.value)}
				></textarea>
				<button>Submit</button>
			</form>
		</div>
	);
};

export default AddComment;
