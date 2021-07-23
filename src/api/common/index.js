import http from "@/server/http.js";

// 组织机构或组织机构权限更新时更新token关联内容
export const reloadToken = data => {
  return http({
    url: `/api-customer/user/reloadToken`,
    method: "post",
    data
  });
};
