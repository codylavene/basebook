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
				<h4>{post.name}</h4>
			</Link>
			<div>{post.post_body}</div>
			<span onClick={() => setShowComments(!showComments)}>
				{post?.comments?.length} comments
			</span>
			{showComments &&
				post.comments.map((comment) => (
					<Comment key={comment.id} comment={comment} post={post} />
				))}
			<AddComment post={post} />
		</div>
	);
};

export default Post;
