<template>
  <v-container>
    <div  class="profile-container pt-4">
      <v-card class="profile-menu" width="300" max-height="200" elevation="0">
        <v-list>
          <v-list-item class="py-1">
            <v-icon class="mr-6">mdi-account</v-icon>
            <v-list-item-title class="">
              {{ userInfo.name === "" ? 'User' : userInfo.name  }}
            </v-list-item-title>
          </v-list-item>
          <v-divider class="mx-6"></v-divider>

          <v-card class="menu-list" flat>
            <v-list nav>
              <v-list-item-group mandatory color="red darken-4">
                <v-list-item
                  v-for="(item, index) in menuList"
                  :key="index"
                  @click="changeMenu(item.title)"
                >
                  <!-- icon & name-->
                  <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-list>
      </v-card>

      <!-- righty -->
      <v-card v-if="this.selectedMenu === 'Account'" elevation="0">
        <v-card class="pl-4" elevation="4" width="1100">
          <v-card-title class="ml-2"> จัดการบัญชีผู้ใช้</v-card-title>
          <v-divider class="mx-4"></v-divider>

          <div class="account-detail my-6">
            <v-row align="center">
              <v-col cols="2" align="right"> ชื่อ </v-col>
              <v-col class="ml-6" md="4">
                <form>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="ชื่อ"
                    v-model="userInfo.name"
                  />
                </form>
              </v-col>
            </v-row>

            <v-row class="my-0">
              <v-col cols="2" align="right">
                <div class="gender mt-2">เพศ</div>
              </v-col>
              <v-col class="ml-6 pt-6 pb-0" md="4">
                <v-select
                  :items="items"
                  dense
                  outlined
                  v-model="userInfo.gender"
                ></v-select>
              </v-col>
            </v-row>

            <v-row class="mt-0" align="center">
              <v-col cols="2" align="right">
                <div class="date">วันเกิด</div>
              </v-col>
              <v-col class="ml-6" md="4">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="userInfo.dateOfBirth"
                      label=""
                      append-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="userInfo.dateOfBirth"
                    :active-picker.sync="activePicker"
                    :max="
                      new Date(
                        Date.now() - new Date().getTimezoneOffset() * 60000
                      )
                        .toISOString()
                        .substr(0, 10)
                    "
                    min="1950-01-01"
                    @change="save"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>

            <v-row class="mt-0">
              <v-col cols="2" align="right">
                <div class="py-2">ที่อยู่</div>
              </v-col>

              <v-col class="ml-6 pb-0 pt-6" md="4">
                <v-textarea
                  solo
                  name="input-7-4"
                  label="Address"
                  v-model="userInfo.address"
                ></v-textarea>
              </v-col>
            </v-row>

            <v-row align="center" class="mt-0">
              <v-col align="right" cols="2"> Email </v-col>
              <v-col class="ml-5" md="4">
                <form class="email-field">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email"
                    v-model="userInfo.email"
                  />
                </form>
              </v-col>
            </v-row>

            <v-row align="center" class="mt-0">
              <v-col align="right" cols="2"> Tel </v-col>
              <v-col class="ml-5" md="4">
                <form class="email-field">
                  <input
                    type="text"
                    id="tel"
                    name="tel"
                    placeholder="Tel Number"
                    v-model="userInfo.telNo"
                  />
                </form>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="2"></v-col>
              <v-col class="ml-5" cols="2">
                <v-btn
                  color="blue"
                  class="white--text"
                  :disabled="checkAccount"
                  @click="updateUser"
                >
                  บันทึก
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-card>
        <v-card elevation="8" width="1100" height="400">
          <v-card-title class="ml-4"> จัดการรหัสผ่าน</v-card-title>
          <v-divider class="mx-4"></v-divider>

          <div class="manage-password my-6">
            <v-row align="center" class="mt-0">
              <v-col align="right" cols="2"> รหัสผ่านเก่า </v-col>
              <v-col class="ml-5" md="4">
                <form class="">
                  <input
                    type="password"
                    id="password"
                    name="passwprd"
                    placeholder="รหัสผ่านเก่า"
                    v-model="password"
                  />
                </form>
              </v-col>
            </v-row>

            <v-row align="center" class="mt-0">
              <v-col align="right" cols="2"> รหัสผ่านใหม่ </v-col>
              <v-col class="ml-5" md="4">
                <form class="">
                  <input
                    type="password"
                    id="new-password"
                    name="new-password"
                    placeholder="รหัสผ่านใหม่"
                    v-model="newPassword"
                  />
                </form>
              </v-col>
            </v-row>

            <v-row align="center" class="mt-0">
              <v-col align="right" cols="2"> ยืนยันรหัสผ่านใหม่ </v-col>
              <v-col class="ml-5" md="4">
                <form class="">
                  <input
                    type="password"
                    id="confirm-password"
                    name="confirm-password"
                    placeholder="ยืนยันรหัสผ่านใหม่"
                    v-model="confirmPassword"
                  />
                </form>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="2"></v-col>
              <v-col class="ml-5" cols="2">
                <v-btn
                  color="blue"
                  class="white--text"
                  :disabled="checkPassword"
                  @click="updatePassword"
                >
                  บันทึก
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-card>

      <!-- ประวัติการสั่งซื้อ -->
      <v-card
        v-if="selectedMenu === 'Order History'"
        width="1100"
        elevation="0"
      >
        <v-card class="pl-4" elevation="4" width="1100" >
          <v-card-title class="ml-2"> ประวัติการสั่งซื้อ</v-card-title>
          <v-divider class="mx-4 mb-4"></v-divider>
          <div v-if="order">
            <OrderCard v-for="(item, index) in order" :key="index" :order="item"  /> 
          </div>
          <v-card> </v-card>
        </v-card>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import OrderCard from '../components/order-card.vue'

