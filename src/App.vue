<template>
	<v-app>
		<Navigation
			:navTitle="currentRouteName"
		/>
		<v-main>
			<router-view :key="$route.fullPath"></router-view>
			<Footer v-if="currentRouteName !== 'login'" />
		</v-main>
	</v-app>
</template>

<script>
import Navigation from "@/components/navigation/navigation.vue";
import Footer from "@/components/footer.vue";
// views handle app interface / ui
// can handle some form validation work before sending data to back-end
export default {
	name: "App",

	components: {
		Navigation,
		Footer
	},

	data: () => ({
		links: ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"],
	}),

	created() {
		// Initialize App Variable
		this.$store.dispatch('getProducts');
		this.$store.dispatch('tryRetrieveCart');
		this.$store.dispatch("tryAutoLogin");
	},

	computed: {
		// save route name for checking route
		currentRouteName() {
			return this.$route.name;
		},
	},
};
</script>

<style>

.term-of-service {
  	font-weight: normal;
	cursor: pointer;
  	margin: 10px 0;
}

* {
	font-family: "Prompt", sans-serif;
}
</style>
