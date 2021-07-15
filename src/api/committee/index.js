/*居委管理api*/
import http from "@/server/http.js";

//列表（分页）
export const pageAPI = params => {
  return http({
    url: "/api-customer/service-wisdom-town/propertyCommittee/query",
    method: "GET",
    params
  });
};

//列表
export const getAllAPI = params => {
  return http({
    url: "/api-customer/service-wisdom-town/propertyCommittee/queryAll",
    method: "GET",
    params
  });
};

// 新增
export const addAPI = data => {
  return http({
    method: "POST",
    url: `/api-customer/service-wisdom-town/propertyCommittee/insert`,
    data
  });
};

// 编辑
export const updateAPI = data => {
  return http({
    method: "PUT",
    url: `/api-customer/service-wisdom-town/propertyCommittee/update`,
    data
  });
};

//删除
export const deleteAPI = params => {
  return http({
    method: "DELETE",
    url: `/api-customer/service-wisdom-town/propertyCommittee/delete?id=${params.id}`
  });
};
