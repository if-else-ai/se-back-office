<template>
	<v-container
		class="page-container d-flex flex-column justify-center align-center"
	>
		<h1 class="my-6">Product</h1>
		<div class="my-4 align-self-start">
			<v-btn color="green white--text" @click="addProductDialog = !addProductDialog">
				Add Product
			</v-btn>
		</div>
		<v-card v-if="addProductDialog === true" class="ma-4" width="600">
			<v-toolbar dark color="primary">
				<v-toolbar-title>Add Product </v-toolbar-title>
			</v-toolbar>
			<v-form class="d-flex flex-column pa-4">
				<div class="form__input d-flex align-center justify-center">
					<h4>name</h4>
					<v-text-field label="name" hint="Keychron Q1" v-model="addProductData.name">
					</v-text-field>
				</div>
				<div class="form__input d-flex align-center justify-center">
					<h4>category</h4>
					<v-text-field
						label="category"
						hint="Keyboard"
						v-model="addProductData.category"
					>
					</v-text-field>
				</div>
				<div class="form__input d-flex align-center justify-center">
					<h4>price</h4>
					<v-text-field label="price" hint="399" v-model="addProductData.price">
					</v-text-field>
				</div>
				<div class="form__input d-flex align-center justify-center">
					<h4>description</h4>
					<v-textarea
						label="description"
						hint="It's a Keyboard"
						v-model="addProductData.description"
					>
					</v-textarea>
				</div>
				<div class="form__input d-flex align-center justify-center">
					<h4>quantity</h4>
					<v-text-field
						label="quantity"
						hint="30"
						v-model="addProductData.quantity"
					>
					</v-text-field>
				</div>
				<div class="form__input d-flex align-center justify-center">
					<h4>Option</h4>
					<v-text-field label="Label" hint="Color" v-model="option.name">
					</v-text-field>
					<v-text-field label="Name" hint="Black,Red"  v-model="option.list">
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
					class="form__input d-flex align-center justify-center"
				>
					<ul
						v-for="(item, index) in addProductData.option"
						:key="index"
					>
						<h3>Option {{ index + 1 }}</h3>
						<li>
							{{ `Label: ${addProductData.option[index].name}` }}
						</li>
						<li>
							{{ `Name: ${item.list}` }}
						</li>
						<li>
							{{ `PriceAdded: ${item.priceAdded}` }}
						</li>
					</ul>
				</div>
				<div class="form__input d-flex align-center justify-center">
					<h4>tag</h4>
					<v-chip
						class="mr-2"
						v-for="(item, i) in addProductData.tag"
						:key="i"
						style="font-size: 15px; color: white"
						color="red darken-3"
						small
						close
						@click:close="addProductData.tags.splice(i, 1)"
					>
						{{ item }}
					</v-chip>
					<v-text-field
						append-icon="mdi-plus"
						@click:append="addTag"
						label="tag"
						hint="Full-Size or 75%"
						v-model="tag"
					>
					</v-text-field>
				</div>
				<v-btn class="green white--text" @click="submitProduct">
					ADD
				</v-btn>
			</v-form>
		</v-card>
		<v-card flat width="1200" height="800">
			<v-data-table
				:headers="headers"
				:items="products"
				:items-per-page="30"
				class="elevation-1"
			>
				<template v-slot:item.actions="{ item }">
					<v-icon small class="mr-2" @click="onAddImage(item)">
						mdi-pencil
					</v-icon>
					<v-icon small @click="deleteItem(item)">
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
export default {
	data: () => ({
		headers: [
			{ text: "Product ID", value: "id" },
			{ text: "Name", value: "name" },
			{ text: "Price", value: "price" },
			{ text: "Quantity", value: "quantity" },
			{ text: "Actions", value: "actions", sortable: false },
		],
		tag: "",
		option: {
			name: "",
			list: "",
			priceAdded: "",
		},
		addProductDialog: false,
		addProductData: {
			name: "",
			category: "",
			price: "",
			description: "",
			quantity: "",
			option: [],
			tag: [],
		},
		currentProduct: null,
	}),

	methods: {
		onAddImage(item) {
			this.$refs.uploadFile.click();
			this.currentProduct = item;
		},
		deleteItem(item) {
			console.log(item);
		},

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
		},
		addTag() {
			if (this.tag !== "") {
				this.addProductData.tag.push(this.tag);
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
			this.$store.dispatch("addProduct", formData);
			this.addProductDialog = false;
		},
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
