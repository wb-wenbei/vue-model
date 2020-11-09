import http from "@/server/http.js";

export const loginAPI = data => {
  return http({
    url: "/api-customer/user/login",
    method: "POST",
    data
  });
};

export const logoutAPI = () => {
  return http({
    url: "/api-customer/user/logout",
    method: "GET"
  });
};

export const updatePwdAPI = (data = {}) => {
  return http({
    url: "/api-customer/user/update_password",
    method: "PUT",
    data
  });
};

export const getUserInfoAPI = (options = {}) => {
  return http({
    url: "/api-customer/user/userInfo",
    method: "get",
    data: options.data
  });
};
