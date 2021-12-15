<template>
  <div class="shop_wrapper">
    <div class="image_wrapper">
      <img :src="web.img" class="image" />
    </div>
    <div class="text_wrapper">
      <h6>SHOP</h6>
      <h2>{{ web.name }}</h2>
      <v-btn
        depressed
        color="white"
        large
        @click="
          $router.push({
            path: web.src,
            query: {
              category: web.query,
              src: web.palimg,
            },
          })
        "
      >
        VIEW PRODUCTS
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: ["web"],
  data() {
    return {};
  },
};
</script>

<style scoped>
.shop_wrapper {
  margin: 15px;
  width: 580px;
  height: 500px;
  overflow: hidden;
  position: relative;
  border-radius: 5px;
}

.shop_wrapper .image_wrapper .image {
  width: 100%;
  height: 100%;
  transition: all 4s;
}

.shop_wrapper .image_wrapper .image:hover {
  transform: scale(1.1);
}

.shop_wrapper .text_wrapper {
  position: absolute;
  line-height: 1.65;
  top: 310px;
  left: 50px;
  color: white;
}

.shop_wrapper .text_wrapper h6 {
  margin-top: -0.325em;
  font-size: 13px;
  font-family: interstate, sans-serif;
  font-weight: 700;
  font-style: normal;
  letter-spacing: 0.2em;
}

.shop_wrapper .text_wrapper h2 {
  margin-top: 16px;
  font-size: 24px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-family: interstate, sans-serif;
  font-weight: 700;
  font-style: normal;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
</style>
