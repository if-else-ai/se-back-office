<template>
  <div class="poppular_container">
    <h2>MOST POPULAR PRODUCTS</h2>

    <section class="products__container" v-if="products.length">
      <ProductCard
        v-for="product in products"
        :key="product.productID"
        :product="product"
      />
    </section>
    <v-btn
      depressed
      color="error"
      large
      @click="
        $router.push({
          path: `/shopping`,
          query: { category: 'ALL' },
        })
      "
    >
      VIEW ALL PRODUCTS
    </v-btn>
  </div>
</template>


<script>
import ProductCard from "../product-card.vue";

export default {
  components: { ProductCard },
  data: () => ({}),
  computed: {
    // selectedCategory(){
    // 	return
    // },

    products() {
      return this.$store.getters.products.slice(0, 4);
    },
  },
};
</script>

<style scoped>
.poppular_container {
  padding-top: 40px;
  padding-bottom: 40px;
  margin-left: 100px;
  margin-right: 100px;
  display: flex;
  flex-direction: column;
}

.poppular_container h2 {
  display: block;
  text-align: center;
  color: rgb(0, 162, 255);
}

.products__container {
  margin-top: 40px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  border-width: 1px;
  border-style: dashed;
  border-color: rgb(218, 218, 218);
}
.poppular_container > button {
  align-self: flex-end;
}
</style>