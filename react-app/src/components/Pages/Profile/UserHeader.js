import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as requestActions from "../../../store/requests";

const UserHeader = ({ user }) => {
	const dispatch = useDispatch();
	const curr_user = useSelector((state) => state.session.user);
	const requestsObj = useSelector((state) => state.requests.requests);
	const sent_requests = Object.values(requestsObj.sent);
	const rec_requests = Object.values(requestsObj.received);
	// const received = useSelector((state) => state.requests.requests.received);
	const [notFriend, setNotFriend] = useState(false);
	const [friend, setFriend] = useState(false);
	const [pendingFriend, setPendingFriend] = useState(false);
	useEffect(() => {
		dispatch(requestActions.getRequests());
	}, []);
	console.log(user);
	console.log(sent_requests);
	const sendRequest = async () => {
		await dispatch(requestActions.sendRequest(user.id));
		dispatch(requestActions.getRequests());
	};
	let action;
	useEffect(() => {
		const reqCheck = () => {
			console.log(sent_requests);
			sent_requests.forEach((req) => {
				if (req.receiver_id === user.id) {
					action = <button>pending</button>;
					return;
				}
			});
			if (!action) {
				action = <button onClick={sendRequest}>add friend</button>;
			}
		};
		reqCheck();
	}, []);

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
