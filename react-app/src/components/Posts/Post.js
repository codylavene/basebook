import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Comment from "../Comments/Comment";
import DeletePostModal from "./DeletePostModal";
import EditPostModal from "./EditPostModal";

const Post = ({ post }) => {
	const [showComments, setShowComments] = useState(false);
	const curr_user = useSelector((state) => state.session.user);
	return (
		<div
			style={{
				margin: 10,
				border: "1px solid black",
				width: 500,
				padding: 20,
			}}
		>
			{curr_user.id === post.user_id && (
				<>
					<EditPostModal post={post} />
					<DeletePostModal post={post} />
				</>
			)}{" "}
			<Link to={`/users/${post.user_id}`}>
				<h3>{post.name}</h3>
			</Link>
			<div>{post.post_body}</div>
			<span onClick={() => setShowComments(true)}>
				{post.comments.length} comments
			</span>
			{showComments &&
				post.comments.map((comment) => <Comment comment={comment} />)}
			{/* <ul>
				{post.comments.length > 0 &&
					post.comments.map((comment) => (
						<li key={comment.id}>
							<h4>{comment.name} commented: </h4>
							{comment.comment_body}
						</li>
					))}
			</ul> */}
		</div>
	);
};

export default Post;
