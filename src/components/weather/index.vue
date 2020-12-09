<template>
  <div id="tp-weather-widget"></div>
</template>

<script>
export default {
  name: "index",
  mounted() {
    this.load();
  },
  methods: {
    load() {
      (function(a, h, g, f, e, d, c, b) {
        b = function() {
          d = h.createElement(g);
          c = h.getElementsByTagName(g)[0];
          d.src = e;
          d.charset = "utf-8";
          d.async = 1;
          c.parentNode.insertBefore(d, c);
        };
        a["SeniverseWeatherWidgetObject"] = f;
        a[f] ||
          (a[f] = function() {
            (a[f].q = a[f].q || []).push(arguments);
          });
        a[f].l = +new Date();
        if (a.attachEvent) {
          a.attachEvent("onload", b);
        } else {
          a.addEventListener("load", b, false);
        }
      })(
        window,
        document,
        "script",
        "SeniverseWeatherWidget",
        "//cdn.sencdn.com/widget2/static/js/bundle.js?t=" +
          parseInt((new Date().getTime() / 100000000).toString(), 10)
      );
      window.SeniverseWeatherWidget("show", {
        flavor: "slim",
        location: "WX4FBXXFKE4F",
        geolocation: true,
        language: "zh-Hans",
        unit: "c",
        theme: "auto",
        token: "7b8a7d89-f01d-4b14-bdec-5ae0b82c857f",
        hover: "disabled",
        container: "tp-weather-widget"
      });
    }
  }
};
</script>

<style scoped lang="scss">
#tp-weather-widget {
  ::v-deep .sw-typography {
    color: rgba(255, 255, 255, 0.8);
  }
}
</style>
