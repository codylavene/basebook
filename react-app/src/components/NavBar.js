import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import "./NavBar.css";
const NavBar = () => {
	const curr_user = useSelector((state) => state.session.user);
	return (
		<nav>
			<ul>
				<li>
					<NavLink to="/" exact={true} activeClassName="active">
						<div className="logo-b--container">
							<img
								src="./assets/images/basebook-b.png"
								alt="logo"
								className="logo-b"
							/>
						</div>
					</NavLink>
				</li>
				<li>
					<NavLink
						to={`/users`}
						exact={true}
						activeClassName="active"
					>
						{" "}
						<div className="nav-btn--container">
							<div className="nav-btn--wrapper">
								<i className="fa-solid fa-users"></i>
							</div>
						</div>
					</NavLink>
				</li>
				<li>
					<div className="user-menu--drop">
						<i className="fa-solid fa-caret-down"></i>
					</div>
					<LogoutButton />
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;
