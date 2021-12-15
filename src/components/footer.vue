<template>
  <div class="footer_cointainer">
    <!-- v-parallax -->
    <v-parallax
      dark
      src="https://cdn.shopify.com/s/files/1/0054/0878/4458/collections/BauerMoDo_3_of_11_x600.jpg?v=1611981271%20600w,%20//cdn.shopify.com/s/files/1/0054/0878/4458/collections/BauerMoDo_3_of_11_800x.jpg?v=1611981271%20800w,%20//cdn.shopify.com/s/files/1/0054/0878/4458/collections/BauerMoDo_3_of_11_1200x.jpg?v=1611981271%201200w,%20//cdn.shopify.com/s/files/1/0054/0878/4458/collections/BauerMoDo_3_of_11_1400x.jpg?v=1611981271%201400w,%20//cdn.shopify.com/s/files/1/0054/0878/4458/collections/BauerMoDo_3_of_11_1600x.jpg?v=1611981271%201600w"
    >
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="text_pal_style">#kibby</h1>
        </v-col>
      </v-row>
    </v-parallax>

    <!-- v-footer -->
    <v-footer padless>
      <v-card flat tile class="primary lighten-1 white--text text-center">
        <v-row justify="center" no-gutters>
          <v-btn
            v-for="link in links"
            :key="link"
            color="white"
            text
            class="my-4 mx-2"
          >
            {{ link }}
          </v-btn>
        </v-row>

        <v-card-text class="white--text pt-0">
          Phasellus feugiat arcu sapien, et iaculis sit amet. Mauris cursus
          commodo interdum. Praesent ut risus eget metus luctus accumsan id
          ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet
          dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia
          malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui
          sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut
          orci. Orci varius natoque penatibus et magnis dis parturient montes,
          nascetur ridiculus mus.
        </v-card-text>

        <h4 class="term-of-service">Term of service</h4>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Kibby</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<style scoped>
.footer_cointainer {
  display: flex;
  flex-direction: column;
}
.term-of-service {
  font-weight: normal;
  cursor: pointer;
  margin: 10px 0;
}

.footer-parallax {
  width: 1vw;
  hight: 600px;
}

.text_pal_style {
  font-family: interstate, sans-serif;
  font-size: 30px;
  font-weight: 700;
  font-style: normal;
  transition: color 0.2s ease-in-out;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}
</style>

<script>
export default {
  name: "product",
  props: ["product"],
  data: () => ({
    links: ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"],
  }),
};
</script>
