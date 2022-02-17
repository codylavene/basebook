import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DeleteCommentModal from "./DeleteCommentModal";
import EditCommentModal from "./EditCommentModal";

const Comment = ({ comment, post }) => {
	const curr_user = useSelector((state) => state.session.user);
	const [showButtons, setShowButtons] = useState(false);
	return (
		<div className="user-comment--wrapper">
			<div className="image-placeholder"></div>
			<div className="single-comment--container">
				<Link to={`/users/${comment?.user_id}`}>
					<div className="single-comment--name">{comment.name}</div>
				</Link>
				{curr_user.id === comment.user_id && (
					<i
						className="fa-solid fa-ellipsis"
						onClick={() => setShowButtons(!showButtons)}
					></i>
				)}
				{showButtons && (
					<div className="edit-delete-btn--container">
						<EditCommentModal comment={comment} post={post} />
						<DeleteCommentModal comment={comment} post={post} />
					</div>
				)}
				<div className="single-comment--body">
					{comment.comment_body}
				</div>
			</div>
		</div>
	);
};

export default Comment;
