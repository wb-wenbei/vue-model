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

//考核策略考核评价占比
export const policyEvaluateRatioAPI = params => {
  return http({
    url: "/api-customer/community/dataStatistics/policyEvaluateRatio",
    method: "GET",
    params
  });
};

//近12个月案件变化趋势
export const queryTwelveMonthCaseDataAPI = params => {
  return http({
    url: "/api-customer/community/dataStatistics/queryTwelveMonthCaseData",
    method: "GET",
    params
  });
};

//近12个月各社区案件数量变化趋势
export const queryTwelveMonthCaseDataByCommunityAPI = params => {
  return http({
    url:
      "/api-customer/community/dataStatistics/queryTwelveMonthCaseDataByCommunity",
    method: "GET",
    params
  });
};

//近12个月各社区分值变化趋势
export const queryTwelveMonthDataAPI = params => {
  return http({
    url: "/api-customer/community/dataStatistics/queryTwelveMonthData",
    method: "GET",
    params
  });
};

//大屏-3个月案件数量
export const queryCaseRatioAPI = params => {
  return http({
    url: "/api-customer/community/dataStatistics/queryCaseRatio",
    method: "GET",
    params
  });
};

//大屏-3个月各社区案件数量
export const queryThreeMonthCaseNumberAPI = params => {
  return http({
    url: "/api-customer/community/dataStatistics/queryThreeMonthCaseNumber",
    method: "GET",
    params
  });
};

//大屏-分布图
export const queryCommunityForScoreAPI = params => {
  return http({
    url: "/api-customer/community/dataStatistics/queryCommunityForScore",
    method: "GET",
    params
  });
};
