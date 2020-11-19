/**
 * 将带children的数据结构拍扁
 * @param {array} arr
 * @param {string} prop
 * @return {array} result
 */

const flatData = (arr, prop = "children") => {
  let result = [];
  arr.forEach(item => {
    let need = JSON.parse(JSON.stringify(item));
    delete need[prop];
    result.push(need);
    if (item[prop] && item[prop].length) {
      result = [...result, ...flatData(item[prop])];
    }
  });
  return result;
};

export { flatData };
