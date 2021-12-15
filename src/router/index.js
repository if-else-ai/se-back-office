import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";
import store from "../store/index.js";

Vue.use(VueRouter);

// define app route
const routes = [
	{
		path: "/",
		redirect: "/product",
	},
	{
		path: "/product",
		name: "product",
		component: () => import("../views/product.vue"),
	},
	{
		path: "/user",
		name: "user",
		component: () => import("../views/user.vue"),
	},

];

const router = new VueRouter({
	// using 'stack'
	mode: "history",
	routes,
});

export default router;
