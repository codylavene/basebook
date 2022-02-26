import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
// import { ReactComponent as b } from "../assets/images/b.svg";
import b from "../assets/images/b.png";
import "./NavBar.css";
import Requests from "./Pages/Profile/Requests";
import OutsideClickHandler from "react-outside-click-handler";
import { ToggleSlider } from "react-toggle-slider";
const NavBar = () => {
	const [userDrop, setShowUserDrop] = useState(false);
	const [notifyDrop, setShowNotifyDrop] = useState(false);
	const [dark, setDark] = useState(
		window.matchMedia("(prefers-color-scheme: dark)").matches
	);
	const dispatch = useDispatch();
	/*--------------------------------------------------------------------*/
	useEffect(() => {
		// const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
		const toggleDarkMode = (dark) => {
			document.documentElement.classList.toggle("dark", dark);
		};
		toggleDarkMode(dark);
	}, [dark]);

	/*--------------------------------------------------------------------*/
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
								<div className="drop--actions">
									<div className="dark-mode-toggle">
										<div>
											<i className="fa-solid fa-moon"></i>
											<div>Dark Mode</div>
										</div>
										<ToggleSlider
											active={
												window.matchMedia(
													"(prefers-color-scheme: dark)"
												).matches
											}
											barBackgroundColorActive={"#1877f2"}
											barBackgroundColor={"#e4e6eb"}
											handleSize={20}
											padding={5}
											onToggle={() => setDark(!dark)}
										/>
									</div>
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
