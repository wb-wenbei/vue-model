import { getToken } from "../../utils/auth";
import { getPermissionAPI } from "@/api/auth";

/**
 * @param {Array} arr
 * @param {Array} 拍平后的数组
 */
const flatArr = arr => {
  let result = [];
  arr.forEach(item => {
    if (item.children && item.children.length) {
      result.push(...flatArr(item.children));
    } else if (item.sonMenus && item.sonMenus.length) {
      result.push(...flatArr(item.sonMenus));
    }
    result.push(item);
  });
  return result;
};

/**
 * @param {Array} menus 所有的
 * @returns {Array} 返回菜单的权限的code组成的数组
 */
const getMenuCode = menus => {
  let menuC = flatArr(JSON.parse(JSON.stringify(menus)));
  let result = [];
  menuC.length &&
    menuC.forEach(item => {
      result.push(item.code);
    });
  return result;
};

const auth = {
  state: {
    token: getToken(),
    permission: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_PERMISSION: (state, permission) => {
      state.permission = [];
      let array = getMenuCode(permission);
      state.permission = [...array, ""];
    },
  },
  actions: {
    setPermission: ({ commit }) => {
      getPermissionAPI().then(res => {
        commit("SET_PERMISSION", res.menuDtos)
      });
    }
  }
};

export default auth;
