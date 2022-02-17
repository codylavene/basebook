import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as postActions from "../../store/posts";
const EditComment = ({ setShowEdit, post, comment }) => {
	const dispatch = useDispatch();
	const [newComment, setNewComment] = useState(comment.comment_body);
	const [loading, setLoading] = useState(false);
	const onSubmit = async (e) => {
		e.preventDefault();
		if (newComment.length > 1 && newComment.length < 280) {
			setLoading(true);
			await dispatch(
				postActions.editComment(newComment, post.id, comment.id)
			);
			await dispatch(postActions.getPosts());

			setNewComment("");
			setLoading(false);
			setShowEdit(false);
		}
	};
	const handleEsc = async () => {
		window.addEventListener("keydown", (e) => {
			if (e.key === "Escape") {
				setShowEdit(false);
			}
		});
	};
	useEffect(() => {
		handleEsc();
	}, []);
	return (
		<>
			<div className="add-comment--container">
				<div className="image-placeholder"></div>
				<form onSubmit={onSubmit} className="add-comment--form">
					<input
						type="text"
						className="add-comment--input"
						placeholder="Write a comment..."
						autoFocus={true}
						value={newComment}
						onChange={(e) => setNewComment(e.target.value)}
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
			<span className="edit-comment--esc">
				Press Esc to{" "}
				<span
					onClick={() => setShowEdit(false)}
					// onKeyPress={handleEsc}
					className="edit-comment--cancel"
				>
					cancel
				</span>
				.
			</span>
		</>
	);
};

export default EditComment;
