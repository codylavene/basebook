import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import Profile from "./components/Pages/Profile";
import { authenticate } from "./store/session";
import Posts from "./components/Posts";
import SplashPage from "./components/Pages/Splash";

function App() {
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();
	const [dark, setDark] = useState(() => {
		const theme = localStorage.getItem("theme");
		const prefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)"
		).matches;
		if (theme === "dark") return true;
		else if (theme === "light") return false;
		else return prefersDark;
	});
	useEffect(() => {
		(async () => {
			await dispatch(authenticate());
			setLoaded(true);
		})();
	}, [dispatch]);
	useEffect(() => {
		// window.addEventListener("DOMContentLoaded", (e) => {
		// setLoaded(false);
		if (dark) {
			document.documentElement.classList.add("dark");
			document.documentElement.classList.remove("light");
		} else {
			document.documentElement.classList.add("light");
			document.documentElement.classList.remove("dark");
		}
		// if (localStorage.getItem("theme")) {
		// 	console.log(1);
		// 	if (localStorage.getItem("theme") === "dark") {
		// 		console.log(2);
		// 		setDark(true);
		// 		console.log(3);
		// 	} else {
		// 		setDark(false);
		// 	}
		// 	// } else if (
		// 	// 	window.matchMedia("(prefers-color-scheme: dark)").matches
		// 	// ) {
		// 	// 	setDark(true);
		// 	// 	document.documentElement.classList.add("dark", dark);
		// 	// 	localStorage.setItem("dark", true);
		// } else {
		// 	localStorage.setItem("theme", dark ? "dark" : "light");
		// 	if (dark) {
		// 		document.documentElement.classList.add("dark");
		// 		document.documentElement.classList.remove("light");
		// 	} else {
		// 		document.documentElement.classList.remove("light");
		// 		document.documentElement.classList.add("dark");
		// 	}
		// }
		// setLoaded(true);
		// });
	}, []);
	useEffect(() => {
		// const toggleDarkMode = (dark) => {
		// 	if (dark) {
		// 		document.documentElement.classList.add("light");
		// 		document.documentElement.classList.remove("dark");
		// 	} else {
		// 		document.documentElement.classList.remove("light");
		// 		document.documentElement.classList.add("dark");
		// 	}
		// 	localStorage.setItem("theme", dark ? "dark" : "light");
		// };
		// toggleDarkMode(dark);
	}, [dark]);
	if (!loaded) {
		return null;
	}

	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact={true}>
					<SplashPage />
				</Route>
				<ProtectedRoute path="/users" exact={true}>
					<NavBar dark={dark} setDark={setDark} />
					<UsersList />
				</ProtectedRoute>
				<ProtectedRoute path="/users/:userId">
					<NavBar dark={dark} setDark={setDark} />
					<Profile />
				</ProtectedRoute>
				<ProtectedRoute path="/feed" exact={true}>
					<NavBar />
					<Posts dark={dark} setDark={setDark} />
				</ProtectedRoute>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
