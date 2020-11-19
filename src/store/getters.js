const getters = {
  token: state => state.auth.token,
  roles: state => state.roles,
  userInfo: state => state.userInfo,
};
export default getters;
