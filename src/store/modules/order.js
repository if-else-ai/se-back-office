import axios from "../../api/axios-order.js";

// state data
const state = {
	order: [],
};

// mutate state
const mutations = {
	setOrder(state, order) {
		state.order = order;
	},
};

// action -> define app data logic
const actions = {
	// get assignemnt => GET
	getOrder({ commit }) {
		axios.get("/orders").then((res) => {
			commit("setOrder", res.data);
		});
	},
	updateOrder({ commit }, updateDate) {
		axios.put("/order", {...updateDate}).then((res) => {
            alert('update Success')
            console.log(res)
		}).catch(err => {
            alert('update Fail')
        })
	},
};

// getters return requested data
const getters = {
	// get all assignment
	order(state) {
		return state.order;
	},
	// get assignment list -> assignment menu
};

export default {
	state,
	mutations,
	actions,
	getters,
};
