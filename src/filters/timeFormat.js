import Vue from "vue";

import parseISO from "date-fns/parseISO";
import format from "date-fns/format";
import isDate from "date-fns/isDate";
import isNumber from "lodash/isNumber";

export function toDateFormat(v, f) {
  if (!v) return "--";
  if (!isDate(v)) {
    if (isNumber(v)) {
      v = new Date(v);
    } else {
      v = parseISO(v);
    }
  }
  return format(v, f || "yyyy-MM-dd");
}

/**
 * 日期格式
 * */
Vue.filter("formatDate", (v, f) => {
  return toDateFormat(v, f || "yyyy-MM-dd");
});

/**
 * 详细日期格式
 * */
Vue.filter("formatDateTime", (v, f) => {
  return toDateFormat(v, f || "yyyy-MM-dd HH:mm:ss");
});

/**
 * 详细日期格式
 * */
Vue.filter("formatDateTimeHm", (v, f) => {
  return toDateFormat(v, f || "yyyy-MM-dd HH:mm");
});
