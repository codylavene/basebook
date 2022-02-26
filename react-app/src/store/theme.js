const SET_THEME = "theme/SET_THEME";

const set = (theme) => ({
	type: SET_THEME,
	theme,
});

export const setTheme = (isDark) => async (dispatch) => {
	// let dark = false;
	localStorage.setItem("dark", isDark);
	// if (localStorage.getItem("theme")) {
	// 	if (localStorage.getItem("theme") === "dark") dark = true;
	// } else if (!window.matchMedia) {
	// 	return false;
	// } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
	// 	dark = true;
	// }

	if (isDark) document.documentElement.setAttribute("data-theme", "dark");
	else document.documentElement.removeAttribute("data-theme", "dark");
};
