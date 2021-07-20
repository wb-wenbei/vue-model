/*案件管理api*/
import http from "@/server/http.js";

//列表（分页）
export const pageAPI = params => {
  return http({
    url: "/api-customer/community/caseManagementMatch/page",
    method: "GET",
    params
  });
};

// 编辑
export const updateAPI = data => {
  return http({
    method: "PUT",
    url: `/api-customer/community/caseManagementMatch/update`,
    data
  });
};

//删除
export const deleteAPI = params => {
  return http({
    method: "DELETE",
    url: `/api-customer/community/caseManagementMatch/delete?id=${params.id}`
  });
};

// 案件入库
export const submitAPI = data => {
  return http({
    method: "POST",
    url: `/api-customer/community/caseManagementMatch/commit`,
    data
  });
};
