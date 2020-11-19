const mutations = {
  SET_CUSTOMER_ID(state, customerId) {
    Object.assign(state.customerId, customerId);
  },
  SET_ORG_IDS(state, orgIds) {
    state.orgIds = orgIds;
  },
  SET_USER_INFO(state, userInfo) {
    Object.assign(state.userInfo, userInfo);
  },
  SET_BASE_ORG_LIST(state, baseOrgList) {
    state.baseOrgList = baseOrgList;
  }
};

export default mutations;
