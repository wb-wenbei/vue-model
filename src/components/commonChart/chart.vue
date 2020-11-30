<template>
  <div ref="common-chart" id="common-chart" v-loading="loading"></div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "chart",
  props: {
    theme: { type: String, default: "" },
    options: { type: Object },
    loading: { type: Boolean, default: false }
  },
  data() {
    return {
      chart: null,
      chartOptions: null
    };
  },
  watch: {
    options: {
      deep: true,
      handler() {
        if (this.chart) {
          this.loadOptions();
        } else {
          this.initChart();
        }
      }
    }
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      if (this.options && JSON.stringify(this.options) !== "{}") {
        this.chart = echarts.init(this.$refs["common-chart"], this.theme);
        this.loadOptions();
        this.ObjectResize(this.chart.resize);
        this.chart.on("click", e => {
          this.$emit("onClick", e);
        });
      }
    },
    loadOptions() {
      this.chartOptions = Object.assign({}, this.options);
      this.chart.setOption(this.chartOptions);
    },
    ObjectResize(fn) {
      if (window.addEventListener) {
        window.addEventListener("resize", fn, false);
      } else {
        window.attachEvent("onresize", fn);
      }
    },
    chartResize() {
      if (this.chart) {
        this.chart.resize();
      }
    }
  }
};
</script>

<style scoped>
#common-chart {
  height: 100%;
  width: 100%;
}
</style>
