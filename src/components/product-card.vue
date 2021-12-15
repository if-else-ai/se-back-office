<template>
  <transition appear>
    <v-card class="product__container" width="374" flat outlined>
      <!-- Image Effect -->
      <div
        class="hovereffect"
        @click="
          $router.push({
            path: `/shopping/product`,
            query: { productID: product.id },
          })
        "
      >
        <div class="image-wrapper">
          <img :src="product.image[0] ? product.image[0] : failedImage " class="image" alt="normal" />
          <img :src="product.image[1] ? product.image[1] : failedImage2" class="image-hover" alt="hover" />
        </div>
        <div class="overlay"></div>
      </div>
      <!-- end Image Effect -->

      <!-- Product Name -->
      <v-card-title class="product__title">{{ product.name }}</v-card-title>
      <v-divider></v-divider>
      <!-- Product Price / Sold product -->
      <v-row>
        <v-col cols="auto" class="mr-auto price">
          <p>$ {{ product.price }}</p>
        </v-col>
        <v-col cols="auto" class="selled">
          <p>Available {{ product.quantity }}</p>
        </v-col>
      </v-row>
    </v-card>
  </transition>
</template>

<script>
export default {
  name: "product-card",
  props: ["product"],
  data: () => ({
    failedImage: 'https://cdn.shopify.com/s/files/1/0335/2087/7700/products/gmk_olivia_plusplus_keyboard_no1rev2wkl_ortho_top_vertical.jpg?v=1601032933',
    failedImage2: 'https://www.oliviaplus.plus/renders/0.jpg'
  })
};
</script>

<style>
.v-card__title.product__container {
  align-items: center;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 0.0125em;
  line-height: 2rem;
  word-break: break-all;
  padding: 16px;
}

.product__container {
  margin: 20px;
}
.description p {
  color: rgb(36, 36, 36);
  height: 60px;
}
.price p {
  color: rgb(0, 162, 255);
  padding-top: 10px;
  padding-left: 15px;
}
.selled p {
  color: rgb(206, 206, 206);
  padding-top: 10px;
  padding-right: 15px;
}

/* hover start */
.hovereffect {
  height: 250;
  overflow: hidden;
  position: relative;
  cursor: pointer;
}

.hovereffect .overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  /* top: 0;
  left: 0; */
  opacity: 0;
  -webkit-transition: all 0.6s;
  transition: all 0.6s;
}

.hovereffect img {
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
  padding: none;
  margin: auto;
  display: block;
}

.hovereffect:hover img {
  -ms-transform: scale(1.1);
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.hovereffect:hover .overlay {
  opacity: 1;
  /* filter: alpha(opacity=100); */
}

.image-wrapper img {
  height: 250px;
}

/*change image product list*/
.image-wrapper {
  position: relative;
  /* justify-items: auto; */
  justify-content: center;
}
.image-hover {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  top: 0;
  left: 0;
  right: 0;
  opacity: 0;
  transition: opacity 0.5s ease-out;
}
.hovereffect:hover .image-hover {
  opacity: 1;
}
/* hover end */
</style>
