<template>
  <v-container>
    <v-card>
      <v-img
        height="auto"
        :src="menu.image"
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      >
        <v-card-title>{{ menu.text }} {{ menu.price }} บาท</v-card-title>
      </v-img>

      <v-card-actions>
        <v-btn icon x-large @click="decQuantity">
          <v-icon>mdi-minus-circle-outline</v-icon>
        </v-btn>

        <v-spacer></v-spacer>

        <strong class="display-1">{{ quantity }}</strong>

        <v-spacer></v-spacer>

        <v-btn icon x-large @click="incQuantity">
          <v-icon>mdi-plus-circle-outline</v-icon>
        </v-btn>
      </v-card-actions>

      <v-card-text class="text-center">
          <strong class="display-1">รวมเป็นเงิน {{ quantity * menu.price }} บาท</strong>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
          <v-btn x-large color="blue" dark @click="addOrder">เพิ่มลงตระกร้า</v-btn>
          <v-spacer></v-spacer>
          <v-btn x-large @click="$router.go(-1)">ยกเลิก</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      quantity: 1
    };
  },

  computed: {
    menu() {
      var id = this.$route.params.id;
      return this.$store.getters.menus[id];
    }
  },

  methods: {
      incQuantity() {
          if(this.quantity < 50) this.quantity++;
      },
      decQuantity() {
          if(this.quantity > 1) this.quantity--;
      },
      addOrder() {
          this.$store.commit("ADD_ORDER", {
              id:  this.$route.params.id,
              price: this.menu.price,
              text: this.menu.text,
              quantity: this.quantity
          });

          this.$router.go(-1);
      }
  }
};
</script>
