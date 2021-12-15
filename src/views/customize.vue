<template>
	<v-container class="shopping__container">
		<v-divider class="mb-4"></v-divider>
		<div class="product-container pt-4">
			<v-card outlined class="mr-4" width="800" height="600">
				<v-tabs
					v-model="selectedTab"
					class="tabs__container"
					centered
					fixed-tabs
					@change="onChangeTab(selectedTab)"
				>
					<v-tab v-for="(tab, index) in tabsItem" :key="index">
						{{ tab }}
					</v-tab>
				</v-tabs>
				<ProductImage
					v-if="selectedTab === 0 && selectedKeyboard"
					:images="selectedKeyboard.detail.imageList"
					:currentImage="currentImage"
					@setImage="currentImage = $event"
					@setImageSet="selectedKeyboard.detail.imageList = $event"
				/>
				<ProductImage
					v-if="selectedTab === 1 && selectedSwitch"
					:images="selectedSwitch.detail.imageList"
					:currentImage="currentImage"
					@setImage="currentImage = $event"
					@setImageSet="selectedSwitch.detail.imageList = $event"
				/>
				<ProductImage
					v-if="selectedTab === 2 && selectedKeycap"
					:images="selectedKeycap.detail.imageList"
					:currentImage="currentImage"
					@setImage="currentImage = $event"
					@setImageSet="selectedKeycap.detail.imageList = $event"
				/>
				<v-card
					class="blank-customize__container"
					v-if="
						!selectedKeyboard && !selectedSwitch && !selectedKeycap
					"
				>
					<v-card>
						<v-img
							src="https://i.pinimg.com/originals/8a/70/f6/8a70f68a486e0f125e8ff176757c2194.png"
						>
						</v-img>
					</v-card>
				</v-card>
			</v-card>
			<v-card
				class="product__detail pa-4"
				width="800"
				min-height="600"
				outlined
				elevation="1"
			>
				<v-card-title class="product__name">
					<h2>Customize</h2></v-card-title
				>
				<v-card-subtitle class="product__price">
					<h2>$ {{ price.toFixed(2) }}</h2>
				</v-card-subtitle>

				<div class="custom-input__container">
					<div>เลือก Keyboard:</div>
					<v-autocomplete
						:items="keyboardList"
						label="Keyboard"
						prepend-icon="mdi-magnify"
						return-object
						autofocus
						v-model="selectedKeyboard"
					>
					</v-autocomplete>
					<div v-if="selectedKeyboard" class="option__price">
						{{ `${selectedKeyboard.detail.price} $` }}
					</div>
				</div>

				<v-divider class="custom-input__bar"></v-divider>

				<div class="custom-input__container">
					<div>เลือก Switch:</div>
					<v-autocomplete
						:items="switchList"
						label="Switch"
						prepend-icon="mdi-magnify"
						return-object
						v-model="selectedSwitch"
					>
					</v-autocomplete>
					<div v-if="selectedSwitch" class="option__price">
						{{ `${selectedSwitch.detail.price * 80} $` }}
					</div>
				</div>

				<div class="custom-input__container">
					<div>เลือก Keycap:</div>
					<v-autocomplete
						:items="keycapList"
						label="Keycap"
						prepend-icon="mdi-magnify"
						return-object
						v-model="selectedKeycap"
					>
					</v-autocomplete>
					<div v-if="selectedKeycap" class="option__price">
						{{ `${selectedKeycap.detail.price} $` }}
					</div>
				</div>

				<div class="product__add mt-3">
					<v-card class="mr-4" flat> Quantity </v-card>
					<v-btn icon @click="decrement">
						<v-icon>mdi-minus</v-icon>
					</v-btn>
					<input
						class="quantity-input"
						type="text"
						v-model="quantity"
					/>
					<v-btn icon @click="increment">
						<v-icon>mdi-plus</v-icon>
					</v-btn>
					<div class="green--text">
						{{ quantityValidationText }}
					</div>
				</div>

				<v-btn
					class="product__button mb-4 mt-4"
					block
					outlined
					@click="addToCart"
				>
					เพิ่มลงตะกร้า
				</v-btn>
			</v-card>
		</div>
	</v-container>
</template>

<style src="./style.css"></style>

<script>
import ProductImage from "@/components/product-image.vue";

