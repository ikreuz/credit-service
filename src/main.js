import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
//
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "@mdi/font/css/materialdesignicons.css";
import "@/assets/scss/style.scss";
import "@/assets/scss/login.scss";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import jsCookie from "js-cookie";
import VueMeta from "vue-meta";
import { VueReCaptcha } from "vue-recaptcha-v3";
//
Vue.config.productionTip = false;
Vue.use(jsCookie);
Vue.use(VueMeta);
Vue.use(VueReCaptcha, {
  siteKey: "6LdqZC0cAAAAADHJS7yfVTZBtdhFZDXV1SliXkme",
  version: 3, // Version
  size: "compact", // Size: 'compact', 'normal', 'invisible' (v2)
  loaderOptions: {
    useRecaptchaNet: true,
    autoHideBadge: true,
  },
});
Vue.use(Toast, {
  // Can be either a string or an array of strings
  containerClassName: "diana-toast__container",
  // For the actual toast, including different toast types:
  toastClassName: ["diana-toast"],
  // For the toast body when using strings or a custom component as content
  bodyClassName: [
    "diana-toast__body",
    "diana-toast__component-body",
    "text-truncate",
    "text-no-wrap",
  ],
});
//
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
