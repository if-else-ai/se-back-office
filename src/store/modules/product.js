import axios from '../../api/axios.js'

import products from '../../assets/products.json'

// state data
const state = {
	products: [],
	product: null,
};

// mutate state
const mutations = {
	setProducts(state, products) {
		state.products = products;
	},
	setProduct(state, product) {
		state.product = product;
	},
};	

// action -> define app data logic
const actions = {
    // get assignemnt => GET
	getProducts({ commit }) {
		commit('setProducts', products.products)
		axios.get('/products').then(res => {
			// store products in State
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
	product(state){
		return state.product
	},
	// get assignment list -> assignment menu
};

export default {
	state,
	mutations,
	actions,
	getters,
};
