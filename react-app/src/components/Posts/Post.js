import React from "react";
import { useSelector } from "react-redux";
import EditPostModal from "./EditPostModal";

const Post = ({ post }) => {
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
			{curr_user.id === post.user_id && <EditPostModal post={post} />}{" "}
			<h3>{post.name}</h3>
			<div>{post.post_body}</div>
			<span>{post.comments.length} comments</span>
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
