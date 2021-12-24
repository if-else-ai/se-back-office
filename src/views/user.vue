<template>
	<v-container class="page-container d-flex flex-column justify-center align-center">
		
		<h1 class="my-6">User</h1>
		<v-card flat width="1200" height="800">
			<v-data-table
				:headers="headers"
				:items="user"
				:items-per-page="20"
				class="elevation-1"
			></v-data-table>
		</v-card>
	</v-container>
</template>

<script>
export default {
	data: () => ({
		headers: [
			{ text: "User ID", value:'id' },
			{ text: "E-mail", value:'email' },
			{ text: "Name", value:'name' },
			{ text: "Gender", value:'gender' },
		],
	}),

	computed: {
		user() {
			let data = this.$store.getters.user;
			console.log(data)
			data = data.map((data) => {
				return {
					id: data.id,
					name: data.name,
					email: data.email,
					gender: data.gender,
				};
			});
			console.log(data)
			// console.log(data)
			return data;
		},
	},
};
</script>

<style scoped>
.page-container {
	padding: 0 400px;
}
</style>
