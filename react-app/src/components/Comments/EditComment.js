import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as postActions from "../../store/posts";
const EditComment = ({ setShowModal, post, comment }) => {
	const dispatch = useDispatch();
	const [newComment, setNewComment] = useState(comment.comment_body);
	console.log(post);
	console.log(comment);
	const onSubmit = async (e) => {
		e.preventDefault();
		if (newComment.length > 1 && newComment.length < 280) {
			await dispatch(
				postActions.editComment(newComment, post.id, comment.id)
			);
			dispatch(postActions.getPosts());
			setNewComment("");
			setShowModal(false);
		}
	};
	return (
		<div>
			<form onSubmit={onSubmit}>
				<textarea
					value={newComment}
					onChange={(e) => setNewComment(e.target.value)}
				></textarea>
				<button>Submit</button>
			</form>
		</div>
	);
};

export default EditComment;
