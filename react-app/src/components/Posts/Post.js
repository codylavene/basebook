import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddComment from "../Comments/AddComment";
import Comment from "../Comments/Comment";
import DeletePostModal from "./DeletePostModal";
import EditPostModal from "./EditPostModal";

const Post = ({ post }) => {
	const [showComments, setShowComments] = useState(false);
	const curr_user = useSelector((state) => state.session.user);
	return (
		<div className="single-post-container">
			{curr_user.id === post.user_id && (
				<>
					<EditPostModal post={post} />
					<DeletePostModal post={post} />
				</>
			)}{" "}
			<Link to={`/users/${post.user_id}`}>
				<div className="user-info--container">
					<div className="image-placeholder"></div>
					<h4>{post.name}</h4>
				</div>
			</Link>
			<div className="post-body">{post.post_body}</div>
			<div
				className="comments-count"
				onClick={() => setShowComments(!showComments)}
			>
				{post?.comments?.length} comments
			</div>
			{showComments &&
				post.comments.map((comment) => (
					<Comment key={comment.id} comment={comment} post={post} />
				))}
			<AddComment post={post} />
		</div>
	);
};

export default Post;
