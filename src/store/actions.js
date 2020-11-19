import { getBaseOrganizationAPI } from "@/api/organize/index";

const actions = {
  setBaseOrgList({ commit }) {
    getBaseOrganizationAPI().then(res => {
      if (res) {
        commit("SET_BASE_ORG_LIST", [res]);
      } else {
        commit("SET_BASE_ORG_LIST", []);
      }
    });
  }
};

export default actions;
