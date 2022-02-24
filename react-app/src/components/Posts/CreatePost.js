import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as postActions from "../../store/posts";
import { authenticate } from "../../store/session";
const CreatePost = ({ setShowModal }) => {
	const dispatch = useDispatch();
	const [post, setPost] = useState("");
	const [disabled, setDisabled] = useState(true);
	const curr_user = useSelector((state) => state.session.user);
	const onSubmit = async (e) => {
		e.preventDefault();
		if (post.length > 0 && post.length < 540) {
			await dispatch(postActions.addPost(post));
			dispatch(postActions.getPosts());
			setPost("");
			setShowModal(false);
		}
	};
	useEffect(() => {
		if (post.length < 540 && post.length > 0) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [post, post.post_body]);
	return (
		<div className="create-post--card">
			<div className="modal-head">
				<div className="modal-text--container">
					<div>Create post</div>
				</div>
				<div
					className="close-create-post"
					onClick={() => setShowModal(false)}
				>
					<i className="fa-solid fa-xmark"></i>
				</div>
			</div>
			<div className="user-info">
				<div className="image-placeholder"></div>
				<div className="user-name">
					{curr_user.first_name} {curr_user.last_name}
				</div>
			</div>
			<form onSubmit={onSubmit} className="create-post--form">
				<textarea
					placeholder={`What's on your mind, ${curr_user.first_name}?`}
					value={post}
					onChange={(e) => setPost(e.target.value)}
					autoFocus={true}
				></textarea>
				<button disabled={disabled} id="create-edit-post">
					Post
				</button>
			</form>
		</div>
	);
};

export default CreatePost;
