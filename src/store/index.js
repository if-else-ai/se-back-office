import Vue from "vue";
import Vuex from "vuex";

import product from "./modules/product.js";
import login from "./modules/login.js";
import user from "./modules/user.js";
import order from "./modules/order.js";

// State management in vue
Vue.use(Vuex);

export default new Vuex.Store({
	// defined module used
	modules: {
		product,
		user,
		login,
		order
	},
});
