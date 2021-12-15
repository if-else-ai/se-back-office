import axios from "../../api/axios-auth.js";
import router from "../../router/index";
import axiosOrder from "../../api/axios-order.js";

const state = {
	idToken: null,
	authorizedUser: null,
	userOrder: null,
};

const mutations = {
	// Authorize
	authUser(state, userData) {
		state.idToken = userData.token;
		// state.userId = userData.userId;
	},
	// Store user info
	storeUser(state, user) {
		state.authorizedUser = user;
	},
	// Clear token
	clearAuthData(state) {
		state.idToken = null;
		state.userRole = null;
		// state.userId = null
	},
	setOrder(state, orders) {
		state.userOrder = orders;
	},
};

const actions = {
	// set time that admin stay sign in
	setLogoutTimer({ commit }, expirationTime) {
		setTimeout(() => {
			commit("clearAuthData");
			// }, expirationTime * 1000)
		}, expirationTime * 1000);
	},

	// user login
	login({ commit, dispatch, state }, authData) {
		axios
			.post("/login", {
				email: authData.email,
				password: authData.password,
			})
			// Store Token on local storage for auto login
			.then((res) => {
				res.data.expiresIn = 3600;
				commit("authUser", {
					token: res.data.id,
					// userId: res.data.localId
				});
				const now = new Date();
				const expirationDate = new Date(
					now.getTime() + res.data.expiresIn * 1000
				);
				axios.get(`/users/${res.data.id}`).then((res) => {
					dispatch("storeUser", res.data);
				});

				localStorage.setItem("token", res.data.id);
				localStorage.setItem("expirationDate", expirationDate);
				dispatch("setLogoutTimer", res.data.expiresIn);
				router.replace("/home");
			})
			.catch((error) => {
				alert("Invalid username or password");
			});
	},

	// re-login when token is not expired
	tryAutoLogin({ commit }) {
		// Check token from localStorage
		const token = localStorage.getItem("token");
		if (!token) {
			return;
		}
		// Check if token is expired
		const expirationDate = new Date(localStorage.getItem("expirationDate"));
		const now = new Date();
		if (now >= expirationDate) {
			return;
		}
		// Authorize user
		let userData = localStorage.getItem("user");
		if (userData) {
			userData = JSON.parse(userData);
			commit("storeUser", userData);
		}

		commit("authUser", {
			token: token,
		});
	},
	// Log user out and Remove token in localStorage
	logout({ commit, state }) {
		commit("clearAuthData");
		localStorage.removeItem("expirationDate");
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		router.replace("/login");
	},
	storeUser({ commit }, userData) {
		let json = JSON.stringify(userData);
		localStorage.setItem("user", json);
		commit("storeUser", userData);
	},
	register({ commit }, userData) {
		axios
			.post("/register", {
				email: userData.email,
				password: userData.password,
			})
			.then((res) => alert("Register Successfully"))
	},

	saveUser({ commit }, userData) {
		axios
			.put(`/users/${userData.id}`, {
				name: userData.name,
				email: userData.email,
				telNo: userData.telNo,
				address: userData.address,
				dateOfBirth: userData.dateOfBirth,
				gender: userData.gender,
			})
			.then((res) => {
				let json = JSON.stringify(userData);
				localStorage.setItem("user", json);
				commit("storeUser", userData);
				alert("Update Successfully");
			})
			.catch((err) => {
				alert("fail store user");
			});

	},
	getUserOrder({ commit }, userData) {
		axiosOrder
			// .get(`/orders/${userData.id}`,)
			.get(`/orderByUser/${userData.id}`)
			.then((res) => {
				commit("setOrder", res.data);
			})
			.catch((err) => {
				alert("fail to get order");
			});
	},
};

const getters = {
	// get login'd user
	authorizedUser(state) {
		return state.authorizedUser;
	},
	// get if user is authorized
	isAuthenticated(state) {
		return state.idToken !== null;
	},
	userOrder(state) {
		return state.userOrder;
	},
};

export default {
	state,
	mutations,
	actions,
	getters,
};
