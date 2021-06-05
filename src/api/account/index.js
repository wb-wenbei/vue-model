/*账号管理api*/
import http from "@/server/http.js";

export const getUserListAPI = params => {
  return http({
    method: "GET",
    url: "/api-customer/entity/user/queryUserBounds",
    params
  });
};

// 角色权限
export const getRolesListAPI = () => {
  return http({
    method: "GET",
    url: "/api-customer/account/web/roles"
  });
};
// 职员账号添加
export const addUserBoundsAPI = data => {
  return http({
    method: "POST",
    url: "/api-customer/account/user/userBounds",
    data
  });
};

// 职员账号编辑
export const editUserBoundsAPI = data => {
  return http({
    method: "PUT",
    url: "/api-customer/account/user/userBounds",
    data
  });
};

// 职员账号绑定删除
export const delUserBoundsAPI = params => {
  return http({
    method: "DELETE",
    url: "/api-customer/account/user/userBounds",
    params
  });
};

// 职员账号绑定批量删除
export const delBatchUserBoundsAPI = params => {
  return http({
    method: "DELETE",
    url: "/api-customer/account/user/batchUserBounds",
    params
  });
};

// 审批账号权限-编辑
export const approvalAccountEditAPI = data => {
  return http({
    method: "PUT",
    url: "/api-customer/sanitation-paas-manage/approvalAccount/edit",
    data
  });
};

// 审批账号权限-列表查询
export const approvalAccountListAPI = params => {
  return http({
    method: "GET",
    url: `/api-customer/sanitation-paas-manage/approvalAccount/list`,
    params
  });
};

//用户名列表
export const getAccountListAPI = () => {
  return http({
    method: "GET",
    url: "/api-customer/account/user/users"
  });
};
