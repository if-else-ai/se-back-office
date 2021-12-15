<template>
	<v-container class="d-flex justify-center align-center">
		<v-card flat width="1200" height="800">
			<v-data-table
				:headers="headers"
				:items="user"
				:items-per-page="5"
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
					gender: data.gender,
				};
			});
			// console.log(data)
			return data;
		},
	},
};
</script>

<style scoped></style>
