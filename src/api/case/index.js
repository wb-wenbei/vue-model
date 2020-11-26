/*案件管理api*/
import http from "@/server/http.js";

//列表（分页）
export const pageAPI = params => {
  return http({
    url: "/api-customer/community/case/list",
    method: "GET",
    params
  });
};

// 新增
export const addAPI = data => {
  return http({
    method: "POST",
    url: `/api-customer/community/case/add`,
    data
  });
};

// 编辑
export const updateAPI = data => {
  return http({
    method: "PUT",
    url: `/api-customer/community/case/update`,
    data
  });
};

//删除
export const deleteAPI = params => {
  return http({
    method: "DELETE",
    url: `/api-customer/community/case/delete?id=${params.id}`
  });
};

// 关键词匹配
export const matchKeyWordAPI = data => {
  return http({
    method: "POST",
    url: `/api-customer/community/case/matchKeyWord`,
    data
  });
};
