import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
// import { ReactComponent as b } from "../assets/images/b.svg";
import b from "../assets/images/b.png";
import "./NavBar.css";
import Requests from "./Pages/Profile/Requests";
import OutsideClickHandler from "react-outside-click-handler";
import { ToggleSlider } from "react-toggle-slider";

/*--------------------------------------------------------------------*/
const NavBar = () => {
	const [userDrop, setShowUserDrop] = useState(false);
	const [notifyDrop, setShowNotifyDrop] = useState(false);
	const [dark, setDark] = useState(() => {
		const theme = localStorage.getItem("theme");
		const prefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)"
		).matches;
		if (theme === "dark") return true;
		else if (theme === "light") return false;
		else return prefersDark;
	});
	const dispatch = useDispatch();
	const userDropRef = useRef(null);
	const requestsDropRef = useRef(null);
	// useEffect(() => {
	// 	console.log({ userDropRef });
	// 	console.log({ userDrop });
	// 	const handleOutsideClick = (e) => {
	// 		if (
	// 			userDropRef.current &&
	// 			!userDropRef.current.contains(e.target)
	// 		) {
	// 			if (!userDrop) {
	// 				return setShowUserDrop(false);
	// 			} else {
	// 				return setShowUserDrop(true);
	// 			}
	// 		}
	// 	};

	// 	document.addEventListener("click", handleOutsideClick);

	// 	return () => document.removeEventListener("click", handleOutsideClick);
	// }, [userDrop]);
	// useEffect(() => {
	// 	console.log({ requestsDropRef });
	// 	console.log({ notifyDrop });
	// 	const handleOutsideClick = (e) => {
	// 		if (
	// 			requestsDropRef.current &&
	// 			!requestsDropRef.current.contains(e.target)
	// 		) {
	// 			setShowNotifyDrop(false);
	// 		}
	// 	};

	// 	window.addEventListener("click", handleOutsideClick);

	// 	return () => window.removeEventListener("click", handleOutsideClick);
	// }, [notifyDrop]);
	useEffect(() => {
		const toggleDarkMode = (dark) => {
			console.log(dark);
			if (dark) {
				document.documentElement.classList.remove("light");
				document.documentElement.classList.add("dark");
				localStorage.setItem("theme", "dark");
				// setDark(false);
			} else {
				document.documentElement.classList.add("light");
				document.documentElement.classList.remove("dark");
				localStorage.setItem("theme", "light");
				// setDark(true);
			}
			// localStorage.setItem("theme", dark ? "dark" : "light");
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
					<OutsideClickHandler
						onOutsideClick={() => {
							setShowNotifyDrop(false);
						}}
					>
						<div
							className="user-menu--grid"
							onClick={() => {
								// setShowUserDrop(false);
								setShowNotifyDrop(!notifyDrop);
							}}
							aria-haspopup="true"
							aria-expanded={notifyDrop}
						>
							<i className="fa-solid fa-bell"></i>
						</div>
						{notifyDrop && (
							<div className="nav-dropdown">
								<Requests />
							</div>
						)}
					</OutsideClickHandler>
					<OutsideClickHandler
						onOutsideClick={() => {
							setShowUserDrop(false);
						}}
					>
						<div
							className="user-menu--drop"
							onClick={() => {
								setShowUserDrop(!userDrop);
								// setShowNotifyDrop(false);
							}}
							aria-haspopup="true"
							aria-expanded={userDrop}
						>
							<i className="fa-solid fa-caret-down"></i>
						</div>
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
											{dark ? (
												<i className="fa-solid fa-moon"></i>
											) : (
												<i className="fa-solid fa-sun"></i>
											)}
											<div>Dark Mode</div>
										</div>
										{/* {dark ? (
											<i
												class="fa-solid fa-toggle-on"
												onClick={() => setDark(false)}
												style={{
													fontSize: 36,
													color: "var(--main-blue)",
													marginRight: 20,
												}}
											></i>
										) : (
											<i
												class="fa-solid fa-toggle-off"
												onClick={() => setDark(true)}
												style={{
													fontSize: 36,
													color: "var(--secondary-text)",
													marginRight: 20,
												}}
											></i>
										)} */}
										<ToggleSlider
											active={dark}
											barBackgroundColorActive={"#1877f2"}
											barBackgroundColor={"#e4e6eb"}
											handleSize={18}
											draggable={false}
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
