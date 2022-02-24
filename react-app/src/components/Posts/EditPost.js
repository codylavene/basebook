import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as postActions from "../../store/posts";
const EditPost = ({ setShowModal, post, setShowButtons }) => {
	const dispatch = useDispatch();
	const [newPost, setNewPost] = useState(post.post_body);
	const [disabled, setDisabled] = useState(true);
	const curr_user = useSelector((state) => state.session.user);
	const onSubmit = async (e) => {
		e.preventDefault();
		if (newPost.length > 1 && newPost.length < 540) {
			await dispatch(postActions.editPost(newPost, post.id));
			dispatch(postActions.getPosts());
			setNewPost("");
			setShowButtons(false);
			setShowModal(false);
		}
	};
	useEffect(() => {
		return () => {
			setShowButtons(false);
			setShowModal(false);
		};
	}, [setShowButtons, setShowModal]);
	useEffect(() => {
		if (newPost !== post.post_body && newPost.length > 0) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [newPost, post.post_body]);
	return (
		<div className="create-post--card">
			<div className="modal-head">
				<div className="modal-text--container">
					<div>Edit post</div>
				</div>
				<div
					className="close-create-post"
					onClick={() => {
						setShowButtons(false);
						setShowModal(false);
					}}
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
					value={newPost}
					onChange={(e) => setNewPost(e.target.value)}
					autoFocus={true}
					onFocus={(e) =>
						(e.target.selectionStart = e.target.selectionEnd =
							e.target.value.length)
					}
				></textarea>
				<button disabled={disabled} id="create-edit-post">
					Save
				</button>
			</form>
		</div>
	);
};

export default EditPost;
