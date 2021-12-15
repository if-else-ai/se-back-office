<template>
	<v-container
		v-if="product"
		class="shopping__container d-flex flex-column align-center"
	>
		<Tabs />
		<v-divider class="mb-4"></v-divider>
		<div class="product-container pt-4">
			<v-card width="800">
				<ProductImage
          v-if="option.image"
					:images="option.image"
					:currentImage="currentImage"
					@setImage="currentImage = $event"
					@setImageSet="option.image = $event"
          :key="option.id"
				/>
			</v-card>
			<v-card
				class="product__detail pa-2"
				width="800"
				min-height="400"
				outlined
				elevation="1"
			>
				<v-card-title class="product__name">
					<h2>{{ product.name }}</h2></v-card-title
				>
				<v-card-subtitle class="product__price">
					<h2>$ {{ price.toFixed(2) }}</h2>
				</v-card-subtitle>
				<v-divider class="mx-6"></v-divider>

				<div class="product__selection">
					<v-row
						class="product__option"
						v-for="(option, optionIndex) in product.option"
						:key="optionIndex"
					>
						<v-card class="mr-4" flat>
							{{ option.name }}
						</v-card>

						<v-btn-toggle class="product__choice" mandatory>
							<v-btn
								class="product__choice-button"
								v-for="(list, index) in option.list"
								:key="index"
								@click="getSelectedOption(optionIndex, index)"
							>
								{{ list }}
							</v-btn>
						</v-btn-toggle>
					</v-row>
				</div>

				<div class="product__add my-4">
					<v-card class="ml-4 mr-4" flat> Quantity </v-card>
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
          <div class="green--text" >
            {{ quantityCheckText }}
          </div>
				</div>
				<v-btn
					class="product__button mb-4"
					block
					outlined
					@click="addToCart"
				>
					เพิ่มลงตะกร้า
				</v-btn>
			</v-card>
		</div>
		<v-card
			class="product-description__container mt-4"
			width="1600"
			elevation="2"
		>
			<v-card-title>Description</v-card-title>
			<v-card-text>
				{{ product.description }}
			</v-card-text>
		</v-card>

		<!-- สินค้าแนะนำ -->
    <div class="d-flex ">
		<ProductCard
        v-for="product in recommend"
        :key="product.id"
        :product="product"
      />
      
    </div>
	</v-container>
</template>

<style src="./style.css"></style>

<script>
import Tabs from "@/components/tabs.vue";
import ProductImage from "@/components/product-image.vue";
import ProductCard from "@/components/product-card.vue";

