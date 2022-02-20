import React from "react";
import LoginForm from "../../auth/LoginForm";
// import { ReactComponent as basebook } from "../../../assets/images/basebook.svg";
import basebook from "../../../assets/images/basebook.png";
import "./Splash.css";
import Footer from "./Footer";
const SplashPage = (props) => {
	return (
		<>
			<div className="splash-container">
				<div className="splash-left">
					<div className="basebook-wrapper">
						<img src={basebook} alt="text-logo-basebook" required />
						{/* <basebook /> */}
					</div>
					<h2>
						Connect with friends and the world around you on
						Basebook.
					</h2>
				</div>
				<div className="splash-right">
					<LoginForm />
				</div>
			</div>
			<Footer />
		</>
	);
};

export default SplashPage;
