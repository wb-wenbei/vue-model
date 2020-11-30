/*考核记录api*/
import http from "@/server/http.js";

//列表（分页）
export const pageAPI = params => {
  return http({
    url: "/api-customer/community/assessment/list",
    method: "GET",
    params
  });
};

//考核记录明细列表
export const detailListAPI = params => {
  return http({
    url: "/api-customer/community/assessmentDetail/list",
    method: "GET",
    params
  });
};

// 新增考核记录明细
export const detailAddAPI = data => {
  return http({
    method: "POST",
    url: `/api-customer/community/assessmentDetail/add`,
    data
  });
};

//考核记录明细删除
export const detailDeleteAPI = params => {
  return http({
    method: "DELETE",
    url: `/api-customer/community/assessmentDetail/delete?id=${params.id}`
  });
};

//考核记录明细豁免
export const detailExemptionAPI = params => {
  return http({
    method: "PUT",
    url: `/api-customer/community/assessmentDetail/exemption?id=${params.id}`
  });
};

//考核记录雷达图
export const radarAPI = params => {
  return http({
    method: "GET",
    url: `/api-customer/community/assessmentDetail/radar`,
    params
  });
};
