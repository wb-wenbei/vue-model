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

// 物业/居委
const entity_type = {
  PROPERTY: 2, //物业
  COMMITTEE: 1 //居委
};

export function getEntityType(type) {
  return entity_type[type];
}

export async function getTypeList(type) {
  return typeListAPI({ typeCode: types[type] });
}

export async function getTypeChildren(typeCode) {
  return getChildrenAPI({ typeCode: typeCode });
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

/**
 * 数组格式转树形格式
 * @param list
 * @returns {[]}
 */
export function listToTree(list) {
  let map = {},
    root = [],
    i;
  for (i = 0; i < list.length; i++) {
    map[list[i].id] = i;
  }
  for (i = 0; i < list.length; i++) {
    let node = list[i];
    if (list[i].parentId !== 1 && list[map[node.parentId]]) {
      if (!list[map[node.parentId]].children) {
        list[map[node.parentId]].children = [];
      }
      list[map[node.parentId]].children.push(node);
    } else {
      root.push(node);
    }
  }
  return root;
}

export function deleteNullChild(tree, children = "children") {
  return tree.map(item => {
    if (!item[children] || !item[children].length) {
      delete item[children];
    } else {
      item[children] = deleteNullChild(item[children], children);
    }
    return item
  });
}
