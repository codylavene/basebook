import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as requestActions from "../../../store/requests";

const UserHeader = ({ user, sent_reqs, rec_reqs }) => {
	const dispatch = useDispatch();
	// const actionRef = useRef();
	const curr_user = useSelector((state) => state.session.user);
	const [friend, setFriend] = useState(false);
	const [pendingFriend, setPendingFriend] = useState(false);
	// useEffect(() => {
	// 	dispatch(requestActions.getRequests());
	// }, []);
	console.log(sent_reqs);
	console.log(rec_reqs);
	const sendRequest = async () => {
		await dispatch(requestActions.sendRequest(user.id));
		dispatch(requestActions.getRequests());
		setPendingFriend(true);
	};
	let action;
	// const reqCheck = () => {
	// 	sent_reqs.forEach((req) => {
	// 		if (req.receiver_id === user.id) {
	// 			setPendingFriend(true);
	// 			action = <button>Pending</button>;
	// 			return;
	// 		}
	// 	});
	// 	if (!pendingFriend) {
	// 		curr_user.friends.forEach((friend) => {
	// 			if (friend.id === user.id) {
	// 				console.log(friend);
	// 				setFriend(true);
	// 				action = <button>Friends</button>;
	// 				return;
	// 			}
	// 		});
	// 	}
	// 	if (!pendingFriend && !friend) {
	// 		action = <button>Add Friend</button>;
	// 	}
	// };

	// reqCheck();

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
						{/* {notFriend ? (
                            ) : friend ? (
                                <div>Friends</div>
                                ) : pendingFriend ? (
                                    <div>Pending</div>
                                    ) : (
                                        ""
                                    )} */}
						<div>{action}</div>
					</div>
				</div>
				{/* <div>
					<h1>REC</h1>
					<div>
						{Object.values(received)?.map((s) => {
                            <div>{s.id}</div>;
						})}
					</div>
				</div> */}
			</div>
			{/* <div>
				<h4>SENT</h4>
				{Object.values(requests.sent)?.map((s) => (
					<div>{s.receiver.full_name}</div>
				))}
			</div> */}
			<div className="user-header--nav">
				<div>Posts</div>
				<div>About</div>
			</div>
		</div>
	);
};

export default UserHeader;
