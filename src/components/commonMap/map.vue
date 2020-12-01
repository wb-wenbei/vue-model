<template>
  <div id="common-map" class="common-map"></div>
</template>

<script>
import AMap from "AMap";

export default {
  name: "CommonMap",
  props: {
    zoom: { type: Number, default: 11 },
    center: {
      type: Array,
      default() {
        return [116.397428, 39.90923];
      }
    },
    mapOptions: {
      type: Object
    },
    markers: { type: Array },
    polylines: { type: Array },
    polygons: { type: Array },
    massMarks: { type: Object }
  },
  data() {
    return {
      map: null
    };
  },
  watch: {
    zoom(v) {
      this.map.setZoom(v);
    },
    center(v) {
      this.map.setCenter(v);
    },
    markers: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          this.addMarkers();
        });
      }
    },
    polylines: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          this.addPolylines();
        });
      }
    },
    polygons: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          this.addPolygons();
        });
      }
    },
    massMarks: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          this.addMassMarks();
        });
      }
    }
  },
  created() {},
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      let options = Object.assign(
        {
          resizeEnable: true,
          zoom: this.zoom,
          center:
            this.center && this.center.length
              ? this.center
              : [116.397428, 39.90923],
          layers: []
        },
        this.mapOptions
      );
      this.map = new AMap.Map("common-map", options);
      this.map.on("complete", () => {
        this.$emit("mapComplete", this.map);
      });
      this.map.on("click", v => {
        this.$emit("mapClick", v);
      });
    },

    addMarkers() {
      this.map.remove(this.map.getAllOverlays("marker"));
      this.markers.forEach(marker => {
        this.addMarker(marker);
      });
      this.$emit("markersComplete");
      this.map.setFitView();
    },

    addMarker(e) {
      if (!e) {
        return;
      }
      let marker = new AMap.Marker(e);
      marker.on("click", event => {
        this.onMarkerOperated("click", event);
      });
      this.map.add(marker);
    },

    addPolylines() {
      this.map.remove(this.map.getAllOverlays("polyline"));
      this.polylines.forEach(polyline => {
        this.addPolyline(polyline);
      });
      this.$emit("onPolylinesComplete");
    },

    addPolyline(e) {
      if (!e) {
        return;
      }
      let options = Object.assign(
        {
          path: e.path,
          strokeColor: "#3366FF",
          strokeWeight: 2,
          strokeStyle: "solid"
        },
        e.options
      );
      let polyline = new AMap.Polyline(options);
      polyline.on("click", event => {
        this.onPolylineOperated("click", event);
      });
      polyline.on("mouseover", event => {
        this.onPolylineOperated("mouseover", event);
      });
      polyline.on("mouseout", event => {
        this.onPolylineOperated("mouseout", event);
      });

      this.map.add(polyline);
    },

    addPolygons() {
      this.map.remove(this.map.getAllOverlays("polygon"));
      this.polygons.forEach(polyline => {
        this.addPolygon(polyline);
      });
      this.$emit("onPolygonsComplete");
    },

    addPolygon(e) {
      let path = e.path || [];
      let options = Object.assign({ path: path }, e.options);
      let polygon = new AMap.Polygon(options);
      polygon.on("click", event => {
        this.onPolygonOperated("click", event);
      });
      this.map.add(polygon);
    },

    addMassMarks() {
      let styleObjectArr = this.massMarks.styles;
      let options = Object.assign(
        {
          zIndex: 5,
          style: styleObjectArr
        },
        this.massMarks.options
      );
      let data = this.massMarks.data;
      let massMarks = new AMap.MassMarks(data, options);
      massMarks.on("click", e => {
        this.$emit("massMarkClick", e);
      });
      massMarks.setMap(this.map);
    },

    onMarkerOperated(type, e) {
      if (type === "click") {
        this.$emit("onMarkerClick", e);
      }
    },

    onPolylineOperated(type, e) {
      if (type === "click") {
        this.$emit("onPolylineClick", e);
      }
      if (type === "mouseover") {
        this.$emit("onPolylineMouseover", e);
      }
      if (type === "mouseout") {
        this.$emit("onPolylineMouseout", e);
      }
    },

    onPolygonOperated(type, e) {
      if (type === "click") {
        this.$emit("onPolygonClick", e);
      }
    },

    openInfoWindow(options, location) {
      let op = Object.assign(
        {
          content: "<div style='color:white'>暂无内容</div>"
        },
        options
      );
      let infoWindow = new AMap.InfoWindow(op);
      infoWindow.open(this.map, location); //打开信息窗体
      return infoWindow;
    },

    closeInfoWindow(infoWindow) {
      if (infoWindow) {
        infoWindow.close();
      }
    },
    setFitView() {
      this.map.setFitView();
    }
  }
};
</script>

<style scoped lang="scss">
.common-map {
  height: 100%;
  width: 100%;
}
</style>
