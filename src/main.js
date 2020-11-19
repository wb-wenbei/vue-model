import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./icons";

import ElementUI from "element-ui";
import "./styles/element-variables.scss";
import "./styles/index.scss";
import "./filters/index";

Vue.use(ElementUI, { size: "small" });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
