const mutations = {
  SET_CUSTOMER_ID(state, customerId) {
    Object.assign(state.customerId, customerId);
  },
  SET_ORG_IDS(state, orgIds) {
    Object.assign(state.orgIds, orgIds);
  },
  SET_USER_INFO(state, userInfo) {
    Object.assign(state.userInfo, userInfo);
  }
};

export default mutations;
