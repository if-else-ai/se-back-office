<template>
	<v-container
		class="page-container d-flex flex-column justify-center align-center"
	>
		<h1 class="my-6">Dashboard</h1>
		<v-menu
			ref="menu"
			v-model="menu"
			:close-on-content-click="false"
			:return-value.sync="dates"
			transition="scale-transition"
			offset-y
			min-width="auto"
		>
			<template v-slot:activator="{ on, attrs }">
				<v-text-field
					class="align-self-start"
					v-model="dateRangeText"
					label="Order Data Range"
					prepend-icon="mdi-calendar"
					readonly
					v-bind="attrs"
					v-on="on"
				></v-text-field>
			</template>
			<v-date-picker v-model="dates" @change="getOrderRange" range>
			</v-date-picker>
		</v-menu>

		<div class="add-product__button my-4 align-self-start">
			<v-btn color="green white--text">
				Get Report
			</v-btn>
		</div>

		<v-card class="d-flex  my-4" flat width="1200" v-if="requestedOrder">
			<h2 class="align-self-start">
				Income: {{ totalIncome.toFixed(2) }}
			</h2>
			<h2 class="align-self-start ml-4">
				TotalOrder: {{ totalOrders }}
			</h2>
		</v-card>

		<v-card width="1200" v-if="requestedOrder">
			<!-- <v-card-title>
				<v-text-field
					v-model="search"
					append-icon="mdi-magnify"
					label="Search id, email, name, etc."
					single-line
					hide-details
				></v-text-field>
			</v-card-title> -->
			<v-data-table
				:headers="headers"
				:items="requestedOrder"
				:items-per-page="20"
				:search="search"
				class="elevation-1"
			>
			</v-data-table>
		</v-card>

		

	</v-container>
</template>

<script>
export default {
	data() {
		return {
			dates: ["2021-12-10", "2021-12-31"],
			startDate: null,
			endDate: null,
			menu: false,
			search: "",

			headers: [
				{ text: "Order ID", value: "id" },
				{ text: "Status", value: "status" },
				{ text: "Name", value: "userName" },
				{ text: "Email", value: "userEmail" },
				{ text: "Order Date", value: "createDate" },
				// { text: "TrackingNumber", value: "trackingNumber" },
				// { text: "Actions", value: "actions", sortable: false },
			],

			totalOrder: 0,
			totalIncome: 0,
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
			console.log(text);
			let date = text.substring(0, 10);
			let time = text.substring(11, 19);
			return `${date} ${time}`;
		},
	},

	computed: {
		dateRangeText() {
			return this.dates.join(" ~ ");
		},

		requestedOrder() {
			let data = this.$store.getters.requestedOrder;
			console.log(data.orders);
			this.totalOrders = data.totalOrders
			this.totalIncome = data.totalPrice
			console.log(this.totalOrders)
			console.log(this.totalIncome)
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
					};
				});
			}

			return data;
		},
	},
};
</script>

<style scoped>
.page-container {
	padding: 0 300px;
}
</style>
