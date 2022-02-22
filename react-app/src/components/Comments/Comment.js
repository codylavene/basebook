import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DeleteCommentModal from "./DeleteCommentModal";
import EditComment from "./EditComment";

const Comment = ({ comment, post }) => {
	const curr_user = useSelector((state) => state.session.user);
	const [showButtons, setShowButtons] = useState(false);
	const [showEdit, setShowEdit] = useState(false);
	const [showOptions, setShowOptions] = useState(false);
	// const toggleOptions = () => {
	// 	setShowOptions(!showOptions);
	// };
	return (
		<>
			{showEdit ? (
				<EditComment
					comment={comment}
					post={post}
					setShowEdit={setShowEdit}
				/>
			) : (
				<div
					className="user-comment--wrapper"
					onMouseEnter={() => setShowOptions(true)}
					onMouseLeave={() => setShowOptions(false)}
				>
					<div className="image-placeholder"></div>
					<div className="single-comment--container">
						<Link to={`/users/${comment.user_id}`}>
							<div className="single-comment--name">
								{comment.name}
							</div>
						</Link>
						{showButtons && (
							<div className="edit-delete-btn--container">
								{/* <EditComment comment={comment} post={post} /> */}
								<button
									onClick={() => {
										setShowEdit(true);
										setShowButtons(false);
									}}
								>
									Edit
								</button>
								<DeleteCommentModal
									comment={comment}
									post={post}
									setShowButtons={setShowButtons}
								/>
							</div>
						)}
						<div className="single-comment--body">
							{comment.comment_body}
						</div>
					</div>
					{curr_user.id === comment.user_id && showOptions && (
						<i
							className="fa-solid fa-ellipsis"
							onClick={() => setShowButtons(!showButtons)}
						></i>
					)}
				</div>
			)}
		</>
	);
};

export default Comment;
