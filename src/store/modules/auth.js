import { getToken } from "../../utils/auth";

const auth = {
  state: {
    token: getToken()
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    }
  }
};

export default auth;
