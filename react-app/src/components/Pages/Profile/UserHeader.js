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
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		dispatch(requestActions.getRequests()).then(() => {
			setTimeout(() => {
				setLoading(false);
			}, 300);
		});
	}, []);
	console.log(curr_user.id);
	console.log(user.id);
	const sendRequest = async () => {
		setLoading(true);
		await dispatch(requestActions.sendRequest(user.id));
		await dispatch(requestActions.getRequests());
		setIsPendingFriend(true);
		setLoading(false);
	};
	const declineRequest = async () => {
		console.log(sent_reqs);
		const req = Object.values(sent_reqs).find(
			(req) =>
				req.sender_id === curr_user.id && req.receiver_id === user.id
		);
		console.log(req);
		await dispatch(requestActions.declineRequest(req.id));
		dispatch(requestActions.getRequests());
		setIsPendingFriend(false);
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
						{loading ? (
							<i className="fa-solid fa-spinner fa-spin-pulse"></i>
						) : (
							curr_user.id !== user.id &&
							(isPendingFriend ? (
								<button onClick={declineRequest}>
									<i className="fa-solid fa-user-xmark"></i>{" "}
									Cancel Request
								</button>
							) : isFriend ? (
								<button>
									<i className="fa-solid fa-user-check"></i>{" "}
									Friends
								</button>
							) : (
								<button
									onClick={sendRequest}
									style={{
										backgroundColor: "var(--main-blue)",
										color: "var(--main-white)",
									}}
								>
									<i className="fa-solid fa-user-plus"></i>{" "}
									Add Friend
								</button>
							))
						)}
					</div>
				</div>
			</div>

			<div className="user-header--nav">
				<Link to={`/users/${user.id}`}>
					<div>Posts</div>
				</Link>
				<Link to={`/users/${user.id}/about`}>
					<div>About</div>
				</Link>
				{curr_user.id === user.id && (
					<Link to={`/users/${user.id}/friends`}>
						<div>Friends</div>
					</Link>
				)}
			</div>
		</div>
	);
};

export default UserHeader;
