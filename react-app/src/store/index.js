import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import posts from "./posts";
import profile from "./profile";
import comments from "./comments";
import likes from "./likes";
import requests from "./requests";

const rootReducer = combineReducers({
	session,
	posts,
	profile,
	comments,
	likes,
	requests,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
	enhancer = applyMiddleware(thunk);
} else {
	const logger = require("redux-logger").default;
	const composeEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
			trace: true,
			traceLimit: 25,
		}) || compose;
	enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
	return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
