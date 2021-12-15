<template>
	<v-container class="carts__container">
		<v-card class="carts__box" width="1200">
			<!-- Proudct-cart Card -->
			<v-card
				class="d-flex flex-column pa-6"
				v-if="carts.length !== 0"
				flat
			>
				<h1>Carts</h1>
				<div class="d-flex my-3">
					<h4 class="fw-600">SUMMARY</h4>
				</div>
				<!-- Cart Item -->
				<div
					v-for="(item, itemIndex) in cartItem"
					:key="itemIndex"
					class="mb-6"
				>
					<v-card>
						<v-card-title>
							{{ item.name }}
						</v-card-title>
						<v-divider></v-divider>
						<v-card class="cart__content" flat>
							<v-img
								class="cart__image"
								:src="item.image[0]"
								contain
								max-width="300px"
								min-height="200px"
							/>
							<div>
								<div v-if="item.option.length === 0">
									<p>
										{{ `${item.category}: ${item.name}` }}
									</p>
								</div>
								<div v-else>
									<p>
										{{ `${item.category}: ${item.name}` }}
									</p>
								</div>

								<div
									v-for="(option, index) in item.option"
									:key="index"
								>
									<p class="option-description">
										{{ `${option.name}: ${option.select}` }}
									</p>
								</div>

							</div>
							<div class="action-button d-flex align-center">
								<div class="d-flex flex-row">
									<v-btn icon @click="decrement(itemIndex)">
										<v-icon>mdi-minus</v-icon>
									</v-btn>
									<input
										class="item__quantity"
										type="text"
										v-model="item.quantity"
									/>
									<v-btn icon @click="increment(itemIndex)">
										<v-icon>mdi-plus</v-icon>
									</v-btn>
								</div>
								<div class="cart__price mx-2">
									{{ `$ ${item.totalPrice.toFixed(2)}` }}
								</div>
								<v-btn
									class="align-self-center mx-4"
									@click="checkout(itemIndex)"
									><v-icon>mdi-cart</v-icon> checkout</v-btn
								>
							</div>
						</v-card>
					</v-card>
				</div>
				<v-btn class="align-self-end" @click="checkOutAll"
					><v-icon>mdi-cart</v-icon> checkout</v-btn
				>
			</v-card>
			<EmptyCart v-else />
		</v-card>
		<div v-if="payment">
			<v-dialog v-model="dialog" width="500" persistent>
				<v-card>
					<v-card-title class="text-h5 blue darken-1 white--text ">
						Payment
					</v-card-title>
					<v-img src="../assets/image/qrcode_test.svg" />
					<v-divider></v-divider>

					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn
							color="error"
							raised
							@click="
								dialog = false;
								onCancel();
							"
						>
							Cancel Order
						</v-btn>
						<v-btn
							color="success"
							raised
							@click="
								dialog = false;
								onMarkAsPaid();
							"
						>
							Mark As Paid
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</div>
	</v-container>
</template>

<style scoped>
.option-description {
	color: rgb(151, 151, 151);
}
.carts__box {
	border: 1px dashed rgb(207, 207, 207);
}
.action-button {
	margin-left: auto;
}
.carts__container {
	display: flex;
	width: 1200px;
}

.cart__image {
	border: 1px solid rgb(156, 156, 156, 0.6);
	margin: 12px;
}

.cart__content {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	align-items: center;
	justify-content: flex-start;
}

.item__quantity {
	width: 40px;
	border: 2px solid gray;
	border-radius: 4px;
	text-align: center;
}

.cart__price {
	color: rgb(46, 146, 33);
}

</style>

<script>
import EmptyCart from "./EmptyCart.vue";

