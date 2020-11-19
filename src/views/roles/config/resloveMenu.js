// 将数组里面的children项排出来。固定2层。
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

// menuItem 为一个对象。menuConfig为配置项的数组(只有需要显示的项)
/**
 * 匹配跳转的菜单
 * @param {Array} allMenu 所有的菜单
 * @param {Array} menuConfig 需要显示的菜单
 * @param {String} path 需要进入的路由地址
 * @returns {Boolean} 是否匹配成功，成功可以跳转，不成功不能跳转
 */
const matchJumpMenu = (allMenu, menuConfig, path) => {
  if (path === "/home") {
    return true;
  }
  // 所有的菜单.先拍平.目前2层
  let allMenuComp = [];
  allMenu.forEach(menuItem => {
    allMenuComp.push(menuItem);
    if (menuItem.children) {
      allMenuComp.push(...menuItem.children);
    }
  });
  // 先拍平.目前2层
  let menuConfigCopy = [];
  menuConfig.forEach(menuItem => {
    menuConfigCopy.push(menuItem);
    if (menuItem.sonMenus) {
      menuConfigCopy.push(...menuItem.sonMenus);
    }
  });
  // 找出需要跳转的菜单。在全部菜单中肯定能找到的.除了home
  let judgeMenu;
  allMenuComp.forEach(menuItem => {
    if (menuItem.route === path) {
      judgeMenu = menuItem;
    }
  });
  // 是否实际存在。true存在(code对应着菜单的index)
  let isExist = false;
  for (let i = 0; i < menuConfigCopy.length; i++) {
    if (menuConfigCopy[i].code === judgeMenu.index) {
      isExist = true;
      break;
    }
  }
  return !!isExist;
};
/**
 * 得到展示的菜单
 * @param {Array} allMenu 所有的菜单
 * @param {Array} menuConfig 得到需要展示的菜单
 * @returns {Array} 左侧展示菜单的数据
 */
const getMenuOptions = (allMenu, menuConfig) => {
  // 需要显示的菜单.先拍平.目前2层
  let menuConfigCopy = [],
    menuIndexArr = [];
  menuConfig.forEach(menuItem => {
    menuConfigCopy.push(menuItem);
    if (menuItem.sonMenus) {
      menuConfigCopy.push(...menuItem.sonMenus);
    }
  });
  // 得到记录code的数组
  menuIndexArr = menuConfigCopy.map(item => item.code);
  allMenu.forEach(menuItem => {
    menuItem.visible = menuIndexArr.includes(menuItem.index);
    // 取服务端的名字.如果默认项里面存在
    if (menuItem.visible) {
      menuItem.navName =
        menuConfigCopy[menuIndexArr.indexOf(menuItem.index)].name;
    }
    if (menuItem.children) {
      menuItem.children.forEach(childMenu => {
        childMenu.visible = menuIndexArr.includes(childMenu.index);
        if (childMenu.visible) {
          childMenu.navName =
            menuConfigCopy[menuIndexArr.indexOf(childMenu.index)].name;
        }
      });
    }
  });
  return allMenu;
};
// 得到code组成的数组
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
// 得到字符串
/**
 * @param {Array} menus 所有的
 * @returns {String} 返回菜单的权限的描述的拼接
 */
const getMenuString = menus => {
  let menuC = flatArr(JSON.parse(JSON.stringify(menus)));
  let s = "";
  menuC.length &&
    menuC.forEach(item => {
      s += "," + item.name;
    });
  if (s) {
    s = s.substring(1);
  } else {
    s = "--";
  }
  return s;
};
// 将数组拆成一维数组并且处理是否选中。是递归函数。
/**
 * @param {Array} arr 输入数组
 * @returns {Array} 编辑匹配后的菜单数据。check，isIndeterminate,checkArr
 */
const matchSelectMenu = (arr, selectMenu) => {
  let result = [];
  arr.forEach(item => {
    let need = {
      code: item.index || item.code,
      // id: item.index,
      //名字需要修改的
      name: item.navName || item.name,
      sonMenus: [],
      businessCode: 1,
      imgUrl: null,
      description: null,
      check: false,
      isIndeterminate: false,
      checkArr: []
    };
    if (item.children) {
      need.sonMenus.push(...matchSelectMenu(item.children, selectMenu));
    }
    if (item.sonMenus) {
      need.sonMenus.push(...matchSelectMenu(item.sonMenus, selectMenu));
    }
    need.sonMenus.forEach(item => {
      if (item.check) {
        need.checkArr.push(item);
      }
    });
    selectMenu.forEach(selectItem => {
      if (selectItem.code === item.index || selectItem.code === item.code) {
        need.check = true;
        need.name = selectItem.name;
        // 含有子项的是否勾选判断
        if (need.sonMenus.length) {
          need.check = need.sonMenus.length === need.checkArr.length;
          need.isIndeterminate = need.sonMenus.length !== need.checkArr.length;
        }
      }
    });
    result.push(need);
  });
  return result;
};

// 在权限设置页面里面匹配出菜单选项所需要的值。home，login是不要的
/**
 * @param {Array} allMenu 所有的菜单
 * @param {Array} menuConfig 默认选中的菜单
 * @returns {Array} 返回设置权限的（用于渲染）菜单选项
 */
const getSetMenu = (allMenu, menuConfig) => {
  let selectMenu = flatArr(menuConfig);
  let menuData = matchSelectMenu(allMenu, selectMenu);
  return menuData;
};
// 获得提交的菜单数据
/**
 * @param {Array} menu 要提交的菜单的原始数据
 * @returns {Array} 返回提交的菜单数据
 */
const getSubmitMenu = menu => {
  let submitMenu = [];
  let menuC = JSON.parse(JSON.stringify(menu));
  menuC.forEach(item => {
    if (item.check || item.checkArr.length) {
      let need = {
        code: item.code,
        //名字需要修改的
        name: item.name,
        sonMenus: item.checkArr,
        businessCode: 1,
        imgUrl: null,
        description: null
      };
      submitMenu.push(need);
    }
  });
  return submitMenu;
};

export {
  matchJumpMenu,
  getMenuOptions,
  getSetMenu,
  getSubmitMenu,
  getMenuString,
  getMenuCode
};
