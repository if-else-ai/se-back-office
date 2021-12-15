<template>
	<v-container>
		<div class="product-container pt-4">
			<v-card width="400">
				
			</v-card>

			<v-card class="product-menu" width="400" min-height="400" outlined elevation="4">
				<v-card-title> {{ product.productName }} </v-card-title>
			</v-card>
		</div>
	</v-container>
</template>

<style src="./style.css"></style>

<script>

export default {
	data: () => ({

	}),

	created(){
		this.$store.dispatch('getProduct', {
			productID: this.$route.query.productID
		})	
	},

	methods:{

	},

	computed: {
		product(){
			console.log('in Page', this.$store.getters.product)

			return this.$store.getters.product
		}
	}
};

</script>

<style scoped>
	
.product-container {
	display: flex;
	flex-direction: columns;
	justify-content: center;
}

.product-menu {
	margin-right: 8rem;
}

.product__item {
	color: rgb(247, 247, 247);
	cursor: pointer;
}

.product__item:hover {
	color: black;
}
</style>


