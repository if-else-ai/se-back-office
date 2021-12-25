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
	updateOrder({ commit, dispatch }, updateDate) {
		axios.put("/order", {...updateDate}).then((res) => {
            alert('Update Order Successfully')
			dispatch('getOrder')
		}).catch(err => {
            alert('Fail to Update Order')
        })
	},

	deleteOrder({ commit, dispatch }, orderId) {
		axios.delete(`/order/${orderId}`).then((res) => {
            alert('Delete order Successfully')
			dispatch('getOrder')
		}).catch(err => {
            alert('Fail to Delete Order')
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
