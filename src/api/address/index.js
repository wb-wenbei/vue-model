/*地址管理api*/
import http from "@/server/http.js";

//列表（分页）
export const pageAPI = params => {
  return http({
    url: "/api-customer/communityAliasAddress/list",
    method: "GET",
    params
  });
};

// 添加社区扩展地址
export const addAddressAPI = data => {
  return http({
    method: "POST",
    url: `/api-customer/community/address/add`,
    data
  });
};

// 添加社区扩展地址
export const updateAddressAPI = data => {
  return http({
    method: "PUT",
    url: `/api-customer/community/address/update`,
    data
  });
};
// 删除社区扩展地址
export const deleteAddressAPI = data => {
  return http({
    method: "DELETE",
    url: `/api-customer/community/address/delete`,
    data
  });
};

// 添加社区别名
export const addAliasAPI = data => {
  return http({
    method: "POST",
    url: `/api-customer/community/alias/add`,
    data
  });
};

// 添加社区别名
export const updateAliasAPI = data => {
  return http({
    method: "PUT",
    url: `/api-customer/community/alias/update`,
    data
  });
};
// 删除社区别名
export const deleteAliasAPI = data => {
  return http({
    method: "DELETE",
    url: `/api-customer/community/alias/delete`,
    data
  });
};
