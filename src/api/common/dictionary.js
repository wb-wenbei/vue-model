import http from "@/server/http.js";

export const typeListAPI = params => {
  return http({
    url: `/api-customer/entity/typeList/${params.typeCode}`,
    method: "GET"
  });
};

export const getChildrenAPI = params => {
  return http({
    url: `/api-customer/entity/typeList/getChildren/${params.typeCode}`,
    method: "GET"
  });
};

export const getAdministrativeTreeAPI = params => {
  return http({
    method: "GET",
    url: `/api-customer/green-account/greenAccount/getAdministrativeTree`,
    params
  });
};
