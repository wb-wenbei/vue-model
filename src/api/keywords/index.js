/*关键词管理api*/
import http from "@/server/http.js";

//列表（分页）
export const pageAPI = params => {
  return http({
    url: "/api-customer/community/keyword/list",
    method: "GET",
    params
  });
};

//列表
export const getAllAPI = params => {
  return http({
    url: "/api-customer/community/keyword/getAll",
    method: "GET",
    params
  });
};

// 新增
export const addAPI = data => {
  return http({
    method: "POST",
    url: `/api-customer/community/keyword/add`,
    data
  });
};

// 编辑
export const updateAPI = data => {
  return http({
    method: "PUT",
    url: `/api-customer/community/keyword/update`,
    data
  });
};

//删除
export const deleteAPI = params => {
  return http({
    method: "DELETE",
    url: `/api-customer/community/keyword/delete?id=${params.id}`
  });
};
