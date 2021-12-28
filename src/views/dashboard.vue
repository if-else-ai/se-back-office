<template>
	<v-container
		class="page-container d-flex flex-column justify-center align-center"
	>
		<h1 class="my-6">Dashboard</h1>
		<v-menu
			ref="menu"
			v-model="menu"
			:close-on-content-click="false"
			transition="scale-transition"
			offset-y
			min-width="auto"
		>
			<template v-slot:activator="{ on, attrs }">
				<v-text-field
					class="align-self-start"
					v-model="dateRangeText"
					label="ค้นหา Order"
					prepend-icon="mdi-calendar"
					readonly
					v-bind="attrs"
					v-on="on"
				></v-text-field>
			</template>
			<v-date-picker v-model="dates" @change="getOrderRange" range>
			</v-date-picker>
		</v-menu>

		<!-- Get Report Button -->
		<div class="add-product__button my-4 align-self-start" v-if="requestedOrder.length > 0">
			<v-btn color="green white--text"  @click="downloadPDF">
				Get Report
			</v-btn>
		</div>

		<!-- Popular Card -->
		<v-card
			class="align-self-start d-flex flex-column"
			v-if="popularProduct"
			outlined
		>
			<v-card-title>
				<v-icon class="mr-2" color="black">mdi-star</v-icon> Most
				Popular Product: {{ popularProduct.name }}
			</v-card-title>

			<v-divider class="mb-2" />
			<v-img
				class="align-self-center mx-2 mb-2"
				width="300"
				height="200"
				:src="popularProduct.image[0]"
			/>
			<v-divider class="mb-2" />
			<strong class="pl-4 pb-2">
				Sold Quantity : {{ popularProductBuyQuantity }} Unit <br />
				Total: {{ popularTotalPriceSold.toFixed(2) }} ฿
			</strong>
		</v-card>

		<!-- Product Summary -->
		<h2 class="align-self-start mt-4" v-if="summaryProduct.length > 0">
			Product Summary
		</h2>
		<v-card class="my-4" width="1200" v-if="summaryProduct.length > 0">
			<v-card-title>
				<v-text-field
					v-model="search2"
					append-icon="mdi-magnify"
					label="Search product id, name, etc."
					single-line
					hide-details
				></v-text-field>
			</v-card-title>
			<v-data-table
				:headers="sumProductHeader"
				:items="summaryProduct"
				:items-per-page="20"
				:search="search"
				class="elevation-1"
			>
			</v-data-table>
		</v-card>

		<!-- If Order Not Found -->
		<v-card v-else class="align-self-start" flat>
			<h2>Order Not Found</h2>
		</v-card>

		<!-- Order Summary -->
		<h2 class="align-self-start mt-4" v-if="requestedOrder.length > 0">Order Summary</h2>
		<v-card
			class="order-detail__sum d-flex my-4"
			flat
			width="1200"
			v-if="requestedOrder.length > 0"
		>
			<h2 class="align-self-start">
				Income: {{ totalIncome.toFixed(2) }} ฿
			</h2>
			<h2 class="align-self-start ml-4">TotalOrder: {{ totalOrders }}</h2>
		</v-card>

		<v-card width="1200" v-if="requestedOrder.length > 0">
			<v-card-title>
				<v-text-field
					v-model="search"
					append-icon="mdi-magnify"
					label="Search order id, date, name, etc."
					single-line
					hide-details
				></v-text-field>
			</v-card-title>
			<v-data-table
				:headers="sumOrderHeader"
				:items="requestedOrder"
				:items-per-page="20"
				:search="search"
				class="elevation-1"
			>
				<template v-slot:item.status="{ item }">
					<v-chip color="green darken-4" dark>
						{{ item.status }}
					</v-chip>
				</template>
			</v-data-table>
		</v-card>
	</v-container>
</template>

