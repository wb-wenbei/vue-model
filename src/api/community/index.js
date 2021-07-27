/*社区管理api*/
import http from "@/server/http.js";

//列表（分页）
export const pageAPI = params => {
  return http({
    url: "/api-customer/service-wisdom-town/community/list",
    method: "GET",
    params
  });
};

//列表
export const getAllAPI = params => {
  return http({
    url: "/api-customer/service-wisdom-town/community/getAll",
    method: "GET",
    params
  });
};

// 新增
export const addAPI = data => {
  return http({
    method: "POST",
    url: `/api-customer/service-wisdom-town/community/insert`,
    data
  });
};

// 编辑
export const updateAPI = data => {
  return http({
    method: "PUT",
    url: `/api-customer/service-wisdom-town/community/update`,
    data
  });
};

//删除
export const deleteAPI = params => {
  return http({
    method: "DELETE",
    url: `/api-customer/service-wisdom-town/community/delete?id=${params.id}`
  });
};

//管理民警查询
export const queryPoliceAPI = params => {
  return http({
    url: "/api-customer/service-wisdom-town/community/queryPolice",
    method: "GET",
    params
  });
};
