<template>
	<nav>
		<v-app-bar class="nav-bar__items px-6" app outlined elevation="1">

			<!-- Path Navigation -->
			<div class="nav-menu__container">
				<ul class="nav-menu">
					<a class="nal-links mr-4" href="/home">
						Home
					</a>
					<a class="nal-links mr-4" href="/shopping">
						Shopping
					</a>
					<a class="nal-links mr-4" href="/customize">
						Customize
					</a>
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

			<!-- Icon  -->
			<div class="nav-icon__container">
				<v-menu transition="slide-y-transition" offset-y bottom open-on-hover>
					<template v-slot:activator="{ on, attrs }">
						<v-btn v-bind="attrs" v-on="on" icon color="white">
							<v-icon>mdi-account</v-icon>
						</v-btn>
					</template>
					<!-- <v-list>
						<v-list-item v-for="(item, i) in items" :key="i">
							<v-list-item-title>{{ item.menu }}</v-list-item-title>
						</v-list-item>
					</v-list> -->
					<v-list>
						<v-list-item class="menu-link mx-4" @click="toProfile">
							<v-list-item-title  > Profile </v-list-item-title>
						</v-list-item>
						<v-list-item class="menu-link mx-4" @click="onLogout">
							<v-list-item-title  > Logout </v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>

				<v-badge dot color="red" overlap offset-x="18" offset-y="16">
					<v-btn icon color="white" @click="toProductCart">
						<v-icon>mdi-cart-outline</v-icon>
					</v-btn>
				</v-badge>
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
