<template>
  <v-carousel
    cycle
    height="800px"
    hide-delimiter
    delimiter-icon="mdi-checkbox-blank-circle-outline"
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item v-for="(item, i) in itemdata" :key="i" :src="item.src">
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import itemdata from "../../assets/homecarousel";
export default {
  data: () => ({
    itemdata: itemdata,
  }),
};
</script>
