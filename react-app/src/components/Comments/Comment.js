import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DeleteCommentModal from "./DeleteCommentModal";
import EditCommentModal from "./EditCommentModal";

const Comment = ({ comment, post }) => {
	const curr_user = useSelector((state) => state.session.user);
	return (
		<div className="user-comment--wrapper">
			<div className="image-placeholder"></div>
			<div className="single-comment--container">
				<Link to={`/users/${comment?.user_id}`}>
					<div className="single-comment--name">{comment.name}</div>
				</Link>
				<div className="single-comment--body">
					{comment.comment_body}
				</div>
				{curr_user.id === comment.user_id && (
					<>
						<EditCommentModal comment={comment} post={post} />
						<DeleteCommentModal comment={comment} post={post} />
					</>
				)}
			</div>
		</div>
	);
};

export default Comment;
