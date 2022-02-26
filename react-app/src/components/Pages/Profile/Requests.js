import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as requestActions from "../../../store/requests";
import * as sessionActions from "../../../store/session";

const Requests = () => {
	const curr_user = useSelector((state) => state.session.user);

	const dispatch = useDispatch();

	const onAccept = async (req_id, sender_id) => {
		await dispatch(requestActions.approveRequest(req_id, sender_id));
		dispatch(sessionActions.authenticate());
	};
	const onDecline = async (req_id) => {
		await dispatch(requestActions.declineRequest(req_id));

		dispatch(sessionActions.authenticate());
	};
	return (
		<div className="friend-requests--container">
			<div className="friend-requests--wrapper">
				<div className="requests--head">Friend Requests</div>
				{curr_user.rec_requests?.length > 0 ? (
					curr_user.rec_requests.map((req) => (
						<div key={req.id} className="single-request">
							<div className="user-img--container">
								<div className="image-placeholder"></div>
								<span>
									<Link to={`/users/${req.sender.id}`}>
										{req.sender.first_name}{" "}
										{req.sender.last_name}
									</Link>
								</span>
							</div>
							<div className="accept-decline-btns">
								<button
									onClick={() =>
										onAccept(req.id, req.sender.id)
									}
									className="accept-btn"
								>
									<i className="fa-solid fa-user-check"></i>{" "}
									Accept
								</button>
								<button
									onClick={() => onDecline(req.id)}
									className="decline-btn"
								>
									<i className="fa-solid fa-user-xmark"></i>{" "}
									Decline
								</button>
							</div>
						</div>
					))
				) : (
					<div className="no-requests--message">All good here!</div>
				)}
			</div>
		</div>
	);
};

export default Requests;
