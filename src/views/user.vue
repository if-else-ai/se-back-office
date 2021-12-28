<template>
	<v-container
		class="page-container d-flex flex-column justify-center align-center"
	>
		<h1 class="my-6">User</h1>
		<!-- Edit User Dialog -->
		<v-dialog v-model="editUserDialog" max-width="700">
			<v-card v-if="editUserData" class="">
				<v-toolbar dark color="primary">
					<v-toolbar-title> Edit User </v-toolbar-title>
				</v-toolbar>
				<v-form class="d-flex flex-column pa-6">
					<div class="form__input d-flex align-center justify-center">
						<h4>Name</h4>
						<v-text-field label="Name" v-model="editUserData.name" >
						</v-text-field>
					</div>
					<div class="form__input d-flex align-center justify-center">
						<h4>Gender</h4>
						<v-combobox
							label="Category"
							v-model="editUserData.gender"
							:items="gender"
							
						>
						</v-combobox>
					</div>
					<div class="form__input d-flex align-center justify-center">
						<h4>Email</h4>
						<v-text-field
							label="email"
							v-model="editUserData.email"
							
						>
						</v-text-field>
					</div>
					<div class="form__input d-flex align-center justify-center">
						<h4>Date of Birth</h4>
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
									v-model="editUserData.dateOfBirth"
									label=""
									append-icon="mdi-calendar"
									readonly
									v-bind="attrs"
									v-on="on"
									
								></v-text-field>
							</template>
							<v-date-picker
								v-model="editUserData.dateOfBirth"
								:active-picker.sync="activePicker"
								:max="
									new Date(
										Date.now() -
											new Date().getTimezoneOffset() *
												60000
									)
										.toISOString()
										.substr(0, 10)
								"
								min="1950-01-01"
								@change="save"
							></v-date-picker>
						</v-menu>
					</div>
					<div class="form__input d-flex align-center justify-center">
						<h4>Tel</h4>
						<v-text-field
							label="Tel"
							hint="30"
							v-model="editUserData.telNo"
							
						>
						</v-text-field>
					</div>
					<v-btn class="green white--text" @click="updateUser">
						Update User
					</v-btn>
				</v-form>
			</v-card>
		</v-dialog>
		<!-- Delete User Dialog -->
		<v-dialog v-if="currentUser" v-model="deleteUserDialog" max-width="600">
			<v-card class="">
				<v-toolbar dark color="error">
					<v-toolbar-title>Remove User </v-toolbar-title>
				</v-toolbar>
				<h3 class="ma-4 text-center">
					Are you sure you want to delete {{ currentUser.name }} ?
				</h3>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						color="error"
						raised
						@click="deleteUserDialog = false"
					>
						No
					</v-btn>
					<v-btn
						color="success"
						raised
						@click="
							deleteUser();
							deleteUserDialog = false;
						"
					>
						Yes
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<v-card width="1200">
			<v-card-title>
				<v-text-field
					v-model="search"
					append-icon="mdi-magnify"
					label="Search id, email, name, etc."
					single-line
					hide-details
				></v-text-field>
			</v-card-title>
			<v-data-table
				:headers="headers"
				:items="user"
				:items-per-page="20"
				:search="search"
				class="elevation-1"
			>
				<template v-slot:item.actions="{ item }">
					<v-icon
						small
						class="mr-2"
						@click="
							onEditUser(item);
							editUserDialog = !editUserDialog;
						"
					>
						mdi-pencil
					</v-icon>
					<v-icon
						small
						@click="
							onDeleteUser(item);
							deleteUserDialog = !deleteUserDialog;
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
			{ text: "User ID", value: "id" },
			{ text: "E-mail", value: "email" },
			{ text: "Name", value: "name" },
			{ text: "Gender", value: "gender" },
			{ text: "Actions", value: "actions", sortable: false },
		],
		activePicker: null,
		currentUser: null,
		deleteUserDialog: null,
		editUserDialog: false,
		editUserData: null,
		menu: false,
		gender: ["Male", "Female"],
		search: "",
		// name: "",
		// gender: "",
		// date: null,
		// address: "",
		// email: "",
		// telNo: "",
	}),

	methods: {
		onEditUser(item) {
			console.log(item);
			this.editUserData = item;
		},
		onDeleteUser(item) {
			this.currentUser = item;
		},
		save(date) {
			this.$refs.menu.save(date);
		},
		deleteUser() {
			this.$store.dispatch("deleteUser", this.currentUser.id);
		},
		updateUser() {
			this.editUserData.dateOfBirth = new Date(
				this.editUserData.dateOfBirth
			).toISOString();
			console.log(this.editUserData);
			this.editUserDialog = false;
			this.$store.dispatch("updateUser", this.editUserData);
		},
	},

	computed: {
		user() {
			let data = this.$store.getters.user;
			console.log(data);
			data = data.map((data) => {
				return {
					id: data.id,
					name: data.name,
					email: data.email,
					gender: data.gender,
					address: data.address,
					dateOfBirth: data.dateOfBirth.substring(0, 10),
					telNo: data.telNo,
				};
			});
			return data;
		},
	},
};
</script>

<style scoped>
.form__input > h4 {
	margin-right: 16px;
}
</style>
