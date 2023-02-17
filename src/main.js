import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "vue-awesome/icons";
import Icon from "vue-awesome/components/Icon";
import GAuth from "vue-google-oauth2";
import "@/axios";
import "@/icons";
import "@/scss/main.scss";
import VueEditor from "vue2-editor";
import { typeTimeDefault, timeSince } from "@/utils/dateTime.js";

Vue.use(VueEditor);
Vue.component("icon", Icon);
Vue.config.productionTip = false;

Vue.mixin({
  methods: {
    typeTimeDefault,
    timeSince,
  },
});

const gauthOption = {
  clientId:
    "441257587677-4ed2telmjvv629t7gkpf69bsu8fc3gfd.apps.googleusercontent.com",
  scope: "profile email",
  prompt: "consent",
};
Vue.use(GAuth, gauthOption);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
