<template>
	<v-container
		class="page-container d-flex flex-column justify-center align-center"
	>
		<h1 class="my-6">Order</h1>
		
		<!-- Edit / Update Order Dialog -->
		<v-dialog v-model="updateOrderDialog" width="600">
			<v-card v-if="updateOrderData">
				<v-toolbar dark color="primary">
					<v-toolbar-title>Update Order </v-toolbar-title>
				</v-toolbar>
				<v-form class="d-flex flex-column pa-4">
					<div class="form__input d-flex align-center justify-center">
						<h4>Order ID</h4>
						<v-text-field
							label="name"
							hint="Keychron Q1"
							v-model="updateOrderData.id"
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
					<div v-if="selectedStatus === 'Shipping' && selectedShipStatus === 'Init'" class="form__input d-flex align-center justify-center">
						<h4>Tracking Number</h4>
						<v-text-field
							label="Tracking NO."
							v-model="trackingNumber"
						>
						</v-text-field>
					</div>
					<div v-if="selectedStatus === 'Shipping'" class="form__input d-flex align-center justify-center">
						<h4>Shipping Status</h4>
						<v-combobox
							label="ShipStatus"
							v-model="selectedShipStatus"
							:items="shipStatus"
							:disabled="isNotInit"
						>
						</v-combobox>
					</div>
					<v-btn class="green white--text" @click="updateOrder">
						Update
					</v-btn>
				</v-form>
			</v-card>
		</v-dialog>

		<!-- Delete Order Dialog -->
		<v-dialog v-if="currentOrder" v-model="deleteOrderDialog" max-width="600">
			<v-card class="">
				<v-toolbar dark color="error">
					<v-toolbar-title>Remove Order </v-toolbar-title>
				</v-toolbar>
				<h3 class="ma-4 text-center">
					Are you sure you want to delete {{ currentOrder.id }} ?
				</h3>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						color="error"
						raised
						@click="deleteOrderDialog = false"
					>
						No
					</v-btn>
					<v-btn
						color="success"
						raised
						@click="
							deleteOrder();
							deleteOrderDialog = false;
						"
					>
						Yes
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<v-card flat min-width="1400" height="800">
			<v-card-title>
				<v-text-field
					v-model="search"
					append-icon="mdi-magnify"
					label="Search order, name, email, etc."
					single-line
					hide-details
				></v-text-field>
			</v-card-title>
			<v-data-table
				:headers="headers"
				:items="order"
				:items-per-page="10"
				:search="search"
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
							updateOrderDialog = true;
							onUpdateOrder(item);
						"
						class="mx-2"
					>
						<v-icon small class="mr-2">
							mdi-pencil
						</v-icon>
						Update
					</v-btn>

					<v-icon
						small
						@click="
							onDeleteItem(item);
							deleteOrderDialog = !deleteOrderDialog;
						"
					>
						mdi-delete
					</v-icon>

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
			{ text: "Order Date", value: "createDate" },
			{ text: "TrackingNumber", value: "trackingNumber" },
			{ text: "Actions", value: "actions", sortable: false },
		],
		search: "",
		updateOrderDialog: false,
		updateOrderData: {},
		orderStatus: ["Paid", "Shipping", "Completed", "Cancelled"],
		shipStatus: ["Init", "Sended", "Shipping", "Completed"],
		selectedStatus: "",
		trackingNumber: "",
		deleteOrderDialog: false,
		isNotInit: null,
		currentOrder: null,
		selectedShipStatus: '',
	}),


	methods: {
		onUpdateOrder(item) {
			this.updateOrderData = item;

			switch(this.updateOrderData.status){
				case 'Paid':
					this.orderStatus =  ["Shipping", "Completed", "Cancelled"]
				break;
				case 'Shipping':
					this.orderStatus =  ["Shipping", "Completed", "Cancelled"]
				break;
				case 'Paid':
					this.orderStatus =  ["Shipping"]
				break;
				case 'Completed':
					this.orderStatus =  ["Completed"]
				break;
				default:
			}

			switch(this.updateOrderData.shipStatus){
				case 'Init':
					this.shipStatus =  ["Sended", "Shipping", "Completed"]
				break;
				case 'Sended':
					this.shipStatus =  ["Shipping", "Completed"]
				break;
				case 'Shipping':
					this.shipStatus =  ["Completed"]
				break;
				case 'Completed':
					this.shipStatus =  ["Completed"]
				break;
				default:
			}

			if(this.updateOrderData.status === 'Shipping' || this.updateOrderData.status === 'Paid'){
				this.selectedStatus = 'Shipping'
			} else {
				this.selectedStatus = this.updateOrderData.status
			}

			if(this.updateOrderData.shipStatus === ''){
				console.log('not Init')
				this.isNotInit = true
				this.selectedShipStatus = 'Init'
			} else {
				this.isNotInit = false
			}
			console.log(1,this.updateOrderData)
			this.trackingNumber = this.updateOrderData.trackingNumber
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

		getDate(text) {
			let date = text.substring(0, 10);
			let time = text.substring(11, 19);
			return `${date} ${time}`;
		},

		onDeleteItem(item) {
			let orderId = item.id
			this.currentOrder = item
			console.log(orderId)
		},
		updateOrder() {
			let formData = {
				id: this.updateOrderData.id,
				status: this.selectedStatus,
				shipStatus: this.selectedShipStatus
			};

			

			if (formData.status === "Shipping") {
				console.log(this.trackingNumber)
				if(this.trackingNumber === "" && this.updateOrderData.shipStatus === ''){
					alert("Require Tracking Number")
					return
				}
				formData.trackingNumber = this.trackingNumber;
			}

			if (formData.status === "Completed" || formData.shipStatus === "Completed") {
				formData.shipStatus = 'Completed'
				formData.status = 'Completed'
			}

			

			console.log(formData)
			this.$store.dispatch("updateOrder", formData);
			this.trackingNumber = ''
			this.updateOrderDialog = false
		},

		deleteOrder() {
			this.$store.dispatch('deleteOrder', this.currentOrder.id)
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
					createDate: `${this.getDate(data.createDate)}`,
					trackingNumber: data.trackingNumber,
					shipStatus: data.shipStatus
				};
			});
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
