import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/api/fontAwesome.js"; // fontAwesomeIcon.js 불러옴
import "@/api/vueBootstrap.js";
import vueCookies from "vue-cookies"

Vue.config.productionTip = false;

Vue.use(vueCookies);

//쿠키 만료기간
Vue.$cookies.config("30d");

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
