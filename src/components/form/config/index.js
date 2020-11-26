// 根据组织机构名称获取组织机构id
export function getOrgIdByName(orgName, orgTree) {
  let result = "";
  let check = function(tree) {
    for (let i = 0; i < tree.length; i++) {
      if (tree[i].name === orgName) {
        result = tree[i].id;
        return;
      }
      if (tree[i].children && tree[i].children.length) {
        check(tree[i].children);
      }
    }
  };
  check(orgTree);
  return result;
}

// 根据组织机构名称(a-b-c)获取组织机构id
export function getOrgIdByFullName(fullName, orgTree) {
  let treeList = [];
  let fn = function(tree, parent) {
    tree.forEach(v => {
      let newParent = parent ? [...parent] : [];
      newParent.push({ id: v.id, name: v.name });
      treeList.push(newParent);
      if (v.children && v.children.length) {
        fn(v.children, newParent);
      }
    });
  };
  fn(orgTree);

  let result = [];
  let nameList = fullName.split("-");
  treeList.forEach(v => {
    let vl = v.length;
    let nl = nameList.length;
    if (vl >= nl) {
      let equal = true;
      for (let i = 0; i < nl; i++) {
        if (nameList[i] !== v[vl - nl + i].name) {
          equal = false;
        }
      }
      if (equal) {
        result.push(v[vl - 1].id);
      }
    }
  });
  return result[0];
}

// 根据组织机构id获取组织机构名称
export function getOrgNameById(orgId, orgTree) {
  let result = "";
  let check = function(tree) {
    for (let i = 0; i < tree.length; i++) {
      if (tree[i].id === orgId) {
        result = tree[i].name;
        return;
      }
      if (tree[i].children && tree[i].children.length) {
        check(tree[i].children);
      }
    }
  };
  check(orgTree);
  return result;
}

//根据id获取名称
export function getNameById(id, types) {
  let result = {};
  types.forEach(v => {
    if (v.id === id) {
      result = v.name;
    }
  });
  return result;
}

//根据名称获取id
export function getIdByName(name, types) {
  let result = {};
  types.forEach(v => {
    if (v.name === name) {
      result = v.id;
    }
  });
  return result;
}
