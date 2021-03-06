import axios from '../../api/axios-user.js'

// state data
const state = {
	user: [],
};

// mutate state
const mutations = {
	setUser(state, user) {
		state.user = user;
	},

};	

// action -> define app data logic
const actions = {
	getUser({ commit }) {
		axios.get('/users').then(res => {
			commit('setUser', res.data)
		})
	},
	deleteUser({ commit, dispatch }, userID) {
		axios.delete(`/users/${userID}`).then(res => {
			alert('Delete User Successfully')
			dispatch('getUser')
		}).catch(err => {
			alert('Fail to Delete User')
		})
	},
	updateUser({ commit, dispatch }, userData) {
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
				alert("Update User Successfully");
				dispatch('getUser')
			})
			.catch((err) => {
				alert("fail store user");
			});

	},

};

// getters return requested data
const getters = {
	// get all assignment
	user(state){
		return state.user
	},
	// get assignment list -> assignment menu
};

export default {
	state,
	mutations,
	actions,
	getters,
};