<script>
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
	data() {
		return {
			dates: ["2021-12-10", "2021-12-31"],
			startDate: null,
			endDate: null,
			menu: false,
			search: "",
			search2: "",

			sumOrderHeader: [
				{ text: "Order ID", value: "id" },
				{ text: "Product", value: "product" },
				{ text: "Total Order Price", value: "totalPrice" },
				{ text: "Order Date", value: "createDate" },
				// { text: "TrackingNumber", value: "trackingNumber" },
				// { text: "Actions", value: "actions", sortable: false },
			],

			sumProductHeader: [
				{ text: "Product ID", value: "productId" },
				{ text: "Name", value: "productName" },
				{ text: "Price", value: "price" },
				{ text: "Sold", value: "sold" },
				{ text: "Total Price", value: "totalPrice" },
				// { text: "TrackingNumber", value: "trackingNumber" },
				// { text: "Actions", value: "actions", sortable: false },
			],

			totalOrder: 0,
			totalIncome: 0,
			popularProductBuyQuantity: 0,
			popularTotalPriceSold: 0,
		};
	},

	created() {
		this.$store.dispatch("getOrderRange", this.dates);
	},

	methods: {
		getOrderRange() {
			this.$store.dispatch("getOrderRange", this.dates);
		},

		getDate(text) {
			let date = text.substring(0, 10);
			let time = text.substring(11, 19);
			return `${date} ${time}`;
		},

		downloadPDF() {
			let doc = new jsPDF();

			let sumProductHeader = this.sumProductHeader.map((item) => {
				return item.text;
			});
			let sumOrderHeader = this.sumOrderHeader.map((item) => {
				return item.text;
			});

			let productData = this.summaryProduct;
			let productId = productData.map((item) => {
				return item.productId;
			});
			let name = productData.map((item) => {
				return item.productName;
			});
			let price = productData.map((item) => {
				return item.price;
			});
			let sold = productData.map((item) => {
				return item.sold;
			});
			let totalPrice = productData.map((item) => {
				return item.totalPrice;
			});

			let orderData = this.requestedOrder;

			let orderId = orderData.map((item) => {
				return item.id;
			});

			let totalOrderPrice = orderData.map((item) => {
				return item.totalPrice
			})
			let product = orderData.map((item) => {
				return item.product;
			});
			let orderDate = orderData.map((item) => {
				return item.createDate;
			});

			let sumProductData = [];

			productId.forEach((item, index) => {
				sumProductData.push([
					item,
					name[index],
					price[index].slice(0, price[index].length - 1),
					sold[index],
					totalPrice[index].slice(0, totalPrice[index].length - 1),
				]);
			});



			let sumOrderData = [];
			orderId.forEach((item, index) => {
				sumOrderData.push([
					item,
					product[index],
					totalOrderPrice[index].slice(0, totalOrderPrice[index].length - 1),
					orderDate[index],
				]);
			});

			var finalY = doc.lastAutoTable.finalY || 10
			doc.setFontSize(18)
 			doc.text('Order Report', 90, finalY)

			finalY += 10
			doc.setFontSize(16)
 			doc.text('Product Summary', 14, finalY)
			doc.setFontSize(12)
			finalY += 10
 			doc.text(`Most Popular Product : ${this.popularProduct.name}`, 14, finalY)
			finalY += 5
 			doc.text(`Sold Quantity : ${this.popularProductBuyQuantity} Unit`, 14, finalY)
			finalY += 5
 			doc.text(`Total Price : ${this.popularTotalPriceSold} Baht`, 14, finalY)
			finalY += 5
			doc.autoTable({
				startY: finalY,
				head: [[...sumProductHeader]],
				body: [...sumProductData],
			});

			finalY = doc.lastAutoTable.finalY

			doc.setFontSize(16)
			finalY += 10
 			doc.text('Order Summary', 14, finalY)
			doc.setFontSize(12)
			finalY += 10
			doc.text(`Total Income : ${this.totalIncome} Baht`, 14, finalY)
			finalY += 5
			doc.text(`Total Order : ${this.totalOrders}`, 14, finalY)
			finalY += 5
			doc.autoTable({
				startY: finalY,
				head: [[...sumOrderHeader]],
				body: [...sumOrderData],
			});

			doc.save("summary.pdf");
		},

		getProductName(products) {
			products = products.map((product) => {
				return product.name;
			});

			return products.join(", ");
		},
	},

	computed: {
		dateRangeText() {
			return this.dates.join(" ~ ");
		},

		summaryProduct() {
			let requestOrder = this.$store.getters.requestedOrder;
			if (requestOrder.orders) {
				let product = requestOrder.orders.map((item) => {
					return {
						product: item.detail.product,
						totalPrice: item.detail.totalPrice,
					};
				});

				let productName = [];
				let productCount = [];
				let productMapId = [];
				let productMapPrice = [];
				product.forEach((item) => {
					item.product.forEach((product) => {
						if (productName.indexOf(product.name) !== -1) {
							productCount[productName.indexOf(product.name)] +=
								product.quantity;
						} else {
							productCount[productName.length] = product.quantity;
							productName.push(product.name);
							productMapId.push(product.productId);
							productMapPrice.push(product.price);
						}
					});
				});

				let sumProduct = productName.map((product, index) => {
					return {
						productName: product,
						price: `${productMapPrice[index]} ฿`,
						productId: productMapId[index],
						sold: productCount[index],
						totalPrice: `${(
							productCount[index] * productMapPrice[index]
						).toFixed(2)} ฿`,
					};
				});
				return sumProduct;
			} else {
				return [];
			}
		},

		popularProduct() {
			// find popular Product
			let requestOrder = this.$store.getters.requestedOrder;
			if (requestOrder.orders) {
				let product = requestOrder.orders.map((item) => {
					return {
						product: item.detail.product,
						totalPrice: item.detail.totalPrice,
					};
				});
				let allProduct = [];
				let productId = [];
				product.forEach((item) => {
					item.product.forEach((product) => {
						if (productId.indexOf(product.productId) === -1) {
							productId.push(product.productId);
							allProduct.push(product);
						}
					});
				});
				// console.log(productId)
				// Count Product
				let productName = [];
				let productCount = [];
				product.forEach((item) => {
					item.product.forEach((product) => {
						if (productName.indexOf(product.name) !== -1) {
							productCount[productName.indexOf(product.name)] +=
								product.quantity;
						} else {
							productCount[productName.length] = product.quantity;
							productName.push(product.name);
						}
					});
				});
				let highestBuy = Math.max(...productCount);
				let buyIndex = productCount.indexOf(highestBuy);
				let popularProductName = productName[buyIndex];

				let productObject = allProduct.find(
					(product) => (product.name = popularProductName)
				);

				this.popularProductBuyQuantity = highestBuy;
				this.popularTotalPriceSold = highestBuy * productObject.price;
				return productObject;
			} else {
				return null;
			}
		},

		requestedOrder() {
			let data = this.$store.getters.requestedOrder;
			this.totalOrders = data.totalOrders;
			this.totalIncome = data.totalPrice;
			if (data.orders) {
				data = data.orders.map((item) => {
					console.log(item);
					return {
						id: item.id,
						status: item.status,
						userName: item.userDetail.name,
						userEmail: item.userDetail.email,
						createDate: this.getDate(item.createDate),
						trackingNumber: item.trackingNumber,
						shipStatus: item.shipStatus,
						product: this.getProductName(item.detail.product),
						totalPrice: `${item.detail.totalPrice} ฿`,
					};
				});
			}
			console.log(data);

			return data;
		},
	},
};
</script>

<style scoped>
.order-detail__sum h2 {
	font-weight: 500;
}
.page-container {
	padding: 0 300px;
}
</style>
