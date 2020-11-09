import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

import state from "./state";
import mutations from "./mutations";
import actions from "./actions";
import auth from "./modules/auth";

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: { auth },
  plugins: [createPersistedState()]
});
