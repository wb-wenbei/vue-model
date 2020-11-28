/*策略管理api*/
import http from "@/server/http.js";

//列表（分页）
export const pageAPI = params => {
  return http({
    url: "/api-customer/community/policy/list",
    method: "GET",
    params
  });
};

// 新增
export const addAPI = data => {
  return http({
    method: "POST",
    url: `/api-customer/community/policy/add`,
    data
  });
};

// 编辑
export const updateAPI = data => {
  return http({
    method: "PUT",
    url: `/api-customer/community/policy/update`,
    data
  });
};

//删除
export const deleteAPI = params => {
  return http({
    method: "DELETE",
    url: `/api-customer/community/policy/delete?id=${params.id}`
  });
};

//停用/启用
export const enablePolicyAPI = params => {
  return http({
    method: "PUT",
    url: `/api-customer/community/policy/enablePolicy`,
    params
  });
};

//策略关联查询
export const relevanceAPI = params => {
  return http({
    method: "GET",
    url: `/api-customer/community/policy/relevance`,
    params
  });
};

//策略关联查询
export const updateRelevanceAPI = data => {
  return http({
    method: "PUT",
    url: `/api-customer/community/policy/updateRelevance`,
    data
  });
};
