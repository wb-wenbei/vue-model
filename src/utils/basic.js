import Vue from "vue";

function getArrayIndexByKey(keyValue, array, keyName = "id") {
  let length = array.length;
  for (let i = 0; i < length; i++) {
    if (array[i][keyName] === keyValue) {
      return i;
    }
  }
}

function getExportParams(paramsObj) {
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

Vue.prototype.$getArrayIndexByKey = getArrayIndexByKey;
Vue.prototype.$getExportParams = getExportParams;
