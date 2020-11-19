import http from "@/server/http.js";

//角色列表（分页）
export const pageAPI = params => {
  return http({
    url: "/api-customer/account/web/rolesWithPage",
    method: "GET",
    params
  });
};

//角色删除
export const deleteAPI = params => {
  return http({
    method: "delete",
    url: `/api-customer/account/web/role?roleId=${params.id}`
  });
};

// 角色新增
export const addAPI = data => {
  return http({
    method: "POST",
    url: `/api-customer/account/web/role`,
    data
  });
};

// 角色编辑
export const updateAPI = data => {
  return http({
    method: "PUT",
    url: `/api-customer/account/web/role`,
    data
  });
};

// 获取权限菜单
export const getRoleMenuAPI = () => {
  return http({
    method: "get",
    url: `/api-customer/account/web/menus/my`
  });
};

// 角色列表查询
export const listAPI = () => {
  return http({
    method: "GET",
    url: "/api-customer/account/web/roles"
  });
};
