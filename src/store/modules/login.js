import axios from "../../axios-auth";
import router from "../../router/index";
import userRole from "../../assets/user-role.js"

const state = {
	idToken: null,
	authorizedUser: null,
	userRole : null
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
	setUserRole(state, role) {
		state.userRole = role
	}
};

const actions = {
	// set time that admin stay sign in
	setLogoutTimer({ commit }, expirationTime) {
		setTimeout(() => {
			commit("clearAuthData");
			// }, expirationTime * 1000)
		}, expirationTime * 1000);
	},

	// admin login
	// login({ commit, dispatch }, authData) {
	// 	axios
	// 		.post("/api/login", {
	// 			email: authData.email,
	// 			password: authData.password,
	// 		})
	// 		// Store Token on local storage for auto login
	// 		.then((res) => {
	// 			res.data.expiresIn = 3600;
	// 			commit("authUser", {
	// 				token: res.data.token,
	// 				// userId: res.data.localId
	// 			});
	// 			const now = new Date();
	// 			const expirationDate = new Date(
	// 				now.getTime() + res.data.expiresIn * 1000
	// 			);
	// 			axios
	// 				.get("api/admin-role", { headers: {
    //                     'Authorization' : 'Bearer ' + res.data.token
    //                 }})
    //                 .then((response) => {
	// 					let data = response.data
	// 					let role = userRole[data.role]
	// 					commit('setUserRole', role)
	// 					localStorage.setItem("userRole", role);
    //                 })
	// 			localStorage.setItem("token", res.data.token);
	// 			// localStorage.setItem('userId', res.data.localId)
	// 			localStorage.setItem("expirationDate", expirationDate);
	// 			dispatch("storeUser", authData);
	// 			dispatch("setLogoutTimer", res.data.expiresIn);
	// 			router.replace("/home");
	// 		})
	// 		.catch((error) => {
	// 			alert("เกิดข้อผิดพลาด");
	// 		});
		
	// },

    login({ commit, dispatch }, authData) {
        commit("authUser", {
            token: "token",
            // userId: res.data.localId
        });
        let expiresIn = 3600;
        const now = new Date();
        const expirationDate = new Date(
            now.getTime() + expiresIn * 1000
        );
        localStorage.setItem("token", "token");
        localStorage.setItem("expirationDate", expirationDate);
        dispatch("storeUser", authData);
        dispatch("setLogoutTimer", expiresIn);
        router.replace("/home");
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
		// const userId = localStorage.getItem('userId')
		commit("authUser", {
			token: token,
			// userId: userId
		});
		const userRole = localStorage.getItem("userRole")
		commit("setUserRole", userRole)
	},
	// Log user out and Remove token in localStorage
	logout({ commit }) {
		commit("clearAuthData");
		localStorage.removeItem("expirationDate");
		localStorage.removeItem("token");
		localStorage.removeItem("userRole");
		// localStorage.removeItem('userId')
		router.replace("/login");
	},
	// Store to backend
	// Currently unavailable
	storeUser({ commit, state }, userData) {
		if (!state.idToken) {
			return;
		}
		// Store on backend / example below is Firebase
		// axios.post('/users.json' + '?auth=' + state.idToken, userData)
		//   .then(res => console.log(res))
		//   .catch(error => console.log(error))
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
	userRole(state) {
		return state.userRole
	}
};

export default {
	state,
	mutations,
	actions,
	getters,
};
