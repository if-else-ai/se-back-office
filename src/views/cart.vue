<template>
	<v-container>

		<v-card color="" elevation="4" class="py-3 pl-3 mr-4 ">
			<v-text-field label="hi"></v-text-field>
		</v-card>
		
	</v-container>
</template>

<style src="./style.css"></style>

<script>

export default {
	data: () => ({
		loading: false,
      	selection: 1,
	}),

	methods:{
		reserve () {
			this.loading = true
			setTimeout(() => (this.loading = false), 2000)
      	},

	}
};

</script>


