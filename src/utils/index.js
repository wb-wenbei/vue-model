import { typeListAPI, getChildrenAPI } from "@/api/common/dictionary";

const types = {
  CASE_REASON: 32, //报案缘由
  CASE_DIMENSION: 31, //案件维度
  COMMUNITY_LEVEL: 11, //社区等级
  COMMUNITY_TYPE: 12, //社区类型
  PROJECT_NATURE: 13 //项目性质
  /*  security:14,  //治安管理
  security:15,  //消防管理
  security:16,  //人口管理
  security:17,  //公用设施
  security:18,  //生活服务
  security:19,  //车辆管理*/
};

export async function getTypeList(type) {
  return await typeListAPI({ typeCode: types[type] });
}

export async function getTypeChildren(typeCode) {
  return await getChildrenAPI({ typeCode: typeCode });
}

/**
 * @description: object 转为 string key=value
 * @param {Object}
 * @return: string
 */
export function getExportParams(paramsObj) {
  if (!paramsObj) return "";
  let result = Object.keys(paramsObj)
    .reduce((a, k) => {
      if (paramsObj[k]) {
        a.push(k + "=" + encodeURIComponent(paramsObj[k]));
      }
      return a;
    }, [])
    .join("&");
  return result;
}
