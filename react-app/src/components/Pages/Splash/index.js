import React from "react";
import LoginForm from "../../auth/LoginForm";
import basebook from "../../../assets/images/basebook.png";
import "./Splash.css";
const SplashPage = (props) => {
	return (
		<div className="splash-container">
			<div className="splash-left">
				<div className="basebook-wrapper">
					<img src={basebook} alt="text-logo-basebook" required />
				</div>
				<h2>
					Connect with friends and the world around you on Basebook.
				</h2>
			</div>
			<div className="splash-right">
				<LoginForm />
			</div>
		</div>
		// FOOTER
	);
};

export default SplashPage;
