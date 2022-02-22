import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Posts from "../../Posts";
import * as profileActions from "../../../store/profile";
import * as postActions from "../../../store/posts";
const Feed = (props) => {
	const dispatch = useDispatch();
	// const users = useSelector((state) => state.profile.allProfiles);

	useEffect(() => {
		dispatch(postActions.getPosts());
		dispatch(profileActions.loadAllProfiles());
	}, []);
	return (
		<div>
			<Posts />
		</div>
	);
};

export default Feed;
