<template>
  <v-container class="category__container">
    <v-menu open-on-hover offset-y>
      <template v-slot:activator="{ attrs, on }">
        <!-- Main Category -->
        <v-tabs
          v-model="selectedTab"
          class="tabs__container mb-6"
          centered
          fixed-tabs
          v-bind="attrs"
          v-on="on"
          optional
        >
          <v-tab
            v-for="(tab, index) in tabsItem"
            :key="index"
            v-bind="attrs"
            v-on="on"
            @change="onChangeCategory(tab, tabsImage[index])"
          >
            {{ tab }}
          </v-tab>
        </v-tabs>
      </template>
      <!-- Sub Category -->
      <v-card>
        <v-row no-gutters>
          <v-col>
            <h4 class="category-header">Layout</h4>
            <v-card class="category__items" flat>
              <ul
                class="category__item"
                v-for="(item, index) in keyboardList"
                :key="index"
                @click="onChangeSubCategory(item, keyboardImage[index])"
              >
                <li class="py-3">
                  {{ item }}
                </li>
              </ul>
            </v-card>
          </v-col>
          <v-col>
            <h4 class="category-header">Type</h4>
            <v-card class="category__items" flat>
              <ul
                class="category__item"
                v-for="(item, index) in switchList"
                :key="index"
                @click="onChangeSubCategory(item, switchImage[index])"
              >
                <li class="py-3">
                  {{ item }}
                </li>
              </ul>
            </v-card>
          </v-col>
          <v-col>
            <h4 class="category-header">Profile</h4>
            <v-card class="category__items" flat>
              <ul
                class="category__item"
                v-for="(item, index) in keycapList"
                :key="index"
                @click="onChangeSubCategory(item, keycapImage[index])"
              >
                <li class="py-3">
                  {{ item }}
                </li>
              </ul>
            </v-card>
          </v-col>
          <v-col>
            <h4 class="category-header">Goods</h4>
            <v-card class="category__items" flat>
              <ul
                class="category__item"
                v-for="(item, index) in accesoriesList"
                :key="index"
                @click="onChangeSubCategory(item, accessoriesImage[index])"
              >
                <li class="py-3">
                  {{ item }}
                </li>
              </ul>
            </v-card>
          </v-col>
          <v-col>
            <h4 class="category-header">Tool</h4>
            <v-card class="category__items" flat>
              <ul
                class="category__item"
                v-for="(item, index) in toolList"
                :key="index"
                @click="onChangeSubCategory(item, toolImage[index])"
              >
                <li class="py-3">
                  {{ item }}
                </li>
              </ul>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-menu>
  </v-container>
</template>

<script>
// image assets
import accessoriesImage from "../assets/image/accessoriesImage.js";
import keyboardImage from "../assets/image/keyboardImage.js";
import switchImage from "../assets/image/switchImage.js";
import tabsImage from "../assets/image/tabsImage.js";
import keycapImage from "../assets/image/keycapImage.js";
import toolsImage from "../assets/image/toolsImage.js";

export default {
  data: () => ({
    tabsItem: ["Keyboard", "Switch", "Keycap", "Accessories", "Tools"],
    tabsImage: tabsImage,
    keyboardList: ["Full-Size", "TKL", "75%", "65%", "60%"],
    keyboardImage: keyboardImage,
    switchList: ["Linear", "Tactile", "Clicky"],
    switchImage: switchImage,
    keycapList: ["OEM Profile", "Cherry Profile", "XDA Profile"],
    keycapImage: keycapImage,
    accesoriesList: ["Deskmat", "Palm Rest", "Keyboard Pouch", "Aviator Cable"],
    accessoriesImage: accessoriesImage,
    toolList: ["Keycap Puller", "Lubricant", "other"],
    toolImage: toolsImage,

    selectedTab: "",
  }),

  methods: {
    // to shopping page / change category
    onChangeCategory(tab, src) {
      this.$router.replace({
        path: "/shopping",
        query: { category: tab, src: src },
      });
    },
    // to shopping page / change category
    onChangeSubCategory(category, src) {
      this.$router.replace({
        path: "/shopping",
        query: { category: category, src: src },
      });
    },
  },
};
</script>

<style scoped>
.tabs__container {
  background-color: white;
  color: black;
}

.v-tab {
  padding: 0 4rem;
}

.category__items > .category__item {
  padding: 0;
}

.category__container {
  padding-top: 0;
  padding-bottom: 0;
}

.category__items {
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  padding-top: 0.2rem;
}

.category__item li {
  text-align: center;
  list-style: none;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
}

.category__item li:hover {
  background-color: rgb(233, 233, 233);
  transition: all 0.4s;
  font-size: 1.1rem;
}

.category-header {
  margin-top: 12px;
  text-align: center;
  color: rgb(85, 35, 177);
}
</style>
