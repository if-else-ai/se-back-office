import axios from "../../api/axios.js";
import axiosOrder from "../../api/axios-order.js";

import products from "../../assets/products.json";

// state data
const state = {
	products: [],
	product: {},
	payment: null
};

// mutate state
const mutations = {
	setProducts(state, products) {
		state.products = products;
	},
	setProduct(state, product) {
		state.product = product;
	},
	setPayment(state, data) {
		state.payment = data;
	},
	removePayment(state){
		state.payment = null
	},
	removeProduct(state){
		state.product = {}
	}
};

// action -> define app data logic
const actions = {
	// get assignemnt => GET
	getProducts({ commit }) {
		// commit('setProducts', products.products)

		// store products in State
		axios.get("/products").then((res) => {
			let item = res.data;
			item = item.filter( item => {
				return (item.image !== null && item.image.length >= 2 )
			})
			// item = item.map((item) => {
			// 	return {
			// 		...item,
			// 		image:
			// 			item.image === null
			// 				? []
			// 				: item.image,
			// 	};
			// });
			console.log(item)
			
			commit("setProducts", item);
		});
	},

	getProduct({ commit }, productID) {
		// let array = products.products.filter(
		// 	product => {
		// 		return product.id === productID.productID
		// 	})
		// commit('setProduct', array[0])
		axios.get(`/product/${productID}`).then((res) => {
			let item = res.data;
			item.image === null
				? item.image = []
				: item.image
			commit("setProduct", item);
		});
	},

	sendOrder({ commit }, orderData) {

		axiosOrder.post('/order', {
			...orderData
		}).then((res) => {
			commit('setPayment', res.data)
		});
	},

	removePayment({ commit }) {
		commit('removePayment')
	},

	removeProduct({ commit }) {
		commit('removeProduct')
	},

	updateOrder({ commit,dispatch }, orderData) {
		if(orderData.paymentId){
			axiosOrder.put('/order', {
			id: orderData.id,
			status: orderData.status,
			trackingNumber: orderData.trackingStatus
		}).then((res) => {
			dispatch('updateCart', orderData.deletedIndex)
		});
		}

		if(!orderData.paymentId){
			axiosOrder.put('/order', {
			id: orderData.id,
			status: orderData.status,
		}).then((res) => {
			dispatch('updateCart', orderData.deletedIndex)
		});
		}
		
	},

};

// getters return requested data
const getters = {
	// get all assignment
	products(state) {
		return state.products;
	},
	product(state) {
		return state.product;
	},
	payment(state) {
		return state.payment;
	},
	
	// get assignment list -> assignment menu
};

export default {
	state,
	mutations,
	actions,
	getters,
};
