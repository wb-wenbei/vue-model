/*地址管理api*/
import http from "@/server/http.js";

//列表（分页）
export const pageAPI = params => {
  return http({
    url: "/api-customer/service-wisdom-town/communityAliasAddress/list",
    method: "GET",
    params
  });
};

// 添加社区扩展地址
export const addAddressAPI = data => {
  return http({
    method: "POST",
    url: `/api-customer/service-wisdom-town/community/address/add`,
    data
  });
};

// 添加社区扩展地址
export const updateAddressAPI = data => {
  return http({
    method: "PUT",
    url: `/api-customer/service-wisdom-town/community/address/update`,
    data
  });
};
// 删除社区扩展地址
export const deleteAddressAPI = params => {
  return http({
    method: "DELETE",
    url: `/api-customer/service-wisdom-town/community/address/delete`,
    params
  });
};

// 添加社区别名
export const addAliasAPI = data => {
  return http({
    method: "POST",
    url: `/api-customer/service-wisdom-town/community/alias/add`,
    data
  });
};

// 添加社区别名
export const updateAliasAPI = data => {
  return http({
    method: "PUT",
    url: `/api-customer/service-wisdom-town/community/alias/update`,
    data
  });
};
// 删除社区别名
export const deleteAliasAPI = params => {
  return http({
    method: "DELETE",
    url: `/api-customer/service-wisdom-town/community/alias/delete`,
    params
  });
};
