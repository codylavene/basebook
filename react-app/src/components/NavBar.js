import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
// import { ReactComponent as b } from "../assets/images/b.svg";
import b from "../assets/images/b.png";
import "./NavBar.css";
import Requests from "./Pages/Profile/Requests";
import OutsideClickHandler from "react-outside-click-handler";

const NavBar = () => {
	const [userDrop, setShowUserDrop] = useState(false);
	const [notifyDrop, setShowNotifyDrop] = useState(false);

	const curr_user = useSelector((state) => state.session.user);
	return (
		<div className="nav--container">
			<nav>
				<div className="nav-left--wrapper">
					<NavLink to="/" exact={true} activeClassName="active">
						<div className="logo-b--container">
							<img src={b} alt="logo" className="logo-b" />
						</div>
					</NavLink>
					<div
						className="search--container"
						style={{ display: "none" }}
					>
						<label>
							<i className="fa-solid fa-magnifying-glass"></i>
							<input
								type="search"
								placeholder="Search Basebook"
							></input>
						</label>
					</div>
				</div>
				<div className="nav-mid--wrapper">
					<NavLink to={`/feed`} exact={true} activeClassName="active">
						{" "}
						<div className="nav-btn--container">
							<div className="nav-btn--wrapper">
								<i className="fa-solid fa-house"></i>
							</div>
						</div>
					</NavLink>
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
				</div>
				<div className="nav-end--wrapper">
					<NavLink
						to={`/users/${curr_user.id}`}
						exact={true}
						activeClassName="active--right"
					>
						<div className="user-profile-link--container">
							<div className="image-placeholder nav-user-image"></div>
							<div className="nav--user-name">
								{curr_user.first_name}
							</div>
						</div>
					</NavLink>
					<div className="user-menu--grid inactive">
						<i className="fa-brands fa-facebook-messenger"></i>
					</div>
					<div
						className="user-menu--grid"
						onClick={() => setShowNotifyDrop(!notifyDrop)}
					>
						<i className="fa-solid fa-bell"></i>
					</div>
					<OutsideClickHandler
						onOutsideClick={() => {
							setShowNotifyDrop(false);
						}}
					>
						{notifyDrop && (
							<div className="nav-dropdown">
								<Requests />
							</div>
						)}
					</OutsideClickHandler>
					<div
						className="user-menu--drop"
						onClick={() => setShowUserDrop(!userDrop)}
					>
						<i className="fa-solid fa-caret-down"></i>
					</div>
					<OutsideClickHandler
						onOutsideClick={() => {
							setShowUserDrop(false);
						}}
					>
						{userDrop && (
							<div className="nav-dropdown">
								<Link to={`/users/${curr_user.id}`}>
									<div className="nav-link-to-curr_user">
										<div className="image-placeholder"></div>
										<div className="user-name">
											{curr_user.full_name}
											<span>See your profile</span>
										</div>
									</div>
								</Link>
								<div className="drop--actions">
									<LogoutButton />
								</div>
							</div>
						)}
					</OutsideClickHandler>
				</div>
			</nav>
		</div>
	);
};

export default NavBar;