export default {
	components: { ProductImage },
	data: () => ({
		// images: [
		// 	{
		// 		src: "https://i.ytimg.com/vi/aQWH0ysGXy8/maxresdefault.jpg",
		// 		active: true,
		// 	},
		// 	{ src: "https://i.imgur.com/YazpFQt.jpg", active: false },
		// ],
		currentImage: "",
		tabsItem: ["Model", "Switch", "Keycap"],
		selectedTab: 0,
		quantity: 1,
		selectedKeyboard: "",
		selectedSwitch: "",
		selectedKeycap: "",
		computedPrice: 0,
	}),

	created() {
		// this.$store.dispatch("getProduct", {
		// 	productID: this.$route.query.productID,
		// });
	},

	methods: {
		// add product
		increment() {
			this.quantity += 1;
		},
		// decrease product
		decrement() {
			if (this.quantity > 1) {
				this.quantity -= 1;
			}
		},

		// add to cart
		addToCart() {
			let keyboard = this.selectedKeyboard.detail
				? this.selectedKeyboard.detail
				: null;
			let switches = this.selectedSwitch.detail
				? this.selectedSwitch.detail
				: null;
			let keycap = this.selectedKeycap.detail
				? this.selectedKeycap.detail
				: null;

			let formData;
			if (keyboard) {
				formData = {
					id: keyboard.id,
					name: keyboard.name,
					category: "Customize",
					quantity: this.quantity,
					price: keyboard.price,
					option: [],
					totalPrice: this.computedPrice,
					image: keyboard.image,
				};
				if (keycap) {
					let keycapObject = {
						name: keycap.category,
						select: keycap.name,
						priceAdded: keycap.price,
					};
					formData.option.push(keycapObject);
				}
				if (switches) {
					let switchObject = {
						name: switches.category,
						select: switches.name + " * 80",
						priceAdded: switches.price,
					};
					formData.option.push(switchObject);
				}
			}

			this.$store.dispatch("addCart", formData);
		},

		onChangeTab(tab) {
			switch (tab) {
				case 0:
					this.selectedKeyboard
						? (this.currentImage = this.selectedKeyboard.detail.image[0])
						: null;
					break;
				case 1:
					this.selectedSwitch
						? (this.currentImage = this.selectedSwitch.detail.image[0])
						: null;
					break;
				case 2:
					this.selectedKeycap
						? (this.currentImage = this.selectedKeycap.detail.image[0])
						: null;
					break;
				default:
			}
		},
	},

	computed: {
		quantityValidationText() {
			if (
				this.quantity > (this.selectedKeyboard ? this.selectedKeyboard.detail.quantity : 999 ) ||
				this.quantity > (this.selectedKeycap ? this.selectedKeycap.detail.quantity : 999 ) ||
				this.quantity > (this.selectedSwitch ? this.selectedSwitch.detail.quantity : 999 )
			) {
				this.quantity =
					Math.min[
					   (this.selectedKeyboard ? this.selectedKeyboard.detail.quantity : 999,
						this.selectedKeycap ? this.selectedKeycap.detail.quantity : 999,
						this.selectedSwitch ? this.selectedSwitch.detail.quantity : 999)
					];
					if(!this.quantity){
						this.quantity = 1
					}
					return 'quanity exceeded'
			}
			return "";
		},

		price() {
			let price = 0;
			let keyboardPrice = 0;
			let keycapPrice = 0;
			let switchPrice = 0;

			if (this.selectedKeyboard) {
				keyboardPrice = this.selectedKeyboard.detail.price;
				this.selectedKeyboard.detail.imageList = this.selectedKeyboard.detail.image.map(
					(product, index) => {
						return {
							src: product,
							active: index === 0 ? true : false,
						};
					}
				);
				this.currentImage = this.selectedKeyboard.detail.image[0];
				this.selectedTab = 0;
			}

			if (this.selectedSwitch) {
				switchPrice = this.selectedSwitch.detail.price;
				this.selectedSwitch.detail.imageList = this.selectedSwitch.detail.image.map(
					(product, index) => {
						return {
							src: product,
							active: index === 0 ? true : false,
						};
					}
				);
				this.currentImage = this.selectedSwitch.detail.image[0];
				this.selectedTab = 1;
			}

			if (this.selectedKeycap) {
				keycapPrice = this.selectedKeycap.detail.price;
				this.selectedKeycap.detail.imageList = this.selectedKeycap.detail.image.map(
					(product, index) => {
						return {
							src: product,
							active: index === 0 ? true : false,
						};
					}
				);
				this.currentImage = this.selectedKeycap.detail.image[0];
				this.selectedTab = 2;
			}
			console.log(this.selectedSwitch);

			price =
				(keyboardPrice + switchPrice * 80 + keycapPrice) *
				this.quantity;
			this.computedPrice = price;
			return price;
		},

		product() {
			// Initialize Product
			if (this.productOption.length === 0) {
				let product = this.$store.getters.product;
				this.tempProduct = this.$store.getters.product;
				this.productOption = {
					productID: product.productID,
					name: "Keychron K8",
					productPrice: product.pr,
					productOption: product.option.map((option) => {
						return {
							name: option.name,
							select: option.list[0],
							priceAdded: option.priceAdded[0],
						};
					}),
				};
			}

			return this.$store.getters.product;
		},

		keyboardList() {
			let products = this.$store.getters.products;
			let keyboardList = products.filter(
				(product) => product.category === "Keyboard"
			);
			keyboardList = keyboardList.map((product) => {
				return {
					text: product.name,
					detail: product,
				};
			});
			return keyboardList;
		},

		switchList() {
			let products = this.$store.getters.products;
			let switchList = products.filter(
				(product) => product.category === "Switch"
			);
			switchList = switchList.map((product) => {
				return {
					text: product.name,
					detail: product,
				};
			});

			return switchList;
		},

		keycapList() {
			let products = this.$store.getters.products;
			let keycapList = products.filter(
				(product) => product.category === "Keycap"
			);
			keycapList = keycapList.map((product) => {
				return {
					text: product.name,
					detail: product,
				};
			});

			return keycapList;
		},
	},
};
</script>

