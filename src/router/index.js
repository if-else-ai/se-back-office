import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";
import store from "../store/index.js";

Vue.use(VueRouter);

// define app route
const routes = [
	{
		path: "/",
		redirect: "/home",
	},
	{
		path: "/shopping",
		name: "shopping",
		component: () => import("../views/shopping.vue"),
	},
	{
		path: "/shopping/product",
		name: "product",
		component: () => import("../views/product.vue"),
	},
	{
		path: "/home",
		name: "home",
		component: () => import("../views/home.vue"),
	},
	// {
	// 	path: "/keyboard",
	// 	name: "keyboard",
	// 	component: () => import("../views/keyboard.vue"),
	// },
	{
		path: "/customize",
		name: "customize",
		component: () => import("../views/customize.vue"),
	},
	// {
	// 	path: "/accesories",
	// 	name: "accesories",
	// 	component: () => import("../views/accesories.vue"),
	// },
	// {
	// 	path: "/tools",
	// 	name: "tools",
	// 	component: () => import("../views/tools.vue"),
	// },
	{
		path: "/login",
		name: "login",
		component: () => import("../views/login.vue"),
	},
	{
		path: "/cart",
		name: "cart",
		component: () => import("../views/cart.vue"),
	},
	{
		path: "/profile",
		name: "profile",
		component: () => import("../views/profile.vue"),
	},
	{
		path: "/register",
		name: "register",
		component: () => import("../views/register.vue"),
	},
];

const router = new VueRouter({
	// using 'stack'
	mode: "history",
	routes,
	scrollBehavior(to, from, savedPosition) {
		return { x: 0, y: 0 };
	},
});


export default router;
