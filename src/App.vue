<template>
  <v-app>
    <v-app-bar app color="blue" dark>
      <v-icon class="mr-5">mdi-book-outline</v-icon>
      <v-toolbar-title>Bookmarket</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>โปรไฟล์</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="signout">
            <v-list-item-title class="red--text">ออกจากระบบ</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-content>
      <router-view></router-view>

      <!-- แสดงข้อมูล Firestore ในรูปแบบตาราง -->
      <div v-if="orders.length > 0">
        <h2>รายการสั่งซื้อ</h2>
        <table>
          <thead>
            <tr>
              <th>รหัสการสั่งซื้อ</th>
              <th>จำนวนเงินทั้งหมด(บาท)</th>
              <th>เบอร์โทร</th>
              <th>วิธีการชำระ</th>
              <th>วิธีการชำระ</th>
              <!-- เพิ่มส่วนหัวตารางตามต้องการ -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in orders" :key="index">
              <td>{{ order.id }}</td>
              <td>{{ order.data().totalPrice }}</td>
              <td>{{ order.data().telephone }}</td>
              <td>{{ order.data().paymentMethod }}</td>
              <td>{{ order.data().quantity }}</td>
              <!-- เพิ่มส่วนเซลล์ของตารางตามต้องการ -->
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p>ไม่พบรายการสั่งซื้อ</p>
      </div>  
    </v-content>

  </v-app>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default {
  name: "App",
  data() {
    return {
      orders: []
    };
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if (user == null) this.$router.replace("/signin");
      else this.$router.replace("/");
    });

    // Retrieve orders from Firestore
    this.fetchOrders();
  },
  methods: {
    signout() {
      firebase.auth().signOut();
    },
    fetchOrders() {
      firebase
        .firestore()
        .collection("order")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.orders.push(doc);
          });
        })
        .catch(error => {
          console.error("Error fetching orders: ", error);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.v-application {
  font-family: "Kanit";
}
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 8px;
  border: 1px solid #dddddd;
  text-align: left;
}

/* เพิ่มระยะห่างของช่อง */
td {
  padding-top: 12px;
  padding-bottom: 12px;
}
</style>