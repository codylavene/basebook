import React from "react";
import { useSelector } from "react-redux";
import DeleteCommentModal from "./DeleteCommentModal";
import EditCommentModal from "./EditCommentModal";

const Comment = ({ comment, post }) => {
	const curr_user = useSelector((state) => state.session.user);
	return (
		<div
			style={{
				border: "1px solid black",
				width: "80%",
				margin: 10,
				padding: 10,
			}}
		>
			<h4>{comment.name}</h4>
			<div>{comment.comment_body}</div>
			{curr_user.id === comment.user_id && (
				<>
					<EditCommentModal comment={comment} post={post} />
					<DeleteCommentModal comment={comment} post={post} />
				</>
			)}
		</div>
	);
};

export default Comment;
