import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from "./routes.js";
import store from "./store.js";
import firebase from "firebase/app";
import "firebase/firestore"; 
import settings from "./settings.js";

firebase.initializeApp(settings.firebaseConfig);

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')