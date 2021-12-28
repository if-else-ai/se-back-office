import axios from "../../api/axios-product.js";

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
		axios.get("/products").then((res) => {
			commit("setProducts", res.data);
		});
	},
	addProduct({ commit, dispatch }, productData) {
		// console.log({...productData})
		axios.post("/product", { ...productData.formData }).then((res) => {
			alert('Add Product Successfully')
			if(productData.image){
				productData.image.append("productId", res.data.id);
				axios.post("/image", productData.image).then((res) => {
					dispatch('getProducts')
				});
			}
			dispatch('getProducts')
		});
	},

	uploadProductImage({ commit, dispatch }, productData) {
		// console.log({...productData})
		axios
			.post("/image", productData.formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((res) => {
				alert('Upload Image Successfully')
				dispatch('getProducts')
			});
	},

	deleteProduct({ commit, dispatch }, productId) {
		axios.delete(`/product/${productId}`).then((res) => {
			alert('Delete Product Successfully')
			dispatch('getProducts')
		}).catch(err => {
			alert('Fail to Delete Product')
		})
	},
	updateProduct({ commit, dispatch }, product) {
		axios.put(`/product/${product.id}`, product).then((res) => {
			alert('Update Product Successfully')
			dispatch('getProducts')
		}).catch(err => {
			alert('Fail to Update Product')
		})
	},
	
};

// getters return requested data
const getters = {
	// get all assignment
	products(state) {
		return state.products;
	},
	// get assignment list -> assignment menu
};

export default {
	state,
	mutations,
	actions,
	getters,
};
