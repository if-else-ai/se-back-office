import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";
import store from "../store/index.js";

Vue.use(VueRouter);

const beforeEnter = (to, from, next) => {
	if (store.getters.isAuthenticated) {
		next();
	} else {
		next("/login");
	}
};

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
		beforeEnter
	},
	{
		path: "/login",
		name: "login",
		component: () => import("../views/login.vue"),
		beforeEnter(to, from, next) {
			// fix isAuthenticated register before tryAutoLogin
			setTimeout(() => {
				if (store.getters.isAuthenticated) {
					next("/product");
				} else {
					next();
				}
			}, 100);
		}
	},
	{
		path: "/user",
		name: "user",
		component: () => import("../views/user.vue"),
		beforeEnter
	},
	{
		path: "/order",
		name: "order",
		component: () => import("../views/order.vue"),
		beforeEnter
	},
	{
		path: "/dashboard",
		name: "dashboard",
		component: () => import("../views/dashboard.vue"),
		beforeEnter
	},

];

const router = new VueRouter({
	// using 'stack'
	// mode: "history",
	routes,
	scrollBehavior(to, from, savedPosition) {
		return { x: 0, y: 0 };
	},
});

export default router;
