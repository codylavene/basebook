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

	useEffect(() => {
		(async () => {
			await dispatch(authenticate());
			setLoaded(true);
		})();
	}, [dispatch]);

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
					<NavBar />
					<UsersList />
				</ProtectedRoute>
				<ProtectedRoute path="/users/:userId">
					<NavBar />
					<Profile />
				</ProtectedRoute>
				<ProtectedRoute path="/feed" exact={true}>
					<NavBar />
					<Posts />
				</ProtectedRoute>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
