<template>
	<v-container
		class="page-container d-flex flex-column justify-center align-center"
	>
		<h1 class="my-6">Product</h1>
		<!-- Add Product Button -->
		<div class="add-product__button my-4 align-self-start">
			<v-btn
				color="green white--text"
				@click="addProductDialog = !addProductDialog"
			>
				Add Product
			</v-btn>
		</div>
		
		<!-- Add Product Dialog Form -->
		<v-dialog v-model="addProductDialog" max-width="700">
			<v-card class="">
				<v-toolbar dark color="primary">
					<v-toolbar-title>Add Product </v-toolbar-title>
				</v-toolbar>
				<v-form class="d-flex flex-column pa-6">
					<div class="form__input d-flex align-center justify-center">
						<h4>Name</h4>
						<v-text-field
							label="Product Name"
							hint="Keychron Q1"
							v-model="addProductData.name"
						>
						</v-text-field>
					</div>
					<div class="form__input d-flex align-center justify-center">
						<h4>Category</h4>
						<v-combobox
							label="Category"
							hint="Keyboard"
							v-model="addProductData.category"
							:items="categoryList"
							@change="changeTagList"
						>
						</v-combobox>
					</div>
					<div class="form__input d-flex align-center justify-center">
						<h4>Price</h4>
						<v-text-field
							label="Price"
							hint="399"
							v-model="addProductData.price"
						>
						</v-text-field>
					</div>
					<div class="form__input d-flex align-center justify-center">
						<h4>Description</h4>
						<v-textarea
							label="Description"
							hint="It's a Keyboard"
							v-model="addProductData.description"
						>
						</v-textarea>
					</div>
					<div class="form__input d-flex align-center justify-center">
						<h4>Quantity</h4>
						<v-text-field
							label="Quantity"
							hint="30"
							v-model="addProductData.quantity"
						>
						</v-text-field>
					</div>
					<div class="form__input d-flex align-center justify-center">
						<h4>Option</h4>
						<v-text-field
							label="Label"
							hint="Color"
							v-model="option.name"
						>
						</v-text-field>
						<v-text-field
							label="Name"
							hint="Black,Red"
							v-model="option.list"
						>
						</v-text-field>
						<v-text-field
							label="PriceAdded"
							v-model="option.priceAdded"
							hint="0,0 or 0,100"
						>
						</v-text-field>
						<v-btn @click="addOption">
							ADD
						</v-btn>
					</div>

					<div
						v-if="addProductData.option.length > 0"
						class="form__input d-flex flex-column align-start justify-center"
					>
						<ul
							v-for="(item, index) in addProductData.option"
							:key="index"
						>
							<h3>Option {{ index + 1 }}</h3>
							<li>
								{{
									`Label: ${addProductData.option[index].name}`
								}}
							</li>
							<li>
								{{ `Name: ${item.list}` }}
							</li>
							<li>
								{{ `PriceAdded: ${item.priceAdded}` }}
							</li>
							<v-btn small class="white--text" color="red" @click="addProductData.option.splice(index, 1)">delete option</v-btn>
						</ul>
					</div>
					<div class="form__input d-flex align-center justify-center">
						<h4>Tag</h4>
						<v-chip
							class="mr-2"
							v-for="(item, i) in addProductData.tag"
							:key="i"
							style="font-size: 15px; color: white"
							color="red darken-3"
							small
							close
							@click:close="addProductData.tag.splice(i, 1)"
						>
							{{ item }}
						</v-chip>
						<v-combobox
							append-icon="mdi-plus"
							label="Tag"
							hint="Full-Size or 75%"
							v-model="tag"
							:items="suggestTag"
							@change="addTag"
						>
						</v-combobox>
					</div>
					<v-btn class="green white--text" @click="submitProduct">
						Add Product
					</v-btn>
				</v-form>
			</v-card>
		</v-dialog>

		<!-- Edit Product Dialog Form -->
		<v-dialog v-model="editProductDialog" max-width="1200">
			<v-card v-if="editProductData" class="">
				<v-toolbar dark color="primary">
					<v-toolbar-title>Edit Product: {{ editProductData.name }} </v-toolbar-title>
				</v-toolbar>
				<v-form class="d-flex flex-column pa-6">
					<div class="form__input d-flex align-center justify-center">
						<h4>Name</h4>
						<v-text-field
							label="Product Name"
							hint="Keychron Q1"
							v-model="editProductData.name"
						>
						</v-text-field>
					</div>
					<div class="form__input d-flex align-center justify-center">
						<h4>Category</h4>
						<v-combobox
							label="Category"
							hint="Keyboard"
							v-model="editProductData.category"
							:items="categoryList"
							@change="changeTagList"
						>
						</v-combobox>
					</div>
					<div class="form__input d-flex align-center justify-center">
						<h4>Price</h4>
						<v-text-field
							label="Price"
							hint="399"
							v-model="editProductData.price"
						>
						</v-text-field>
					</div>
					<div class="form__input d-flex align-center justify-center">
						<h4>Description</h4>
						<v-textarea
							label="Description"
							hint="It's a Keyboard"
							v-model="editProductData.description"
						>
						</v-textarea>
					</div>
					<div class="form__input d-flex align-center justify-center">
						<h4>Quantity</h4>
						<v-text-field
							label="Quantity"
							hint="30"
							v-model="editProductData.quantity"
						>
						</v-text-field>
					</div>
					<div class="form__input d-flex align-center justify-center">
						<h4>Option</h4>
						<v-text-field
							label="Label"
							hint="Color"
							v-model="option.name"
						>
						</v-text-field>
						<v-text-field
							label="Name"
							hint="Black,Red"
							v-model="option.list"
						>
						</v-text-field>
						<v-text-field
							label="PriceAdded"
							v-model="option.priceAdded"
							hint="0,0 or 0,100"
						>
						</v-text-field>
						<v-btn @click="addEditOption">
							ADD
						</v-btn>
					</div>

					<div
						v-if="editProductData.option.length > 0"
						class="form__input d-flex flex-column align-start justify-center ml-4 my-2"
					>
						<ul
							v-for="(item, index) in editProductData.option"
							:key="index"
						>
							<h3>Option {{ index + 1 }}  </h3>
							<li>
								{{
									`Label: ${editProductData.option[index].name}`
								}}
							</li>
							<li>
								{{ `Name: ${item.list}` }}
							</li>
							<li>
								{{ `PriceAdded: ${item.priceAdded}` }}
							</li>
							<v-btn small class="white--text" color="red" @click="editProductData.option.splice(index, 1)">delete option</v-btn>
						</ul>
					</div>
					<div class="form__input d-flex align-center justify-center">
						<h4>Tag</h4>
						<v-chip
							class="mr-2"
							v-for="(item, i) in editProductData.tag"
							:key="i"
							style="font-size: 15px; color: white"
							color="red darken-3"
							small
							close
							@click:close="editProductData.tag.splice(i, 1)"
						>
							{{ item }}
						</v-chip>
						<v-combobox
							append-icon="mdi-plus"
							label="Tag"
							hint="Full-Size or 75%"
							v-model="tag"
							:items="suggestTag"
							@change="addTag"
						>
						</v-combobox>
					</div>
					<v-btn class="green white--text" @click="submitUpdateProduct">
						Update Product
					</v-btn>
				</v-form>
			</v-card>
		</v-dialog>

		<!-- Remove Product Dialog -->
		<v-dialog
			v-if="currentProduct"
			v-model="removeProductDialog"
			max-width="600"
		>
			<v-card class="">
				<v-toolbar dark color="error">
					<v-toolbar-title>Remove Product </v-toolbar-title>
				</v-toolbar>
				<h3 class="ma-4 text-center">
					Are you sure you want to delete {{ currentProduct.name }} ?
				</h3>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						color="error"
						raised
						@click="removeProductDialog = false"
					>
						No
					</v-btn>
					<v-btn
						color="success"
						raised
						@click="
							deleteProduct();
							removeProductDialog = false;
						"
					>
						Yes
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<!-- Data Table -->
		<v-card width="1200" >
			<v-card-title>
				<v-text-field
					v-model="search"
					append-icon="mdi-magnify"
					label="Search product"
					single-line
					hide-details
				></v-text-field>
			</v-card-title>
			<v-data-table
				:headers="headers"
				:items="products"
				:items-per-page="30"
				:search="search"
				class="elevation-1"
			>
				<template v-slot:item.quantity="{ item }">
					<v-chip :color="getQuantityColor(item.quantity)" dark>
						{{ item.quantity }}
					</v-chip>
				</template>

				<template v-slot:item.image="{ item }">
						<v-icon color="green darken-4" v-if="item.image !== null" @click="logger(item)" >mdi-checkbox-marked-circle</v-icon>
						<v-icon color="red" v-else >mdi-alert-circle</v-icon>
				</template>

				<template v-slot:item.actions="{ item }">
					<v-icon small class="mr-2" @click="onEditProduct(item); editProductDialog = !editProductDialog">
						mdi-pencil
					</v-icon>
					<v-icon
						small
						@click="
							onDeleteItem(item);
							removeProductDialog = !removeProductDialog;
						"
					>
						mdi-delete
					</v-icon>
					<input
						type="file"
						@change="onUploadImage"
						style="display: none"
						ref="uploadFile"
						multiple
						accept=".jpg, .jpeg, .png"
					/>
				</template>
			</v-data-table>
		</v-card>
	</v-container>
