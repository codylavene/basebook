import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as commentActions from "../../store/comments";
import * as postActions from "../../store/posts";
const AddComment = ({ post }) => {
	const dispatch = useDispatch();
	const [comment, setComment] = useState("");
	const [loading, setLoading] = useState(false);
	const onSubmit = async (e) => {
		e.preventDefault();
		if (comment.length > 1 && comment.length < 280) {
			setLoading(true);
			await dispatch(commentActions.addComment(post.id, comment));
			dispatch(commentActions.getComments());
			setTimeout(() => {
				setComment("");
				setLoading(false);
			}, 200);
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
				<button className="add-comment--btn">
					{loading ? (
						<i className="fa-solid fa-spinner fa-spin-pulse"></i>
					) : (
						"Submit"
					)}
				</button>
			</form>
		</div>
	);
};

export default AddComment;