export default {
	name: "Cart",
	components: {
		EmptyCart,
	},

	data: () => ({
		menuList: [
			{ title: "add", icon: "mdi-plus" },
			{ title: "remove", icon: "mdi-minus" },
		],
		cartItem: [],
		dialog: false,
		paymentSlip: null,
		deleteCart: 0,
	}),

	created() {
	},

	methods: {
		// add product
		increment(index) {
			// this.cartItem[index].totalPrice =
			// 	(this.cartItem[index].totalPrice /
			// 		this.cartItem[index].quantity) *
			// 	this.cartItem[index].quantity;

			this.cartItem[index].quantity += 1;
			let quantity = this.cartItem[index].quantity;
			let priceAddedPerUnit = this.cartItem[index].priceAddedPerUnit;
			this.cartItem[index].totalPrice = quantity * priceAddedPerUnit;
		},
		// decrease product
		decrement(index) {
			if (this.cartItem[index].quantity > 1) {
				this.cartItem[index].quantity -= 1;
				let quantity = this.cartItem[index].quantity;
				let priceAddedPerUnit = this.cartItem[index].priceAddedPerUnit;
				this.cartItem[index].totalPrice = quantity * priceAddedPerUnit;
			} else {
				this.cartItem.splice(index, 1);
				this.$store.dispatch("removeCart", index);
			}
		},

		// addItem(items){
		// 	this.$store.dispatch("addToCart",items);
		// },
		// removeItem(items){
		// 	this.$store.dispatch("removeItem",items);
		// },
		checkout(index) {
			let userData = this.$store.getters.authorizedUser;
			if (!this.$store.getters.isAuthenticated) {
				alert("กรุณาล๊อกอิน");
				this.$router.push("login");
			} else if (
				userData.name.length === 0 ||
				userData.telNo.length !== 10 ||
				userData.address.length === 0
			) {
				alert("กรุณาใส่ข้อมูล ชื่อ ที่อยู่ เบอร์โทร");
				this.$router.push("profile");
			}
			let product = this.cartItem[index];
			let formData = {
				userId: userData.id,
				status: "Pending",
				address: userData.address,
				trackingNumber: "",
				detail: {
					product: [
						{
							productId: product.id,
							name: product.name,
							price: product.price,
							quantity: product.quantity,
							option: product.option,
							image: [...product.image],
						},
					],

					totalPrice: Number(product.totalPrice.toFixed(2)),
				},
				userDetail: {
					name: userData.name,
					email: userData.email,
					telNo: userData.telNo,
				},
			};
			this.deleteCart = index;
			this.$store.dispatch("sendOrder", formData);
		},
		checkOutAll(index) {
			let userData = this.$store.getters.authorizedUser;
			if (!this.$store.getters.isAuthenticated) {
				alert("กรุณาล๊อกอิน");
				this.$router.push("login");
			} else if (
				userData.name.length === 0 ||
				userData.telNo.length !== 10 ||
				userData.address.length === 0
			) {
				alert("กรุณาใส่ข้อมูล ชื่อ ที่อยู่ เบอร์โทร");
				this.$router.push("profile");
			}
			let product = this.cartItem[index];
			let formData = {
				userId: userData.id,
				status: "Pending",
				address: userData.address,
				trackingNumber: "",
				detail: {
					product: this.cartItem.map((item) => {
						return {
							productId: item.id,
							name: item.name,
							price: item.price,
							quantity: item.quantity,
							option: item.option,
							image: [...item.image]
						};
					}),
					totalPrice: 0,
				},
				userDetail: {
					name: userData.name,
					email: userData.email,
					telNo: userData.telNo,
				},
			};
			let b = this.cartItem.map((item) => {
				let price = item.totalPrice;
				return price;
			});
			formData.detail.totalPrice = Number(
				b
					.reduce((a, b) => {
						return a + b;
					}, 0)
					.toFixed(2)
			);
			this.deleteCart = -1;
			this.$store.dispatch("sendOrder", formData);
		},
		onMarkAsPaid() {
			let id = this.paymentSlip.id;
			let status = "Paid";
			let paymentId = this.paymentSlip.payment.id;
			this.$store.dispatch("updateOrder", {
				id: id,
				status: status,
				paymentId: paymentId,
				deletedIndex: this.deleteCart,
			});
			this.$store.dispatch("removePayment");
			this.paymentSlip = null;
		},
		onCancel() {
			let id = this.paymentSlip.id;
			let status = "Cancelled";
			this.$store.dispatch("updateOrder", {
				id: id,
				status: status,
				deletedIndex: this.deleteCart,
			});
			this.$store.dispatch("removePayment");
			this.paymentSlip = null;
		},
	},
	computed: {
		carts() {
			if (this.cartItem.length === 0) {
				let data = this.$store.getters.carts;
				data = data.map((item) => {
					return {
						...item,
						priceAddedPerUnit: item.totalPrice / item.quantity,
					};
				});
				this.cartItem = data;
			}

			return this.$store.getters.carts;
		},

		payment() {
			let payment = this.$store.getters.payment;
			if (this.paymentSlip === null && payment) {
				this.paymentSlip = payment;
				this.dialog = true;
			}
			if (this.paymentSlip === null) {
				this.dialog = false;
			}

			return this.$store.getters.payment;
		},

		// price() {
		// 	let addedPrice = 0;
		// 	this.productOption.productOption.map((option) => {
		// 		addedPrice += option.option_price_added;
		// 	});
		// 	// Price = (BasePrice + AddedPrice) * Quantity
		// 	this.computedPrice =
		// 		(this.productOption.productPrice + addedPrice) * this.quantity;
		// 	return (
		// 		(this.productOption.productPrice + addedPrice) * this.quantity
		// 	);
		// },
	},
};
</script>
