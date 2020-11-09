import axios from "axios";
import store from "../store";
import router from "../router";

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
      } else if (code === 401) {
        console.error("请求错误(401)：" + data.message);
      } else if (code === 500) {
        return Promise.reject(data.message);
      }
    } else {
      return Promise.reject(response.status);
    }
  },
  error => {
    let code = 0;
    if (error.response) {
      code = error.response.status;
      if (code === 401) {
      } else if (code === 403) {
        router.push({ path: "/error/403" });
      } else if (code === 500) {
        router.push({ path: "/error/500" });
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
