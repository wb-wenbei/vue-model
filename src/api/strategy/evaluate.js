/*策略评价管理api*/
import http from "@/server/http.js";

//列表
export const listAPI = params => {
  return http({
    url: "/api-customer/community/evaluate/list",
    method: "GET",
    params
  });
};

//列表（字典）
export const listAllAPI = params => {
  return http({
    url: "/api-customer/community/evaluate/listAll",
    method: "GET",
    params
  });
};

// 编辑
export const updateAPI = data => {
  return http({
    method: "PUT",
    url: `/api-customer/community/evaluate/update`,
    data
  });
};
