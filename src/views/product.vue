<template>
	<v-container class="d-flex justify-center align-center">
		<v-card flat width="1200" height="800">
			<v-data-table
				:headers="headers"
				:items="products"
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
			{ text: "Product ID", value:'id' },
			{ text: "Name", value:'name' },
			{ text: "Price", value:'price' },
			{ text: "Quantity", value:'quantity' },
		],
	}),

	computed: {
		products() {
			let data = this.$store.getters.products;
			data = data.map((data) => {
				return {
					id: data.id,
					name: data.name,
					price: data.price,
					quantity: data.quantity,
				};
			});
			console.log(data)
			return data;
		},
	},
};
</script>

<style scoped></style>
