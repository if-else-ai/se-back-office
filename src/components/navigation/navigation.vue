<template>
	<nav>
		<v-app-bar class="nav-bar__items px-6" app outlined elevation="1">

			<!-- Path Navigation -->
			<div class="nav-menu__container">
				<ul class="nav-menu">
					<a class="nav-links mr-4" href="/dashboard">
						Dashboard
					</a>
					<a class="nav-links mr-6" href="/product">
						Product
					</a>
					<a class="nav-links mr-4" href="/user">
						User
					</a>
					<a class="nav-links mr-4" href="/order">
						Order
					</a>
					<v-divider color="white" vertical />
					<li class="logout-button white--text ml-4" @click="onLogout">
						Logout
					</li>
				</ul>
				
			</div>

			<!-- Website Logo -->
			<div class="nav-logo__container">
				<a href="/home" >
					<h1>
						Kibby
					</h1>
				</a>
			</div>

		</v-app-bar>
	</nav>
</template>


<script>
export default {
	name: "navigation",

	data: () => ({

		drawer: true,
		// path_list: [
		// 	{ title: "Home", path: "/shopping" },
		// 	{ title: "Shop", path: "/keyboard" },
		// 	{ title: "Customize", path: "/keyboard" },
		// ],

		items: [{ menu: "Account", path:"/profile" }],


	}),

	props: ["navTitle"],

	methods: {
		toProfile(){
			this.$router.push('profile')
		},

		toProductCart(){
			this.$router.push('cart')
		},
		
		onLogout(){
			this.$store.dispatch('logout')
		}

	},

};
</script>

<style src="./navigation.css" />
