<template>
  <v-app>
    <Navigation
      v-if="currentRouteName !== 'login'"
      :navTitle="currentRouteName"
    />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from "@/components/navigation/navigation.vue";
// views handle app interface / ui
// can handle some form validation work before sending data to back-end
export default {
  name: "App",

  components: {
    Navigation,
  },

  data: () => ({}),

	created() {
		this.$store.dispatch("getProducts");
	},

  computed: {
    // display nav route name
    currentRouteName() {
      return this.$route.name;
    },
  },
};
</script>

<style>
* {
  font-family: "Prompt", sans-serif;
}
</style>