export default {
  components: {
    Tabs,
    ProductImage,
    ProductCard
  },
  data: () => ({
    // failedImageSet: [
    //   {
    //   	src: "https://i.ytimg.com/vi/aQWH0ysGXy8/maxresdefault.jpg",
    //   	active: true,
    //   },
    //   { src: "https://i.imgur.com/YazpFQt.jpg", active: false },
    // ],
    // failImage : 'https://i.imgur.com/YazpFQt.jpg',
    currentImage: "",
    option: [],
    tempProduct: null,
    selectedOption: null,
    quantity: 1,
    computedPrice: 0,
  }),

  created() {
    this.$store.dispatch('getProduct', this.$route.query.productID);
  },

  methods: {
    // trigger on pick option
    getSelectedOption(optionIndex, selectedOptionIndex) {
      // get SelectedOption => name of selectedOption
      let selectedOption =
        this.product.option[optionIndex].list[selectedOptionIndex];
      // get selected option price
      let priceAdded =
        this.product.option[optionIndex].priceAdded[selectedOptionIndex];

      // set seleceted option name
      this.option.option[optionIndex].selected = selectedOption;

      // set selected option priceAdded
      this.option.option[optionIndex].priceAdded = priceAdded;
    },

    changeImage(index) {
      this.currentImage = this.images[index];
      this.toggleActive(index);
    },

    toggleActive(index) {
      let item = this.images[index];

      this.images = this.images.map((item) => {
        return {
          src: item.src,
          active: false,
        };
      });

      if (item.active === false) {
        item.active = !item.active;
      }

      this.$set(this.images, index, item);
    },

    // add product
    increment() {
      console.log(this.tempProduct)
      if(this.quantity <= this.tempProduct.quantity){
        this.quantity += 1;
      }
      if(this.quantity > this.tempProduct.quantity){
        this.quantity = this.tempProduct.quantity
      }
    },
    // decrease product
    decrement() {
      if (this.quantity > 1) {
        this.quantity -= 1;
      }
    },

    // add to cart
    addToCart() {
      let formData = {
        id: this.option.id,
        name: this.option.name,
        category: this.option.category,
        price: this.option.price,
        quantity: this.quantity,
        option: this.option.option,
        totalPrice: this.computedPrice,
        image: this.option.image.map(element => {
          return element.src
        })
      };
      this.$store.dispatch('addCart', formData)
    },
  },

  computed: {
    price() {
      let addedPrice = 0;
      if( this.option.option ){this.option.option.map((option) => {
        addedPrice += option.priceAdded;
      });
      // Price = (BasePrice + AddedPrice) * Quantity
      this.computedPrice = (this.option.price + addedPrice) * this.quantity;
      }
      return (this.option.price + addedPrice) * this.quantity;
    },

    recommend() {
      return (this.$store.getters.products).slice(0,4)
    },

    quantityCheckText(){
      console.log(11)
      if(this.quantity >= this.tempProduct.quantity){
        this.quantity = this.tempProduct.quantity
        return `Available ${this.tempProduct.quantity}` 
      }
      return ''
    },

    product() {
      // Initialize Product
      let product = this.$store.getters.product;
      if (product.name && this.option.length === 0) {
        this.tempProduct = this.$store.getters.product;
        product.image.length === 0 ? product.image = [
          'https://gitlab.com/uploads/-/system/project/avatar/3880238/Temp.png','https://gitlab.com/uploads/-/system/project/avatar/3880238/Temp.png'
        ] : product.image

        this.option = {
          id: product.id,
          name: product.name,
          price: product.price,
          category: product.category,
          quantity: this.quantity,
          option: product.option.map((option) => {
            return {
              name: option.name,
              select: option.list[0],
              priceAdded: option.priceAdded[0],
            };
          }),
          image: product.image.map((image, index) => {
            return {
              src: image,
              active: index === 0 ? true : false,
            };
          }),
        };
        this.currentImage = this.option.image[0].src;
      }

     if(this.option.id !== product.id) {
       product.image.length == 0 ? product.image = [
          'https://gitlab.com/uploads/-/system/project/avatar/3880238/Temp.png','https://gitlab.com/uploads/-/system/project/avatar/3880238/Temp.png'
        ] : product.image
        this.option = {
          id: product.id,
          name: product.name,
          price: product.price,
          category: product.category,
          quantity: this.quantity,
          option: product.option.map((option) => {
            return {
              name: option.name,
              select: option.list[0],
              priceAdded: option.priceAdded[0],
            };
          }),
          image: product.image.map((image, index) => {
            return {
              src: image,
              active: index === 0 ? true : false,
            };
          }),
        };
        this.currentImage = this.option.image[0].src;
        // if(this.quantity > this.tempProduct.quantity) {
        //   this.quantity = this.tempProduct.quantity
        // }
      }
      return this.$store.getters.product;
    },
  },
};
</script>

<style scoped>
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
}
.product__main-image img {
	transition: all 0.5s;
}

.shopping__container {
	padding-top: 0;
	padding: 0;
}

.product__name {
	margin-top: 0.5rem;
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
	margin-top: auto;
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
	margin-right: 3rem;
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
	flex-direction: columns;
	justify-content: center;
}

.product__detail {
	display: flex;
	flex-direction: column;
}

.product__item {
	color: rgb(247, 247, 247);
	cursor: pointer;
}

.product__item:hover {
	color: black;
}
</style>
