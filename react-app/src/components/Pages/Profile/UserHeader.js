import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as requestActions from "../../../store/requests";

const UserHeader = ({
	user,
	sent_reqs,
	rec_reqs,
	isFriend,
	isPendingFriend,
	setIsPendingFriend,
}) => {
	console.log("<><><><><><><>========++++++++", isPendingFriend);
	const dispatch = useDispatch();
	const curr_user = useSelector((state) => state.session.user);
	useEffect(() => {
		dispatch(requestActions.getRequests());
	}, []);
	console.log(curr_user.id);
	console.log(user.id);
	const sendRequest = async () => {
		await dispatch(requestActions.sendRequest(user.id));
		dispatch(requestActions.getRequests());
		setIsPendingFriend(true);
	};

	return (
		<div className="user-header--container">
			<div className="user-header--wrapper">
				<div className="user-header--cover-img"></div>
				<div className="user-img-name--container">
					<div className="user-img--wrapper">
						<div className="user-header--profile-img">
							{user.id === curr_user.id && (
								<i className="fa-solid fa-camera"></i>
							)}
						</div>
					</div>
					<h2 className="user-header--user-name">{user.full_name}</h2>
					<div className="friend-status--btn">
						{curr_user.id !== user.id &&
							(isPendingFriend ? (
								<button>Pending</button>
							) : isFriend ? (
								<button>Friends</button>
							) : (
								<button onClick={sendRequest}>
									Add Friend
								</button>
							))}
					</div>
				</div>
			</div>

			<div className="user-header--nav">
				<div>
					<Link to={`/users/${user.id}`}>Posts</Link>
				</div>
				<div>
					<Link to={`/users/${user.id}/about`}>About</Link>
				</div>
				{curr_user.id === user.id && (
					<div>
						<Link to={`/users/${user.id}/friends`}>Friends</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default UserHeader;
