<template>
	<transition appear>
		<v-card class="product__container" max-width="374" flat outlined>
			<v-img
				class="product__image"
				height="250px"
				:src="product.product_image[0]"
				@click="
						$router.push({
							path: `/shopping/product`,
							query: { product: product.productID },
						})
						"
			/>
			<v-card-title class="product__title">{{
				product.productName
			}}</v-card-title>
			<!-- <v-card-text class="description">
				<p>{{ product.detail }}</p>
			</v-card-text> -->
			<v-divider></v-divider>
			<v-row>
				<v-col cols="auto" class="mr-auto price">
					<p>฿{{ product.productPricePerUnit }}</p>
				</v-col>
				<v-col cols="auto" class="selled">
					<p>ขายแล้ว {{ product.productPricePerUnit }} ชิ้น</p>
				</v-col>
			</v-row>
		</v-card>
	</transition>
</template>

<script>
export default {
	name: "product",
	props: ["product"],
};
</script>

<style>
.product__image {
	cursor: pointer;
}

.v-card__title {
	align-items: center;
	justify-content: center;
	display: flex;
	flex-wrap: wrap;
	font-size: 1.25rem;
	font-weight: 500;
	letter-spacing: 0.0125em;
	line-height: 2rem;
	word-break: break-all;
	padding: 16px;
}

.product__container {
	margin: 20px;
}
.description p {
	color: rgb(36, 36, 36);
	height: 60px;
}
.price p {
	color: rgb(0, 162, 255);
	padding-top: 10px;
	padding-left: 15px;
}
.selled p {
	color: rgb(206, 206, 206);
	padding-top: 10px;
	padding-right: 15px;
}
</style>
