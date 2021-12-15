<template>
	<transition appear>
		<v-card class="product__container my-6" flat outlined>
			<v-card  flat>
				<!-- Main -->
				<v-card-title class="d-flex flex-row justify-space-between ">
					<div>Order#{{ order.id }}</div>
					<div>Status - {{ order.status }}</div>
				</v-card-title>
				<v-divider></v-divider>
				<!-- Product -->
				<v-card
					class="product-order__containter"
					v-for="(product, index) in order.detail.product"
					:key="index"
					flat
				>
					<v-card-title class="flex-title ">
						{{ product.name }}
					</v-card-title>
					<v-divider />

					<div class="cart__content">
						<v-img
							class="order__image"
							width="300"
							height="200"
							:src="product.image[0]"
						/>
						<div>
							<p
								v-for="(option, index) in product.option"
								:key="index"
								class="option-description"
							>
								{{ `${option.name}: ${option.select}` }}
							</p>
							<p>
								{{ `Price: ${product.price.toFixed(2)} $` }}
							</p>
							
						</div>
					</div>
				</v-card>

				<p class="order-total-price">{{`Total Price: ${order.detail.totalPrice.toFixed(2)} $`}}</p>
			</v-card>
		</v-card>
	</transition>
</template>

<script>
export default {
	name: "order-card",
	props: ["order"],
};
</script>

<style scoped>
.order-total-price {
	text-align: right;
	margin-right: 1rem;
	color: rgb(46, 146, 33);
}

.product-order__containter {
	border: 1px dashed rgb(131, 131, 131);
	margin: 2rem;
}
.cart__content .order__image {
	flex: none;
}
.cart__content {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: center;
}

.option-description {
	color: rgb(151, 151, 151);
}

.action-button {
	margin-left: auto;
}
.carts__container {
	display: flex;
	width: 1200px;
}

.order__image {
	border: 1px solid rgb(156, 156, 156, 0.6);
	margin: 12px;
}

.item__quantity {
	width: 40px;
	border: 2px solid gray;
	border-radius: 4px;
	text-align: center;
}

</style>
