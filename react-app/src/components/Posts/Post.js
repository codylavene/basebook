import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddComment from "../Comments/AddComment";
import Comment from "../Comments/Comment";
import DeletePostModal from "./DeletePostModal";
import EditPostModal from "./EditPostModal";
import * as postActions from "../../store/posts";
import * as commentActions from "../../store/comments";
import * as likeActions from "../../store/likes";

const Post = ({ post, comments, likes }) => {
	const dispatch = useDispatch();
	const [showComments, setShowComments] = useState(false);
	const [showButtons, setShowButtons] = useState(false);
	const curr_user = useSelector((state) => state.session.user);
	// const likes = useSelector((state) => state.session.likes.likes);
	console.log(likes);
	const [liked, setLiked] = useState(post.liked_status.liked);
	const [likeId, setLikeId] = useState(post.liked_status.like_id);
	const [beenLiked, setBeenLiked] = useState(likeId ? true : false);
	// console.log(comments);
	// useEffect(() => {
	// 	dispatch(likeActions.getLikes());
	// }, []);
	console.log(likes?.count);
	console.log(post.id);
	const toggleLike = async () => {
		if (beenLiked) {
			await dispatch(likeActions.editLike(post.id, likeId));
			dispatch(likeActions.getLikes());
			setLiked(!liked);
		} else {
			const id = await dispatch(likeActions.addLike(post.id));
			dispatch(likeActions.getLikes());
			setLiked(true);
			setBeenLiked(true);
			setLikeId(id);
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
					<span>
						{/* {likes[post.id] &&
							Object.values(likes[post.id])?.length}{" "}
						{likes[likes.id] &&
						Object.values(likes[post.id])?.length === 1
							? "like"
							: "likes"} */}
						{likes?.count ? likes?.count : "0"}{" "}
						{likes?.count === 1 ? "like" : "likes"}
					</span>
				</div>
				<div
					className="comments-count"
					onClick={() => setShowComments(!showComments)}
				>
					{Object.values(comments)?.length}{" "}
					{Object.values(comments)?.length === 1
						? "comment"
						: "comments"}
				</div>
			</div>
			{showComments &&
				Object.values(comments).map((comment) => {
					return (
						<Comment
							key={comment.id}
							comment={comment}
							post={post}
						/>
					);
				})}
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
