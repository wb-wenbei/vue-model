import Vue from "vue";
import "./timeFormat";

Vue.filter("percent", (v, dot = 1) => {
  if (v == null || v === "") {
    return "--";
  }
  return (Number(v) * 100).toFixed(dot) + "%";
});
