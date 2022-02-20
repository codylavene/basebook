import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as commentActions from "../../store/comments";
import * as postActions from "../../store/posts";
const AddComment = ({ post }) => {
	const dispatch = useDispatch();
	const [comment, setComment] = useState("");
	const onSubmit = async (e) => {
		e.preventDefault();
		if (comment.length > 1 && comment.length < 280) {
			await dispatch(commentActions.addComment(post.id, comment));
			dispatch(postActions.getPosts());
			setComment("");
		}
	};
	return (
		<div className="add-comment--container">
			<div className="image-placeholder"></div>
			<form onSubmit={onSubmit} className="add-comment--form">
				<input
					type="text"
					className="add-comment--input"
					placeholder="Write a comment..."
					value={comment}
					onChange={(e) => setComment(e.target.value)}
				></input>
				<button className="add-comment--btn">Submit</button>
			</form>
		</div>
	);
};

export default AddComment;
