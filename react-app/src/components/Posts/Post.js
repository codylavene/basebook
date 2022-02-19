import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddComment from "../Comments/AddComment";
import Comment from "../Comments/Comment";
import DeletePostModal from "./DeletePostModal";
import EditPostModal from "./EditPostModal";
import * as postActions from "../../store/posts";

const Post = ({ post }) => {
	const dispatch = useDispatch();
	const [showComments, setShowComments] = useState(false);
	const [showButtons, setShowButtons] = useState(false);
	const curr_user = useSelector((state) => state.session.user);
	const userLikes = useSelector((state) => state.session.user.likes);
	const [liked, setLiked] = useState(post.liked_status.liked);
	const [beenLiked, setBeenLiked] = useState(false);
	const [likeId, setLikeId] = useState(post.liked_status.like_id);
	console.log(liked);
	console.log(likeId);
	useEffect(() => {
		userLikes?.forEach((like) => {
			if (like.post_id === post.id) {
				setBeenLiked(true);
			}
		});
	}, []);
	const toggleLike = async () => {
		if (beenLiked) {
			console.log(likeId);
			await dispatch(postActions.deleteLike(post.id, likeId));
			setLiked(!liked);
			dispatch(postActions.getPosts());
		} else {
			const id = await dispatch(postActions.addLike(post.id));
			setLiked(true);
			setBeenLiked(true);
			setLikeId(id);
			dispatch(postActions.getPosts());
		}
	};
	return (
		<div className="single-post-container">
			{curr_user.id === post.user_id && (
				<i
					className="fa-solid fa-ellipsis"
					onClick={() => setShowButtons(!showButtons)}
				></i>
			)}
			{showButtons && (
				<div className="edit-delete-btn--container">
					<EditPostModal
						post={post}
						setShowButtons={setShowButtons}
					/>
					<DeletePostModal
						post={post}
						setShowButtons={setShowButtons}
					/>
				</div>
			)}
			<Link to={`/users/${post.user_id}`}>
				<div className="user-info--container">
					<div className="image-placeholder"></div>
					<h4>{post.name}</h4>
				</div>
			</Link>
			<div className="post-body">{post.post_body}</div>
			<div className="like-comment-count">
				<div className="likes-count">
					{post?.likes?.length}{" "}
					{post?.likes?.length === 1 ? "like" : "likes"}
				</div>
				<div
					className="comments-count"
					onClick={() => setShowComments(!showComments)}
				>
					{post?.comments?.length} comments
				</div>
			</div>
			{showComments &&
				post.comments.map((comment) => (
					<Comment key={comment.id} comment={comment} post={post} />
				))}
			<div className="like-comment-action--container">
				<div
					className="like-action action"
					onClick={toggleLike}
					style={{
						color: liked
							? "var(--main-blue)"
							: "var(--secondary-text)",
					}}
				>
					<i
						className={`fa-${
							liked ? "solid" : "regular"
						} fa-thumbs-up`}
					></i>{" "}
					{"Like"}
				</div>
				<div className="comment-action action">
					<i className="fa-regular fa-message"></i> Comment
				</div>
			</div>
			<AddComment post={post} />
		</div>
	);
};

export default Post;
