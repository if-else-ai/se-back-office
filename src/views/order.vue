<template>
	<v-container
		class="page-container d-flex flex-column justify-center align-center"
	>
		<h1 class="my-6">Order</h1>

		<v-dialog v-model="editOrderDialog" width="600">
			<v-card v-if="orderData">
				<v-toolbar dark color="primary">
					<v-toolbar-title>Update Order </v-toolbar-title>
				</v-toolbar>
				<v-form class="d-flex flex-column pa-4">
					<div class="form__input d-flex align-center justify-center">
						<h4>Order ID</h4>
						<v-text-field
							label="name"
							hint="Keychron Q1"
							v-model="orderData.id"
						>
						</v-text-field>
					</div>
					<div class="form__input d-flex align-center justify-center">
						<h4>Status</h4>
						<v-combobox
							label="Status"
							:items="orderStatus"
							v-model="selectedStatus"
						>
						</v-combobox>
					</div>
					<div v-if="selectedStatus === 'Shipping'" class="form__input d-flex align-center justify-center">
						<h4>Tracking Number</h4>
						<v-text-field
							label="Tracking NO."
							v-model="orderData.trackingNumber"
						>
						</v-text-field>
					</div>
					<v-btn class="green white--text" @click="updateOrder">
						Update
					</v-btn>
				</v-form>
			</v-card>
		</v-dialog>

		<v-card flat min-width="1400" height="800">
			<v-data-table
				:headers="headers"
				:items="order"
				:items-per-page="10"
				class="elevation-1"
			>
				<template v-slot:item.status="{ item }">
					<v-chip :color="getOrderStatusColor(item.status)" dark>
						{{
							item.status
						}}
					</v-chip>
				</template>
				<template v-slot:item.trackingNumber="{ item }">
					<v-chip :color="getTrackingColor(item.trackingNumber)" dark>
						{{
							item.trackingNumber
								? item.trackingNumber
								: "No Tracking Number"
						}}
					</v-chip>
				</template>

				<template v-slot:item.actions="{ item }">
					<v-btn
						depressed
						@click="
							editOrderDialog = true;
							onEditOrder(item);
						"
						class="mx-2"
					>
						<v-icon small class="mr-2">
							mdi-pencil
						</v-icon>
						Update
					</v-btn>
				</template>
			</v-data-table>
		</v-card>
	</v-container>
</template>

<script>
export default {
	data: () => ({
		headers: [
			{ text: "Order ID", value: "id" },
			{ text: "Status", value: "status" },
			{ text: "Name", value: "userName" },
			{ text: "Email", value: "userEmail" },
			{ text: "TrackingNumber", value: "trackingNumber" },
			{ text: "Actions", value: "actions", sortable: false },
		],
		editOrderDialog: false,
		orderData: {},
		orderStatus: ["Paid", "Shipping", "Completed", "Cancelled"],
		selectedStatus: "",
		trackingNumber: "",
	}),

	methods: {
		onEditOrder(item) {
			this.orderData = item;
		},

		getTrackingColor(TrackingNumber) {
			if (TrackingNumber) {
				return "green";
			} else {
				return "yellow darken-4";
			}
		},
		getOrderStatusColor(status) {
			switch (status) {
				case 'Shipping':
					return 'blue darken-4'
				case 'Cancelled':
					return 'red'
				case 'Paid':
					return 'yellow darken-4'
				case 'Pending':
					return 'purple darken-4'
				case 'Completed':
					return 'green darken-4'
				default: 
				return 'black'
			}
		},

		onDeleteItem() {},
		updateOrder() {
			let formData = {
				id: this.orderData.id,
				status: this.selectedStatus,
			};
			if (formData.status === "Shipping") {
				formData.trackingNumber = this.trackingNumber;
			}

			this.$store.dispatch("updateOrder", formData);
		},
	},

	computed: {
		order() {
			let data = this.$store.getters.order;
			data = data.map((data) => {
				return {
					id: data.id,
					status: data.status,
					userName: data.userDetail.name,
					userEmail: data.userDetail.email,
					trackingNumber: data.trackingNumber,
				};
			});
			console.log(data);
			return data;
		},
	},
};
</script>

<style scoped>
.page-container {
	padding: 0 400px;
}
.form__input h4 {
	margin-right: 16px;
}
</style>
