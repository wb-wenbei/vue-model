import { typeListAPI, getChildrenAPI } from "@/api/common/dictionary";

const types = {
  CASE_REASON: 20, //报案缘由
  CASE_DIMENSION: 10, //案件维度
  COMMUNITY_LEVEL: 11, //社区等级
  COMMUNITY_TYPE: 12, //社区类型
  PROJECT_NATURE: 13 //项目性质
};

export async function getTypeList(type) {
  return await typeListAPI({ typeCode: types[type] });
}

export async function getTypeChildren(typeCode) {
  return await getChildrenAPI({ typeCode: typeCode });
}
