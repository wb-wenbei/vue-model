import axios from "axios";
import store from "../store";

const http = axios.create({
  timeout: 60000
});

//request 拦截器
http.interceptors.request.use(
  config => {
    const token = store.state.auth.token;
    const customerId = store.state.customerId;
    const orgIds = store.state.orgIds;
    if (token) {
      config.headers.token = token;
    }
    if (customerId) {
      config.headers.customerId = customerId;
    }
    if (orgIds) {
      config.headers.orgIds = orgIds;
    }
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// response 拦截器
http.interceptors.response.use(
  response => {
    if (response.status === 200) {
      let code = response.data.code;
      let data = response.data;
      if (code === 200) {
        return data.data;
      } else {
        console.error("请求错误：" + data.message);
        return Promise.reject(data.message);
      }
    } else {
      console.error("请求错误：" + response.status);
      return Promise.reject(response.status);
    }
  },
  error => {
    let code = 0;
    if (error.response) {
      code = error.response.status;
      if (code === 401) {
        // Notify.info(err)
      } else {
        // Notify.info(err)
      }
    } else if (error.request) {
      // Notify.error(err)
    } else {
      // Notify.info(err)
    }
    return Promise.reject(error);
  }
);

export default http;
