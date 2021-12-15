<template>
  <div class="home_container">
    <!-- Carousel & text  -->
    <div class="header-overly">
      <div class="header-overlay__container">
        <h1 class="typing">customize keyboard</h1>
        <v-btn
          elevation="2"
          x-large
          depressed
          color="white"
          large
          @click="
            $router.push({
              path: '/customize',
            })
          "
        >
          CUSTOMIZE
        </v-btn>
      </div>
      <Carousel />
    </div>

    <!-- click to scroll -->
    <div id="popular"></div>
    <a href="#popular">
      <v-btn class="scroll_container" fab dark medium color="dark">
        <v-icon dark> mdi-arrow-down-bold </v-icon>
      </v-btn>
    </a>

    <!-- Poppular Product -->
    <Poppular />
    <v-divider></v-divider>

    <!-- shop -->
    <div class="shop_container d-flex">
      <Shop v-for="(shop, index) in shopdata" :key="index" :web="shop" />
    </div>
  </div>
</template>

<style src="./style.css"></style>

<script>
import Carousel from "@/components/home/carousel.vue";
import Poppular from "../components/home/poppular.vue";
import Shop from "../components/home/shop.vue";
import shopdata from "../assets/shop";

export default {
  components: { Carousel, Poppular, Shop },
  data: () => ({
    shopdata: shopdata,
  }),
};
</script>

<style scoped>
.header-overly {
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-overly .header-overlay__container {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #f8f8f7;
  font-family: sans-serif;
  font-size: 50px;
  text-transform: uppercase;
  z-index: 1;
}

.header-overly .header-overlay__container h1 {
  margin: 30px 0;
  padding: 0 60px;
  background-color: rgba(0, 0, 0, 0.5);
}

.typing {
  color: #f8f8f7;
  overflow: hidden;
  border-right: 0.15em solid rgb(0, 153, 255);
  white-space: nowrap;
  letter-spacing: 0.15em;
  animation: typing 4.5s steps(36, end) infinite,
    cursor-blink 0.75s step-end infinite;
}

/* The typing effect */
@keyframes typing {
  0% {
    width: 0%;
  }
  60% {
    width: 100%;
  }
}

/* The typewriter cursor effect */
@keyframes cursor-blink {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: rgb(0, 153, 255);
  }
}

.home_container {
  padding: 0;
  margin: 0;
}
.home_container a {
  text-decoration: none;
}
.scroll_container {
  display: block;
  position: relative;
  top: -15px;
  margin: auto;
}

.shop_container {
  padding: 80px 40px 80px 40px;
}
</style>