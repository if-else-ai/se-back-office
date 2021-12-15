import axios from '../../api/axios-product.js'

// state data
const state = {
	products: [],
};

// mutate state
const mutations = {
	setProducts(state, products) {
		state.products = products;
	},

};	

// action -> define app data logic
const actions = {
    // get assignemnt => GET
	getProducts({ commit }) {
		axios.get('/products').then(res => {
			commit('setProducts', res.data)
		})
	},

};

// getters return requested data
const getters = {
	// get all assignment
	products(state){
		return state.products
	},
	// get assignment list -> assignment menu
};

export default {
	state,
	mutations,
	actions,
	getters,
};
