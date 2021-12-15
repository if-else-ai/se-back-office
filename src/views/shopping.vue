<template>
  <v-container class="shopping__container">
    <Tabs />
    <v-divider class="mb-4"></v-divider>
    <!-- <parallax /> -->
    <v-parallax v-if="categoryQuery !== 'ALL'" dark :src="image">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="font-weight-bold mb-4">
            {{ categoryQuery }}
          </h1>
        </v-col>
      </v-row>
    </v-parallax>
    <h1 v-if="categoryQuery === 'ALL'" class="font-weight-bold mb-4">
      {{ categoryQuery }}
    </h1>

    <v-divider class="my-4"></v-divider>

    <div class="product-filter">
      <v-combobox
        class="filter"
        prepend-icon="mdi-filter-outline"
        :items="filterItem"
        v-model="selectedFilter"
      >
      </v-combobox>

      <v-autocomplete
        :items="productList"
        v-model="search"
        class="search"
        label="Search"
        prepend-icon="mdi-magnify"
        @change="searchItem"
      >
      </v-autocomplete>
    </div>

    <section class="products__container" v-if="filteredProduct.length > 0">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </section>
    <section v-else class="products__container">
      <div class="no_product">ไม่พบสินค้า</div>
    </section>
  </v-container>
</template>

<style scoped>
.no-product {
  flex: 0 0 100%; /* flex-grow, flex-shrink, flex-basis */
}

.shopping__container {
  padding-top: 0;
  padding: 0;
}
.shopping__container h1 {
  text-align: center;
}

.products__container {
  margin-bottom: 100px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  border-width: 1px;
  border-style: dashed;
  border-color: rgb(218, 218, 218);
}

.products__container .no_product {
  font-size: 30px;
  justify-content: center;
  align-content: center;
  /* margin: auto; */
  margin: 150px 0px 150px 0px;
}

.product-filter {
  display: flex;
  flex-direction: row;
}

.product-filter .v-input.search {
  max-width: 300px;
}

.product-filter .v-input.filter {
  max-width: 250px;
}
</style>

<script>
import Tabs from "@/components/tabs.vue";
import ProductCard from "../components/product-card.vue";

export default {
  components: { Tabs, ProductCard },
  data: () => ({
    filterItem: [
      {
        text: "ราคามาก -> น้อย",
        option: "descending",
      },
      {
        text: "ราคาน้อย -> มาก",
        option: "ascending",
      },
    ],
    selectedFilter: {
      text: "ราคามาก -> น้อย",
      option: "descending",
    },
    search: "",
    filteredProduct: [],
  }),

  methods: {
    searchItem() {
      if (this.search === "ALL") {
        this.filteredProduct = this.$store.getters.products;
      } else {
        this.filteredProduct = this.$store.getters.products.filter(
          (product) => {
            return product.name.includes(this.search);
          }
        );
      }
    },
  },

  computed: {
    products() {
      switch (this.selectedFilter.option) {
        case "descending":
          this.filteredProduct = this.filteredProduct.sort((a, b) => {
            return b.price - a.price;
          });
          break;
        case "ascending":
          this.filteredProduct = this.filteredProduct.sort((a, b) => {
            return a.price - b.price;
          });
          break;
        default:
      }

      return this.filteredProduct;
    },

    categoryQuery() {
      this.category = this.$route.query.category;

      let filteredProduct = this.$store.getters.products;
      if (this.category === "ALL") {
        this.filteredProduct = filteredProduct;
      } else {
        filteredProduct = filteredProduct.filter((product) => {
          return (
            product.category === this.category ||
            product.tag.includes(this.category)
          );
        });
        this.filteredProduct = filteredProduct;
      }
      return this.$route.query.category;
    },

    image() {
      return this.$route.query.src;
    },

    productList() {
      // get product name and id
      let products = this.$store.getters.products;
      products = products.map((product) => {
        return {
          text: product.name,
          id: product.id,
        };
      });
      products.unshift({
        text: "ALL",
        id: 0,
      });

      return products;
    },
  },
};
</script>
