import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddComment from "../Comments/AddComment";
import Comment from "../Comments/Comment";
import DeletePostModal from "./DeletePostModal";
import EditPostModal from "./EditPostModal";
import * as postActions from "../../store/posts";
import * as commentActions from "../../store/comments";
import * as likeActions from "../../store/likes";

const Post = ({ post, /*comments,*/ likes }) => {
	const dispatch = useDispatch();
	const commentRef = useRef(null);
	const comments = useSelector((state) => state.comments.comments);
	const comment_ids = useSelector((state) => state.comments.all_ids);
	const comments_post_ids = useSelector(
		(state) => state.comments.comments_post_ids
	);
	// const likesObj = useSelector((state) => state.likes.likes);
	const [showComments, setShowComments] = useState(false);
	const [showButtons, setShowButtons] = useState(false);
	// const [loading, setLoading] = useState(false);
	const likes_by_post = useSelector((state) => state.likes.likes_by_post_id);
	const curr_user = useSelector((state) => state.session.user);
	const status = curr_user.likes.indexOf(post?.id) >= 0;
	const [liked, setLiked] = useState(status);
	const [likeCount, setLikeCount] = useState(likes?.length);
	const [likeId, setLikeId] = useState(post?.liked_status?.like_id);
	// const [beenLiked, setBeenLiked] = useState(likeId ? true : false);
	// console.log(comments);
	const toggleLike = async () => {
		// setLoading(true);
		if (liked) {
			await dispatch(likeActions.deleteLike(post.id, likeId));
			dispatch(likeActions.getLikes());
			setLiked(false);
			setLikeCount(likeCount - 1);
		} else {
			const id = await dispatch(likeActions.addLike(post.id));
			dispatch(likeActions.getLikes());
			setLiked(true);
			setLikeId(id);
			setLikeCount(likeCount + 1);
		}
	};
	const focusComment = (e) => {
		commentRef.current.focus();
	};

	// let commentCountMsg;
	// const createCountMessage = () => {
	// 	commentCountMsg = comments_post_ids[post.id]
	// 		? `${comments_post_ids[post.id].length}
	// 		${comments_post_ids[post.id].length === 1 ? "comment" : "comments"}`
	// 		: "0 comments";
	// };
	return (
		<div className="single-post-container">
			{curr_user.id === post?.user_id && (
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
			<Link to={`/users/${post?.user_id}`}>
				<div className="user-info--container">
					<div className="image-placeholder"></div>
					<h4>{post?.name}</h4>
				</div>
			</Link>
			<div className="post-body">{post?.post_body}</div>
			<div className="like-comment-count">
				<div className="likes-count">
					<span>
						{likeCount ? likeCount : "0"}{" "}
						{likeCount === 1 ? "like" : "likes"}
					</span>
				</div>
				<div
					className="comments-count"
					onClick={() => setShowComments(!showComments)}
				>
					{" "}
					{comments_post_ids[post?.id]
						? `${comments_post_ids[post?.id].length} ${
								comments_post_ids[post?.id].length === 1
									? "comment"
									: "comments"
						  }`
						: "0 comments"}
				</div>
			</div>
			{showComments &&
				comments_post_ids[post.id]?.map((id) => {
					return (
						<Comment key={id} comment={comments[id]} post={post} />
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
				<div className="comment-action action" onClick={focusComment}>
					<i className="fa-regular fa-message"></i> Comment
				</div>
			</div>
			<AddComment post={post} commentRef={commentRef} />
		</div>
	);
};

export default Post;
