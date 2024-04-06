import Vue from "vue";
import Vuex from "vuex";

const state = {
    specials : [
        {
            image: "/img/promo3.jpg",
            text: "เก็บตกงานหนังสือลดล้างคลัง 20% สูงสุด 1,200 บาท"
        },
        {
            image: "/img/promo2.jpg",
            text: "ฉลอง 3.3 ลดทั้งเว็บ 20%"
        },
        {
            image: "/img/promo4.jpg",
            text: "ลดทั้งเว็บ 15% เมื่อซื้อครบ 4 เล่นลดเพิ่มสูงสุด 20%"
        }
    ],
    menus: [
        {
            image: "/img/1.jpg",
            text: "My hero acadamia",
            price: 70,
            love: false
        },
        {
            image: "/img/2.jpg",
            text: "My hero acadamia",
            price: 70,
            love: true
        },
        {
            image: "/img/4.jpg",
            text: "Kimetsu no yaiba",
            price: 60,
            love: false
        },
        {
            image: "/img/5.jpg",
            text: "Kimetsu no yaiba",
            price: 60,
            love: false
        },
        {
            image: "/img/10.jpg",
            text: "Your name",
            price: 80,
            love: false
        },
        {
            image: "/img/11.jpg",
            text: "Jujutsu Kaisen",
            price: 70,
            love: false
        }
    ],
    orders : [],
    orderInfo: null
};

const getters = {
    specials(state) {
        return state.specials;
    },
    menus(state) {
        return state.menus;
    },
    haveOrders(state) {
        return state.orders.length > 0;
    },
    numberOfOrders(state) {
        return state.orders.length;
    },
    orders(state) {
        return state.orders;
    }
};

const mutations = {
    ADD_ORDER(state, order) {
        state.orders.push(order);
    },
    DELETE_ORDER(state, index) {
        state.orders.splice(index, 1);
    },
    SUBMIT_ORDER(state, orderInfo) {
        state.orderInfo = orderInfo;
    },
    CLEAR_ORDER(state) {
        state.orders = [];
    }
};

Vue.use(Vuex);

const store = new Vuex.Store({
    state,
    getters,
    mutations
});

export default store;