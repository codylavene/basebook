import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as requestActions from "../../../store/requests";
import * as sessionActions from "../../../store/session";

const Requests = ({ user, rec_requests }) => {
	console.log(rec_requests);
	const curr_user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();
	console.log(user);
	const onAccept = async (req_id, sender_id) => {
		await dispatch(requestActions.approveRequest(req_id, sender_id));
		// dispatch(requestActions.getRequests());
		dispatch(sessionActions.authenticate());
	};
	const onDecline = async (req_id) => {
		await dispatch(requestActions.declineRequest(req_id));
		dispatch(sessionActions.authenticate());
	};
	return (
		<>
			<div>
				{curr_user.rec_requests?.length > 0 &&
					curr_user.rec_requests.map((req) => (
						<>
							<h2>
								{req.sender.first_name} {req.sender.last_name}
							</h2>
							<button
								onClick={() => onAccept(req.id, req.sender.id)}
							>
								Accept
							</button>
							<button onClick={() => onDecline(req.id)}>
								Decline
							</button>
						</>
					))}
			</div>
		</>
	);
};

export default Requests;
