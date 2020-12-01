<template>
  <div class="visual" id="map">
    <div v-if="!hasToken">暂无访问权限！</div>
    <div class="header">智慧社区评价大数据平台</div>
    <div ref="info-window" class="info-window"></div>
  </div>
</template>

<script>
import AMap from "AMap";

export default {
  name: "visual",
  data() {
    return {
      hasToken: true,
      center: [121.351553, 31.198307],
      zoom: 13,
      mapStyle: "amap://styles/blue",
      markers: [],
      hoverMarker: {}
    };
  },
  created() {
    if (!this.$store.state.auth || !this.$store.state.auth.token) {
      this.hasToken = false;
    }
  },
  mounted() {
    if (this.hasToken) {
      this.initMap();
    }
  },
  methods: {
    initMap() {
      let options = {
        resizeEnable: true,
        zoom: this.zoom,
        center: this.center,
        mapStyle: this.mapStyle
      };
      this.map = new AMap.Map("map", options);
    }
  }
};
</script>

<style scoped lang="scss">
.visual {
  box-sizing: border-box;
  height: 100%;
  position: relative;
  user-select: none;

  .info-window {
    display: none;
  }

  .header {
    position: absolute;
    top: 0;
    width: 100%;
    color: white;
    font-size: 40px;
    text-align: center;
    z-index: 100;
    height: 101px;
    line-height: 86px;
    letter-spacing: 10px;
    background-image: url("./images/header_bg.png");
    background-size: 100% 100%;
    text-shadow: 0 0 2px #fff, 0 0 40px #27abaf, 0.1em 0.1em #333;
  }
}
</style>
