<template>
  <div class="visual" :class="mapStatus === 2 ? 'hide-marker' : ''" id="map">
    <div v-if="!hasToken">暂无访问权限！</div>
    <div class="header">智慧社区评价大数据平台</div>
    <div ref="info-window" class="info-window"></div>
    <div class="map-status">
      <el-radio-group v-model="mapStatus" @change="showHeatMap">
        <el-radio-button :label="1">分布模式</el-radio-button>
        <el-radio-button :label="2">热力图模式</el-radio-button>
      </el-radio-group>
    </div>
    <weather class="weather"></weather>
    <div class="left-card">
      <div class="left-search-card">
        <div class="month-range">近三月</div>
        <el-date-picker
          v-model="params.monthTime"
          type="month"
          value-format="timestamp"
          :clearable="false"
          placeholder="选择月"
        >
        </el-date-picker>
        <div class="icon">
          <i class="el-icon-search" @click="onSearch"></i>
        </div>
      </div>
      <div class="left-top-card">
        <card title="评估维度">
          <div style="height: 240px">
            <common-chart
              :loading="loading.radar"
              :options="chartOptions.radar"
            ></common-chart>
          </div>
        </card>
      </div>
      <div style="height: 20px"></div>
      <div class="left-bottom-card">
        <card title="社区排名 TOP10">
          <el-scrollbar style="height: 100%">
            <rank-card ref="rank-card" :params="params"></rank-card>
          </el-scrollbar>
        </card>
      </div>
    </div>
    <div class="bottom-card">
      <card title="近三个月案件变化趋势">
        <template v-slot:right-header>
          <div>
            <i class="el-icon-arrow-left page-btn" @click.stop="prePage"></i>
            <i class="el-icon-arrow-right page-btn" @click.stop="nextPage"></i>
          </div>
        </template>
        <div style="height: 240px">
          <common-chart
            :loading="loading.communityCase"
            :options="chartOptions.communityCase"
          ></common-chart>
        </div>
      </card>
    </div>
    <div class="right-card">
      <card title="案件类型">
        <div style="height: 240px">
          <common-chart
            :loading="loading.caseType"
            :options="chartOptions.caseType"
          ></common-chart>
        </div>
      </card>
    </div>
    <div style="display: none">
      <info-window ref="info-window">
        <div class="info-window">
          <div class="info-item">
            <div class="top-border"></div>
            <div class="icon">
              <div class="icon-image icon-3"></div>
            </div>
            <div class="detail">
              <div class="title">{{ infoData.name || "--" }}</div>
              <div class="sub-title">小区名称</div>
            </div>
          </div>
          <div class="info-item">
            <div class="top-border"></div>
            <div class="icon">
              <div class="icon-image icon-2"></div>
            </div>
            <div class="detail">
              <div class="title title-blue">
                {{ infoData.caseCount || "--" }}
              </div>
              <div class="sub-title">案件数量</div>
            </div>
          </div>
          <div class="info-item">
            <div class="top-border"></div>
            <div class="icon">
              <div class="icon-image icon-1"></div>
            </div>
            <div class="detail">
              <div class="title title-blue">
                {{ infoData.score || "--" }} /
                <span style="font-size: 12px">
                  {{ infoData.evaluateName || "--" }}
                </span>
              </div>
              <div class="sub-title">评分/评价等级</div>
            </div>
          </div>
        </div>
      </info-window>
    </div>
  </div>
</template>

<script>
import AMap from "AMap";
import Card from "./components/card";
import InfoWindow from "./components/infoWindow";
import RankCard from "./components/rankData";
import CommonChart from "@/components/commonChart/chart";
import Weather from "@/components/weather/index";
import {
  getLinesChart,
  getPieChart,
  getRadarChart
} from "./config/chartOptions";

import {
  queryCommunityForScoreAPI,
  queryCaseRatioAPI,
  queryThreeMonthCaseNumberAPI
} from "@/api/dataStatistics/index";
import { radarAPI } from "@/api/examine/index";

const markerIcons = {
  1: require("./images/marker_1.png"), //优秀
  2: require("./images/marker_3.png"), //中等
  3: require("./images/marker_4.png") //差
};

const PIXEL_X = 24;
const PIXEL_Y = 32;

const PIXEL_HOVER_X = 200;
const PIXEL_HOVER_Y = 200;

const hoverIcon = require("./images/marker_hover.gif");