<style scoped>
.option__price {
	color: rgb(0, 141, 35);
}

.blank-customize__container {
	display: flex;
	align-items: center;
	justify-content: center;
}

.blank-title {
	margin: auto;
}

.custom-input__container {
	display: flex;
	flex-direction: row;
	align-items: center;
}

.custom-input__container > div {
	margin-right: 2rem;
}

.active {
	border: 1px solid black;
	transition: all 0.4s;
}

.product__add {
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 200px;
}

.quantity-input {
	width: 40px;
	height: 40px;
	border: 1px solid black;
	border-radius: 4px;
	text-align: center;
}

.number-input {
	border: 1px solid black;
}

.product__main-image {
	border-right: none;
	border-top: none;
	border-bottom: none;
	overflow: hidden;
	flex-grow: 1;
}

.shopping__container {
	padding-top: 0;
	padding: 0;
}

.v-btn-toggle:not(.v-btn-toggle--dense) .v-btn.v-btn.v-size--default {
	height: 40px;
	margin: 0 2px;
	border: 1px solid black;
}

.product-small-image {
	cursor: pointer;
}

.product__selection {
	margin-left: 16px;
}

.product__button.v-btn--block {
	margin-top: auto !important;
	align-self: center;
	bottom: 0;
	display: flex;
	flex: none;
	height: 48px;
	min-width: 80% !important;
	max-width: 80%;
}

/* .theme--light.v-btn--active:hover::before, .theme--light.v-btn--active::before {
	opacity: 1;
} */

.button--active {
	background-color: rgb(255, 172, 77);
}

.product__price > h2 {
	font-family: Helvetica;
	margin-top: 1rem;
	color: rgb(0, 141, 35);
}
.product__option {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	margin: 12px 0;
}

.product__choice {
	padding: 0.5rem;
	margin-right: 16px;
}
.product__choice button.product__choice-button {
	height: 32px;
}

.product__images {
	display: flex;
	flex-direction: row;
}

.product__images img {
	max-width: 100%;
	max-height: 100%;
}
.product__sub-image {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.sub-image__container {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.product-container {
	display: flex;
	margin-bottom: 100px;
	flex-direction: columns;
	justify-content: center;
	align-items: flex-start;
}

.product__detail {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
}

.product__item {
	color: rgb(247, 247, 247);
	cursor: pointer;
}

.product__item:hover {
	color: black;
}

.category__items > .category__item {
	padding: 0;
}

.category__items {
	display: flex;
	flex-direction: column;
	justify-items: flex-start;
	padding-top: 0.2rem;
}
</style>
