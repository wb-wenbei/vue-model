/*社区管理api*/
import http from "@/server/http.js";

//小区排名查询（分页）
export const communityScoreRankAPI = params => {
  return http({
    url: "/api-customer/community/dataStatistics/communityScoreRank",
    method: "GET",
    params
  });
};

//考核评价占比
export const evaluateRatioAPI = params => {
  return http({
    url: "/api-customer/community/dataStatistics/evaluateRatio",
    method: "GET",
    params
  });
};