export default {
  name: "visual",
  components: { Card, InfoWindow, RankCard, CommonChart, Weather },
  data() {
    return {
      hasToken: true,
      center: [121.351553, 31.198307],
      zoom: 13,
      map: null,
      heatmap: null,
      mapStyle: "amap://styles/blue",
      mapStatus: 1,
      params: {
        monthTime: Date.now()
      },
      pageParams: {
        pageSize: 8,
        page: 1,
        total: 0
      },
      markers: [],
      hoverIndex: 0,
      hoverMarker: null,
      infoWindow: null,
      infoData: {},
      timeout: null,
      chartOptions: {
        radar: {},
        caseType: {},
        communityCase: {}
      },
      loading: {
        radar: false,
        caseType: false,
        communityCase: false
      }
    };
  },
  created() {
    if (!this.$store.state.auth || !this.$store.state.auth.token) {
      this.hasToken = false;
    }
    this.loadData();
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
      this.loadMarkers();
      this.initHeatMap();
    },
    onSearch() {
      this.loadMarkers();
      this.loadData();
      this.$refs["rank-card"].loadData();
    },
    loadMarkers() {
      queryCommunityForScoreAPI(this.params).then(res => {
        if (this.map && this.markers.length) {
          this.map.remove(this.markers);
          this.markers = [];
        }
        this.hoverIndex = 0;
        this.onMarkerUnHover();
        res.forEach(item => {
          let marker = new AMap.Marker({
            position: [item.lng, item.lat],
            offset: new AMap.Pixel(-PIXEL_X / 2, -PIXEL_Y),
            icon: this.getMarkerIcon(item),
            title: item.name,
            extData: item
          });
          this.map.add(marker);
          this.markers.push(marker);
          marker.on("mouseover", e => {
            this.onMarkerHover(e.target);
          });
          /*marker.on("mouseout", e => {
            this.onMarkerUnHover(e.target);
          });*/
        });
        this.setHeatMapData();
        this.timeout = setTimeout(() => {
          this.onMarkerHover(this.markers[this.hoverIndex]);
        }, 5000);
      });
    },
    loadData() {
      this.getRadarChart();
      this.getCaseTypeChart();
      this.getCommunityCaseChart();
    },
    getRadarChart() {
      this.chartOptions.radar = {};
      this.loading.radar = true;
      radarAPI(this.params)
        .then(res => {
          this.chartOptions.radar = getRadarChart(res);
        })
        .finally(() => {
          this.loading.radar = false;
        });
    },
    getCaseTypeChart() {
      this.chartOptions.caseType = {};
      this.loading.caseType = true;
      queryCaseRatioAPI(this.params)
        .then(res => {
          this.chartOptions.caseType = getPieChart(res);
        })
        .finally(() => {
          this.loading.caseType = false;
        });
    },
    getCommunityCaseChart() {
      this.chartOptions.communityCase = {};
      this.loading.communityCase = true;
      let params = Object.assign({}, this.params, this.pageParams);
      queryThreeMonthCaseNumberAPI(params)
        .then(res => {
          this.pageParams.total = res.totalCount;
          this.chartOptions.communityCase = getLinesChart(res.data);
        })
        .finally(() => {
          this.loading.communityCase = false;
        });
    },
    prePage() {
      if (this.pageParams.page === 1) {
        return;
      }
      this.pageParams.page--;
      this.getCommunityCaseChart();
    },
    nextPage() {
      if (
        this.pageParams.page * this.pageParams.pageSize >=
        this.pageParams.total
      ) {
        return;
      }
      this.pageParams.page++;
      this.getCommunityCaseChart();
    },
    onMarkerHover(marker) {
      if (marker !== this.hoverMarker) {
        this.onMarkerUnHover();
        this.hoverMarker = marker;
        marker.setIcon(this.getHoverMarkerIcon());
        marker.setOffset(
          new AMap.Pixel(-PIXEL_HOVER_X / 2, -PIXEL_HOVER_Y / 2)
        );
        if (this.mapStatus === 1) {
          this.map.setCenter(marker.getPosition());
          this.openInfoWindow(marker);
        }
      }
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
      this.timeout = setTimeout(() => {
        this.hoverIndex++;
        if (this.hoverIndex >= this.markers.length) {
          this.hoverIndex = 0;
        }
        this.onMarkerHover(this.markers[this.hoverIndex]);
      }, 5000);
    },
    onMarkerUnHover() {
      if (this.hoverMarker) {
        let item = this.hoverMarker.getExtData();
        this.hoverMarker.setIcon(this.getMarkerIcon(item));
        this.hoverMarker.setOffset(new AMap.Pixel(-PIXEL_X / 2, -PIXEL_Y));
        this.hoverMarker = null;
      }
      if (this.infoWindow) {
        this.infoWindow.close();
      }
    },
    openInfoWindow(marker) {
      this.$nextTick(() => {
        this.infoData = marker.getExtData();
        this.infoWindow = new AMap.InfoWindow({
          position: marker.getPosition(),
          isCustom: true,
          anchor: "bottom-center",
          content: this.$refs["info-window"].$el
        });
        this.infoWindow.open(this.map);
      });
    },
    getMarkerIcon(item) {
      return new AMap.Icon({
        size: new AMap.Size(PIXEL_X, PIXEL_Y),
        image: markerIcons[item.evaluateId],
        imageSize: new AMap.Size(PIXEL_X, PIXEL_Y)
      });
    },
    getHoverMarkerIcon() {
      return new AMap.Icon({
        size: new AMap.Size(PIXEL_HOVER_X, PIXEL_HOVER_Y),
        image: hoverIcon,
        imageSize: new AMap.Size(PIXEL_HOVER_X, PIXEL_HOVER_Y)
      });
    },
    initHeatMap() {
      this.heatmap = new AMap.Heatmap(this.map, {
        opacity: [0, 0.8],
        gradient: {
          0.2: "#3DE1E1",
          0.5: "#80C16B",
          0.8: "#F5C120",
          1.0: "#F04735"
        }
      });
      this.heatmap.hide();
    },
    setHeatMapData() {
      if (this.heatmap && this.markers.length) {
        let heatmapData = [];
        this.markers.forEach(v => {
          let item = v.getExtData();
          heatmapData.push({
            lng: item.lng,
            lat: item.lat,
            count: item.caseCount || 0
          });
        });
        this.heatmap.setDataSet({
          data: heatmapData,
          max: 10
        });
      }
    },
    showHeatMap(v) {
      if (this.heatmap) {
        v === 2 ? this.heatmap.show() : this.heatmap.hide();
      }
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
  min-height: 700px;
  background: #033447;

  .header {
    position: absolute;
    top: 0;
    width: 100%;
    color: white;
    font-size: 40px;
    text-align: center;
    z-index: 500;
    height: 101px;
    line-height: 86px;
    letter-spacing: 10px;
    background-image: url("./images/header_bg.png");
    background-size: 100% 100%;
    text-shadow: 0 0 2px #fff, 0 0 40px #27abaf, 0.1em 0.1em #333;
  }

  .weather {
    position: absolute;
    top: 30px;
    right: 20px;
    z-index: 500;
  }

  .map-status {
    position: absolute;
    top: 120px;
    right: 20px;
    z-index: 500;
    ::v-deep {
      .el-radio-group {
        border-radius: 40px;
        overflow: hidden;
        border: 1px solid rgba(18, 150, 150, 0.6);
      }

      .el-radio-button__inner {
        background: transparent;
        border: 0;
        box-shadow: -1px 0 0 0 rgba(18, 150, 150, 0.6);
        color: rgba(19, 168, 168, 0.85);
      }

      .is-active .el-radio-button__inner {
        background: rgba(19, 168, 168, 0.85);
        color: white;
      }
    }
  }

  .left-card {
    width: 320px;
    position: absolute;
    bottom: 20px;
    left: 20px;
    top: 120px;
    z-index: 500;
    display: flex;
    flex-direction: column;

    .left-search-card {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      color: white;
      line-height: 32px;
      background-image: linear-gradient(
        180deg,
        rgba(0, 68, 83, 0.75) 0%,
        rgba(0, 33, 41, 0.75) 100%
      );
      border-radius: 4px;
      padding: 4px 15px;

      .month-range {
        font-size: 12px;
      }

      ::v-deep {
        .el-input,
        input {
          background: transparent;
          color: white;
          border: 0;
        }
      }

      .icon {
        cursor: pointer;
      }
    }

    .left-bottom-card {
      flex: 1;
      min-height: 0;
      ::v-deep {
        .el-scrollbar__wrap {
          overflow-x: hidden;
        }
      }
    }
  }

  .right-card {
    width: 320px;
    position: absolute;
    bottom: 20px;
    right: 20px;
    z-index: 500;
  }

  .bottom-card {
    position: absolute;
    bottom: 20px;
    left: 360px;
    right: 360px;
    z-index: 500;

    .page-btn {
      display: inline-block;
      padding: 3px 5px;
      margin: 0 5px;
      border: 1px solid #19b0ae;
      border-radius: 4px;

      &:hover {
        background: #19b0ae;
      }
      &:active {
        background: #169b99;
      }
    }
  }

  .info-window {
    width: 356px;
    display: flex;
    flex-wrap: wrap;

    .info-item {
      width: 168px;
      height: 80px;
      background: rgba(4, 45, 57, 0.8);
      border-radius: 2px;
      margin: 0 10px 10px 0;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      position: relative;

      .top-border {
        position: absolute;
        width: 100%;
        height: 1px;
        top: -1px;
        left: 0;
        background: linear-gradient(
          to right,
          rgba(0, 0, 0, 0) 30%,
          #84e2d8 50%,
          rgba(0, 0, 0, 0) 70%
        );
      }

      .icon-image {
        height: 24px;
        width: 24px;
        margin: 0 20px;

        &.icon-1 {
          background: url("./images/icon_1.png");
        }
        &.icon-2 {
          background: url("./images/icon_2.png");
        }
        &.icon-3 {
          background: url("./images/icon_3.png");
        }
        &.icon-4 {
          background: url("./images/icon_4.png");
        }
      }

      .detail {
        padding-right: 10px;
        text-align: left;
      }

      .title {
        font-size: 16px;
        /*font-weight: bold;*/
        color: white;
        margin-bottom: 4px;
      }

      .title-blue {
        color: #19b0ae;
      }

      .sub-title {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.85);
      }
    }
  }

  ::v-deep {
    .amap-info-contentContainer {
    }

    .el-loading-mask {
      background: rgba(0, 68, 83, 0.8);
    }
  }
}

/*切换热力图时隐藏marker-icon 和 info-window*/
.hide-marker {
  .info-window {
    display: none;
  }

  ::v-deep {
    .amap-icon {
      display: none;
    }
  }
}
</style>
