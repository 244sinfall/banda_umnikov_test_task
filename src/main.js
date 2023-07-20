import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import {createRouter, createWebHistory} from 'vue-router';
import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primeicons/primeicons.css';
import ToastService from 'primevue/toastservice';
import './utils';
import {createStore} from "vuex";
import 'primeflex/primeflex.css';
import MainPage from "@/MainPage.vue";
import CafePage from "@/CafePage.vue";
import App from "@/App.vue";
const app = createApp(App);
const router = new createRouter({
    routes: [{
        path: '/',
        name: 'Main',
        component: MainPage
    }, {
        path: '/cafe/:id',
        name: 'cafe',
        component: CafePage
    }],
    history: createWebHistory()
})
const store = createStore({
    state () {
        return {
            cafe: null,
            cafes: null,
        }
    },
    getters: {
      getCafe: (state) => cafeId => {
          if(state.cafe && state.cafe.id === cafeId) {
              return state.cafe;
          }
          const cachedCafe = state.cafes?.find(cafe => cafe.id === cafeId)
          if(cachedCafe){
              return cachedCafe;
          }
          return null
      },
    },
    actions: {
      fetchCafes: async(context) => {
          const res = await fetch('https://bandaumnikov.ru/api/test/site/get-index')
          const json = await res.json();
          context.commit("setCafes", json.data)
      },
      fetchCafe: async(context, id) => {
          const res = await fetch(`https://bandaumnikov.ru/api/test/site/get-view?id=${id}`)
          const json = await res.json();
          context.commit('setCurrentCafe', json.data)
      }
    },
    mutations: {
        setCafes (state, cafes) {
            state.cafes = cafes;
        },
        setCurrentCafe (state, cafe) {
            state.cafe = cafe;
        }
    }
})
app.use(PrimeVue);
app.use(router)
app.use(ToastService);
app.use(store);
app.mount('#app');