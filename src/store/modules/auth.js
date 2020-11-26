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
    token: "",
    permission: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    REMOVE_TOKEN: state => {
      state.token = "";
    },
    SET_PERMISSION: (state, permission) => {
      state.permission = [];
      let array = getMenuCode(permission);
      state.permission = [...array];
    },
    REMOVE_PERMISSION: state => {
      state.permission = [];
    }
  },
  actions: {
    setPermission: async ({ commit }) => {
      let res = await getPermissionAPI();
      commit("SET_PERMISSION", res.menuDtos);
      return res.menuDtos;
    }
  }
};

export default auth;
