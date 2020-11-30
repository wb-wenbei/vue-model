import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

import state from "./state";
import mutations from "./mutations";
import actions from "./actions";
import auth from "./modules/auth";
import tagsView from "./modules/tagsView";

const reducer = val => {
  return {
    userInfo: val.userInfo,
    auth: val.auth,
    permission: val.permission,
    baseOrgList: val.baseOrgList
  };
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: { auth, tagsView },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      reducer: reducer
    })
  ]
});