</template>

<script>
import axios from "../api/axios-product.js";
import {
	categoryList,
	keyboardTag,
	keycapTag,
	switchTag,
	toolsTag,
	accessoriesTag,
} from "../assets/product/product-category.js";

export default {
	data: () => ({
		headers: [
			{ text: "Product ID", value: "id" },
			{ text: "Name", value: "name" },
			{ text: "Price (Baht)", value: "price" },
			{ text: "Quantity", value: "quantity" },
			{ text: "Image", value: "image" },
			{ text: "Actions", value: "actions", sortable: false },
		],
		search: "",
		categoryList: categoryList,
		tagList: [],
		suggestTag: [],
		tag: "",
		option: {
			name: "",
			list: "",
			priceAdded: "",
		},
		addProductDialog: false,
		removeProductDialog: false,

		addProductData: {
			name: "",
			category: "",
			price: "",
			description: "",
			quantity: "",
			option: [],
			tag: [],
		},
		editProductData: null,
		editProductDialog: false,

		currentProduct: null,

	}),

	methods: {
		changeTagList() {
			switch (this.addProductData.category) {
				case 'Keyboard':
					this.suggestTag = keyboardTag
					break;
				case 'Switch':
					this.suggestTag = switchTag
					break;
				case 'Keycap':
					this.suggestTag = keycapTag
					break;
				case 'Tools':
					this.suggestTag = toolsTag
					break;
				case 'Accessories':
					this.suggestTag = accessoriesTag
					break;
				default: 
			}
			console.log(this.suggestTag)
		},
		getQuantityColor(itemAmount) {
			if (itemAmount === 0) {
				return "red";
			} else if (itemAmount < 15) {
				return "amber darken-4";
			} else {
				return "green";
			}
		},

		onAddImage(item) {
			this.$refs.uploadFile.click();
			this.currentProduct = item;
		},

		onEditProduct(item) {
			let id = item.id;
			axios.get(`/product/${id}`).then((res) => {
				let product = res.data
				this.editProductData = product
			});
		},

		onDeleteItem(item) {
			this.currentProduct = item;
			console.log(this.currentProduct);
		},

		deleteProduct() {
			this.$store.dispatch('deleteProduct', this.currentProduct.id)
		},
		// logger(item){
		// 	console.log(item)
		// },

		onUploadImage(event) {
			const files = event.target.files;
			console.log(files);
			console.log(this.currentProduct);
			let formData = new FormData();
			for (let i = 0; i < files.length; i++) {
				let file = files[i];
				let tempBlob = new Blob([file], { type: "image/jpg" });
				formData.append("image", tempBlob, files[i].name);
			}
			formData.append("productId", this.currentProduct.id);
			this.$store.dispatch("uploadProductImage", { formData: formData });
		},

		addOption() {
			let name = this.option.name;
			let list = this.option.list.split(",");
			let priceAdded = this.option.priceAdded.split(",");
			priceAdded = priceAdded.map((item) => {
				return Number(item);
			});
			this.addProductData.option.push({
				name: name,
				list: [...list],
				priceAdded: [...priceAdded],
			});
			this.option = {
				name: "",
				list: "",
				priceAdded: "",
			}
		},
		addEditOption() {
			let name = this.option.name;
			let list = this.option.list.split(",");
			let priceAdded = this.option.priceAdded.split(",");
			priceAdded = priceAdded.map((item) => {
				return Number(item);
			});
			this.editProductData.option.push({
				name: name,
				list: [...list],
				priceAdded: [...priceAdded],
			});
			this.option = {
				name: "",
				list: "",
				priceAdded: "",
			}
		},
		addTag() {
			if (this.tag !== "") {
				this.addProductData.tag.push(this.tag);
				console.log(this.addProductData)
				this.tag = "";
			}
		},

		submitProduct() {
			let formData = {
				...this.addProductData,
				price: Number(this.addProductData.price),
				quantity: Number(this.addProductData.quantity),
			};
			console.log(formData);
			// this.$store.dispatch("addProduct", formData);
			this.addProductDialog = false;
		},
		submitUpdateProduct() {
			let formData = {
				...this.editProductData,
				price: Number(this.editProductData.price),
				quantity: Number(this.editProductData.quantity),
			};
			console.log(formData);
			this.addProductDialog = false;

		}
	},

	computed: {
		products() {
			let data = this.$store.getters.products;
			data = data.map((data) => {
				return {
					id: data.id,
					name: data.name,
					price: data.price,
					quantity: data.quantity,
					image: data.image
				};
			});
			console.log(data);
			return data;
		},
	},
};
</script>

<style scoped>
.form__input h4 {
	margin-right: 16px;
}
.page-container {
	padding: 0 400px;
}
</style>
