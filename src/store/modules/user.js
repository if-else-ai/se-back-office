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
    // get assignemnt => GET
	getUser({ commit }) {
		axios.get('/users').then(res => {
			// store products in State
			commit('setUser', res.data)
		})
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
