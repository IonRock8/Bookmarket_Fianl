<template>
  <v-container>
    <v-card>
      <v-card-title>รายการสินค้าในตระกร้า</v-card-title>

      <v-list>
        <v-list-item v-for="(item, index) in orders" :key="index">
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
            <v-list-item-subtitle>
              ราคา {{ item.price }} x {{ item.quantity }} =
              {{ item.price * item.quantity }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon @click="deleteOrder">
              <v-icon color="red">mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <v-card-text class="text-center display-1">รวมเป็นเงิน {{ totalPrice }} บาท</v-card-text>

      <v-divider></v-divider>

      <v-form v-model="valid">
        <v-card-text>
          <p>วิธีการส่งสินค้า</p>

          <v-radio-group v-model="shippingType">
            <v-radio label="มารับสินค้าที่ร้าน" value="picking"></v-radio>
            <v-radio label="ให้ส่งมายังที่อยู่ด้านล่าง" value="shipping"></v-radio>
          </v-radio-group>

          <v-textarea
            v-if="shippingType=='shipping'"
            :rules="[v=>!!v||'โปรดกรอกที่อยู่']"
            v-model="shippingAddress"
            label="ที่อยู่จัดส่งสินค้า"
            filled
          ></v-textarea>

          <v-text-field
            :rules="[v=>!!v||'โปรดกรอกเบอร์โทรศัพท์']"
            v-model="telephone"
            label="เบอร์โทรศัพท์"
            filled
          ></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text>
          <p>วิธีการชำระเงิน</p>

          <v-radio-group v-model="paymentMethod">
            <v-radio label="ชำระเงินปลายทาง" value="cash"></v-radio>
            <v-radio label="ชำระเงินผ่าน e-Banking" value="eBanking"></v-radio>
            <v-radio label="ชำระเงินผ่านบัตรเครดิต" value="credit"></v-radio>
          </v-radio-group>
        </v-card-text>
      </v-form>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn x-large color="green" class="white--text" :disabled="valid==false" @click="submitOrder">ชำระเงิน</v-btn>
        <v-spacer></v-spacer>
        <v-btn x-large to="/">กลับไปหน้าหลัก</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import firebase from 'firebase/app'; // Import firebase from 'firebase/app'
import 'firebase/firestore'; // Import firestore

export default {
  data() {
    return {
      valid: false,
      shippingType: "picking",
      shippingAddress: null,
      telephone: null,
      paymentMethod: "cash"
    };
  },

  computed: {
    orders() {
      return this.$store.getters.orders;
    },
    totalPrice() {
      var total = 0;

      this.orders.forEach(item => {
        total += item.price * item.quantity;
      });

      return total;
    }
  },

  methods: {
    deleteOrder(index) {
      console.log("Deleting order at index:", index);
      this.$store.commit("DELETE_ORDER", index);
    },
    submitOrder() {
      console.log("Submitting order...");
      const db = firebase.firestore();

      const orderData = {
        order: this.orders,
        totalPrice: this.totalPrice,
        shippingType: this.shippingAddress,
        telephone: this.telephone,
        paymentMethod: this.paymentMethod,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
  };

  // Submit order to Vuex store
  this.$store.commit("SUBMIT_ORDER", {
    shippingType: this.shippingType,
    shippingAddress: this.shippingAddress,
    telephone: this.telephone,
    paymentMethod: this.paymentMethod
  });

  console.log("Order submitted to Vuex store:", orderData);

  // Add orderData to firestore
  db.collection("order").add(orderData)
    .then((docRef) => {
      console.log("Document written with ID:", docRef.id);
      // Redirect to checkout-process with the document ID
      console.log("Redirecting to checkout-process...");
      this.$router.replace("/checkout-process");
      // Clear orders in Vuex store
      this.$store.commit("CLEAR_ORDERS");
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

  }
};
</script>
