import store from "../store";
const TokenKey = "token";
/**
 * 获取令牌
 * */
export function getToken() {
  return localStorage.getItem(TokenKey);
}

/**
 * 设置令牌
 * */
export function setToken(token) {
  if (!token) return false;
  store.commit("REMOVE_TOKEN", token);
  return localStorage.setItem(TokenKey, token);
}

/**
 * 删除令牌
 * */
export function removeToken() {
  store.commit("SET_TOKEN", "");
  return localStorage.removeItem(TokenKey);
}
