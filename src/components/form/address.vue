<template>
  <div class="form-address">
    <el-tooltip
      class="item"
      effect="dark"
      :disabled="!address"
      :content="address"
      placement="top-start"
    >
      <el-input
        :size="size"
        v-model="address"
        class="form-normal-width"
        disabled
        placeholder="请在地图中选取地址"
      ></el-input>
    </el-tooltip>
    <div style="padding-left: 10px">
      <el-button type="primary" :size="size" @click="open">选取位置</el-button>
    </div>
    <el-dialog
      width="80%"
      custom-class="form-address-dialog"
      :visible.sync="visibleDialog"
      append-to-body
    >
      <div slot="title" class="dialog-title">{{ title + "：" + address }}</div>
      <div
        v-if="visibleDialog"
        id="address-map"
        style="width: 100%;height: 100%;min-height: 500px;position: relative"
      >
        <div style="position: absolute;top: 20px;left: 20px;z-index: 500">
          <el-input
            v-model="keyword"
            id="tipinput"
            size="small"
            clearable
            placeholder="关键字查询"
            @clear="clearKeyword"
          ></el-input>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <slot name="form-action">
          <el-button type="primary" size="small" @click="visibleDialog = false"
            >确定</el-button
          >
        </slot>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import AMap from "AMap";
export default {
  name: "form-address",
  props: {
    value: {
      type: Array,
      default() {
        return [];
      }
    },
    size: { type: String, default: "small" },
    title: { type: String, default: "选取地址" }
  },
  data() {
    return {
      keyword: "",
      address: "",
      currentValue: [],
      visibleDialog: false,
      map: null,
      center: [],
      geocoder: null,
      placeSearch: null,
      marker: null
    };
  },
  watch: {
    value: {
      deep: true,
      handler(v) {
        this.currentValue = v;
        this.regeoCode();
      }
    },
    currentValue: {
      deep: true,
      handler(v) {
        this.$emit("input", v);
      }
    },
    address(v) {
      this.$emit("updateAddress", v);
    }
  },
  created() {
    this.geocoder = new AMap.Geocoder();
    this.currentValue = this.value;
    this.regeoCode();
  },
  methods: {
    open() {
      this.visibleDialog = true;
      this.$nextTick(() => {
        this.initMap();
      });
    },
    initMap() {
      if (this.$store.state.userInfo) {
        let location = this.$store.state.userInfo.location;
        this.center = [location.lng, location.lat];
      }
      this.map = new AMap.Map("address-map", {
        resizeEnable: true,
        center: this.center,
        zoom: 14
      });
      this.marker = new AMap.Marker();
      this.inputOptions();
      if (this.currentValue && this.currentValue.length) {
        this.map.add(this.marker);
        this.marker.setPosition(this.currentValue);
        this.map.setFitView();
      }
      this.map.on("click", e => {
        this.currentValue = [e.lnglat.getLng(), e.lnglat.getLat()];
        this.regeoCode();
      });
    },
    regeoCode() {
      this.address = "";
      if (this.currentValue && this.currentValue.length) {
        if (this.marker) {
          this.map.add(this.marker);
          this.marker.setPosition(this.currentValue);
        }
        this.geocoder.getAddress(this.currentValue, (status, result) => {
          if (status === "complete" && result.regeocode) {
            this.address = result.regeocode.formattedAddress;
          } else {
            this.$message.error("获取地址失败！");
          }
        });
      }
    },
    inputOptions() {
      //输入提示-address
      let autoOptions = {
        input: "tipinput"
      };
      let auto = new AMap.Autocomplete(autoOptions);
      this.placeSearch = new AMap.PlaceSearch({
        map: this.map
      }); //构造地点查询类
      AMap.event.addListener(auto, "select", this.select);
    },
    select(e) {
      this.placeSearch.setCity(e.poi.adcode);
      this.placeSearch.search(e.poi.name); //关键字查询
    },
    clearKeyword() {
      this.map.clearMap();
      this.map.add(this.marker);
      this.map.setFitView();
    }
  }
};
</script>

<style lang="scss">
.form-address {
  display: flex;
}

.form-address-dialog {
  .dialog-title {
    padding: 10px;
  }

  .dialog-footer {
    text-align: center;
    padding-top: 8px;
  }

  .el-dialog__header {
    padding: 10px 20px 5px;
    border-bottom: 1px solid #eeeeee;
  }

  .el-dialog__body {
    padding: 20px;
    max-height: 600px;
    min-height: 300px;
    overflow: auto;
  }

  .el-dialog__footer {
    border-top: 1px solid #eeeeee;
  }
}
</style>
