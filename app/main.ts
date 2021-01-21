import Vue from "nativescript-vue";
import Main from "@/pages/Main.vue";

Vue.config.silent = TNS_ENV === "production";

new Vue({
  render: h => h(Main)
}).$start();
