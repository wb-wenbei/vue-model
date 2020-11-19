import http from "@/server/http.js";

// 获取组织机构
export const getAllOrgAPI = params => {
  return http({
    url: "/api-customer/account/queryAccessableOrganizationsByOrgIds",
    method: "get",
    params
  });
};

// 获取组织机构配置项
export const getAllOrgSettingAPI = params => {
  return http({
    url: "/api-customer/organization/queryOwnOrganization",
    method: "get",
    params
  });
};

export const orgAddAPI = data => {
  return http({
    url: `/api-customer/account/organization/insert`,
    method: "POST",
    data
  });
};

export const orgUpdateAPI = data => {
  return http({
    url: `/api-customer/account/organization/update`,
    method: "POST",
    data
  });
};

export const orgDeleteAPI = params => {
  return http({
    url: `/api-customer/account/organization/delete`,
    method: "DELETE",
    params
  });
};

// 获取缓存组织机构
export const getBaseOrganizationAPI = () => {
  return http({
    method: "GET",
    url: `/api-customer/account/queryAccessableOrganizationsCache`
  });
};