export default {
  components: {
    OrderCard
  },
  data: () => ({
    menuList: [
      { title: "Account", icon: "mdi-account" },
      { title: "Order History", icon: "mdi-history" },
    ],
    items: ["Male", "Female"],
    activePicker: null,
    selectedMenu: "Account",
    menu: false,
    userInfo: {
      name: "",
      gender: "",
      date: null,
      address: "",
      email: "",
      telNo: ""
    },
    password: "",
    newPassword: "",
    confirmPassword: "",
  }),
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },

    changeMenu(title) {
      this.selectedMenu = title;
    },
    updateUser(){
      this.userInfo.dateOfBirth = new Date (this.userInfo.dateOfBirth).toISOString()
      this.$store.dispatch('saveUser', this.userInfo)
    },
    updatePassword(){
      
    },
  },

  created() {
    this.oldUserInfo = this.$store.getters.authorizedUser
    this.$store.dispatch('getUserOrder', {id: this.oldUserInfo.id})
    this.userInfo = {
      id: this.oldUserInfo.id,
      name: this.oldUserInfo.name,
      gender: this.oldUserInfo.gender,
      dateOfBirth: this.oldUserInfo.dateOfBirth.substring(0,10),
      address: this.oldUserInfo.address,
      email: this.oldUserInfo.email,
      telNo: this.oldUserInfo.telNo,
      password: this.oldUserInfo.password,
      passwordSalt: this.oldUserInfo.password,
    };

    
  },

  computed: {
    checkPassword() {
      if (
        this.password.length > 0 &&
        this.newPassword.length > 0 &&
        this.confirmPassword.length > 0
      ) {
        return false;
      }
      return true;
    },
    checkAccount() {
      if (
        (this.userInfo.name !== this.oldUserInfo.name ||
        this.userInfo.gender !== this.oldUserInfo.gender ||
        this.userInfo.date !== this.oldUserInfo.date ||
        this.userInfo.address !== this.oldUserInfo.address ||
        this.userInfo.email !== this.oldUserInfo.email ||
        this.userInfo.telNo !== this.oldUserInfo.telNo ) || (!isNaN(this.userInfo.telNo) && this.userInfo.telNo.length === 10 )
      ) {
        return false;
      }
      return true;
    },
    order(){
      let order = this.$store.getters.userOrder
      return order
    },
  },
};
</script>

<style scoped>
input[type="text"] {
  width: 100%;
  padding: 5px 10px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
input[type="password"] {
  width: 100%;
  padding: 5px 10px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.profile-container {
  display: flex;
  margin-bottom: 100px;
  flex-direction: columns;
  justify-content: center;
}

.profile-menu {
  margin-right: 4rem;
}

.profile__item {
  color: rgb(247, 247, 247);
  cursor: pointer;
}

.profile__item:hover {
  color: black;
}

.menu-list {
  border-left: 1px solid rgb(196, 196, 196);
}
</style>
