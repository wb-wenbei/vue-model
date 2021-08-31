<template>
  <div class="tabs-box">
    <!--<el-tabs v-model="activeName">
      <el-tab-pane
        name="dataStatistics"
        @click.native="activeName = 'dataStatistics'"
      >
        <span slot="label" style="padding: 0 6px">月度数据统计</span>

      </el-tab-pane>
    </el-tabs>-->
    <el-form ref="form" class="form-content" :model="form" label-width="70px">
      <el-form-item label="考核日期">
        <el-date-picker
          v-model="timeRange"
          type="monthrange"
          value-format="timestamp"
          range-separator="至"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
        >
        </el-date-picker>
      </el-form-item>
    </el-form>
    <div class="count-content">
      <div class="flex-3 pr-2">
        <count-card title="小区排名" style="position: relative">
          <div class="search-form">
            <el-input
              v-model="searchCommunityName"
              placeholder="请输入小区名称"
              size="mini"
            >
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
          <el-table
            :data="rankData"
            class="rank-table"
            max-height="362"
            style="width: 100%"
            :row-class-name="activeRow"
            @row-click="rowClick"
          >
            <el-table-column type="index" label="排名" width="60">
              <template slot-scope="scope">
                <div class="rank-index" :class="'rank-index-' + scope.$index">
                  {{ scope.$index + 1 }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="communityName"
              show-overflow-tooltip
              label="社区名称"
            >
            </el-table-column>
            <el-table-column
              prop="assessmentScore"
              label="评分"
              width="60"
            ></el-table-column>
            <el-table-column
              prop="evaluate"
              label="评价"
              width="60"
            ></el-table-column>
          </el-table>
        </count-card>
      </div>
      <div class="flex-5 pr-2">
        <count-card title="考核评价占比">
          <common-chart
            :loading="loading.evaluate"
            :options="chartOptions.evaluate"
            @loadComplete="chartAnimate"
          ></common-chart>
        </count-card>
      </div>
      <div class="flex-5">
        <count-card title="考核策略评价占比">
          <div class="examine-content">
            <el-scrollbar style="height: 100%">
              <strategy-card
                v-for="(item, index) in evaluateData"
                :key="index"
                :title="item.name"
                :data="item.data"
              ></strategy-card>
            </el-scrollbar>
          </div>
        </count-card>
      </div>
    </div>
    <div class="count-content">
      <div
        v-for="(item, index) in caseRange"
        :key="index"
        class="flex-1"
        :class="index === 0 ? 'pr-2' : ''"
      >
        <count-card :title="item.title" style="position: relative">
          <div class="search-form large">
            <form-cascader
              v-model="item.params.subCaseReasonIds"
              size="mini"
              collapse-tags
              :show-all-levels="false"
              :options="dimensionTree"
              placeholder="请选择案由类型"
              :props="{
                value: 'code',
                label: 'name',
                children: 'child',
                multiple: true
              }"
              @change="getCaseRange(item.id)"
            ></form-cascader>
          </div>
          <el-table
            :data="item.data"
            class="rank-table"
            max-height="362"
            style="width: 100%"
          >
            <el-table-column type="index" label="排名" width="60">
              <template slot-scope="scope">
                <div class="rank-index" :class="'rank-index-' + scope.$index">
                  {{ scope.$index + 1 }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              v-for="header in item.headers"
              :key="header.prop"
              :prop="header.prop"
              show-overflow-tooltip
              :label="header.label"
            >
            </el-table-column>
            <el-table-column type="action" label="详情" width="60">
              <template slot-scope="scope">
                <el-button @click="showDetail(scope.row)" type="text"
                  >编辑</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </count-card>
      </div>
    </div>
    <div class="count-content">
      <div class="flex-3">
        <count-card title="各社区近12个月分值变化趋势">
          <div class="flex-1" v-loading="loading.score">
            <common-chart
              v-if="!loading.score"
              :options="chartOptions.score"
            ></common-chart>
          </div>
          <community-check
            v-model="communityIds"
            @loadComplete="initCommunityIds"
            @change="getTwelveMonthData"
          ></community-check>
        </count-card>
      </div>
    </div>
    <div class="count-content">
      <div class="flex-5">
        <count-card title="近12个月案件变化趋势">
          <common-chart
            :loading="loading.case"
            :options="chartOptions.case"
          ></common-chart>
        </count-card>
      </div>
      <!--      <div class="flex-3">
        <count-card title="近3个月各纬度案件数量">
          <common-chart
            :loading="loading.radar"
            :options="chartOptions.radar"
          ></common-chart>
        </count-card>
      </div>-->
    </div>
    <div class="count-content">
      <div class="flex-3">
        <count-card title="近12个月各社区案件数量变化趋势">
          <div class="flex-1">
            <common-chart
              :loading="loading.caseCount"
              :options="chartOptions.caseCount"
            ></common-chart>
          </div>
          <community-check
            v-model="communityId"
            single
            @loadComplete="initCommunityId"
            @change="getTwelveMonthCaseDataByCommunity"
          ></community-check>
        </count-card>
      </div>
    </div>
    <detail-dialog
      :visible-dialog.sync="detailVisible"
      :data="rankDetailData"
      :headers="rankDetailHeaders"
      :page="detailPage"
      @changePage="showDetail(detailRow, $event)"
    ></detail-dialog>
  </div>
</template>

<script>
import CountCard from "./components/countCard";
import StrategyCard from "./components/strategyCard";
import CommunityCheck from "./components/communityCheck";
import CommonChart from "@/components/commonChart/chart";
import FormCascader from "@/components/form/cascader";
import DetailDialog from "@/components/commonTable/detailDialog";
import {
  getPieChart,
  getRadarChart,
  getLineOptions,
  getLineBarOptions
} from "./config/chartOptions";
import {
  communityScoreRankAllAPI,
  evaluateRatioAPI,
  policyEvaluateRatioAPI,
  queryTwelveMonthCaseDataAPI,
  queryTwelveMonthCaseDataByCommunityAPI,
  queryTwelveMonthDataAPI,
  propertyCommitteeRankAPI,
  propertyCommitteeRankByIdAPI
} from "@/api/dataStatistics/index";
import { radarAPI } from "@/api/examine/index";
import { getEntityType, deleteNullChild } from "@/utils";
import { queryCaseDimensionsCascadeAPI } from "@/api/case";
import { getAssessmentTypes } from "@/config/dictionary";
import { toDateFormat } from "@/filters/timeFormat";

export default {
  name: "DataStatistics",
  components: {
    CountCard,
    StrategyCard,
    CommonChart,
    CommunityCheck,
    FormCascader,
    DetailDialog
  },
  data() {
    return {
      activeName: "dataStatistics",
      timeRange: [
        new Date().setMonth(new Date().getMonth() - 1),
        new Date().setMonth(new Date().getMonth() - 1)
      ],
      form: {
        startTime: new Date().setMonth(new Date().getMonth() - 1),
        endTime: new Date().setMonth(new Date().getMonth() - 1)
      },
      searchCommunityName: "",
      communityIds: [],
      communityId: [],
      chartOptions: {
        evaluate: {},
        radar: {},
        score: {},
        case: {},
        caseCount: {}
      },
      loading: {
        evaluate: false,
        radar: false,
        score: false,
        case: false,
        caseCount: false
      },
      detailVisible: false,
      detailRow: {},
      detailPage: {
        pageSize: 10,
        totalCount: 0,
        currentPage: 1
      },
      rankDetailHeaders: [
        { prop: "index", label: "序号" },
        { prop: "assessmentTime", label: "考核日期" },
        { prop: "caseReasonName", label: "一级案由" },
        { prop: "subCaseReasonName", label: "二级案由" },
        { prop: "communityName", label: "社区名称" },
        { prop: "scoreReport", label: "扣分记录" }
      ],
      rankData: [],
      dimensionTree: [],
      rankDetailData: [],
      caseRange: [
        {
          id: 1,
          title: "物业排名",
          params: {
            entityType: getEntityType("PROPERTY"),
            subCaseReasonIds: []
          },
          data: [],
          headers: [
            { prop: "entityName", label: "物业名称" },
            { prop: "caseNumber", label: "警情量" },
            { prop: "score", label: "考核得分" }
          ]
        },
        {
          id: 2,
          title: "居委排名",
          params: {
            entityType: getEntityType("COMMITTEE"),
            subCaseReasonIds: []
          },
          data: [],
          headers: [
            { prop: "entityName", label: "居委名称" },
            { prop: "caseNumber", label: "警情量" },
            { prop: "score", label: "考核得分" }
          ]
        }
      ],
      evaluateData: [],
      currentIndex: 0,
      chartInterval: null
    };
  },
  watch: {
    timeRange: {
      deep: true,
      handler(v) {
        [this.form.startTime, this.form.endTime] = v;
        this.form.nowTime = this.form.endTime;
        this.getData();
      }
    },
    searchCommunityName(name) {
      this.rankSearch(name);
    }
  },
  created() {
    this.getData();
    this.getCaseDimensions();
  },
  methods: {
    getData() {
      this.getCommunityRank();
      this.getEvaluateRatio();
      this.getRadarChart();
      this.getPolicyEvaluateRatio();
      this.getTwelveMonthCaseData();
      this.getTwelveMonthData();
      this.getTwelveMonthCaseDataByCommunity();
      this.getCaseRange();
    },
    initCommunityIds(ids) {
      if (ids && ids.length) {
        this.communityIds = [ids[0].id];
        this.getTwelveMonthData();
      }
    },
    initCommunityId(ids) {
      if (ids && ids.length) {
        this.communityId = [ids[0].id];
        this.getTwelveMonthCaseDataByCommunity();
      }
    },
    async getCaseDimensions() {
      let tree = await queryCaseDimensionsCascadeAPI();
      this.dimensionTree = deleteNullChild(tree, "child");
    },
    getCommunityRank() {
      communityScoreRankAllAPI({
        startTime: this.form.startTime,
        endTime: this.form.endTime
      }).then(res => {
        let result = [];
        if (res && res.length) {
          res.forEach(v => {
            v.assessmentScore = v.assessmentScore.toFixed(2);
            result.push(Object.assign(v, { active: false }));
          });
        }
        this.rankData = result;
      });
    },
    getEvaluateRatio() {
      this.chartOptions.evaluate = {};
      this.loading.evaluate = true;
      evaluateRatioAPI(this.form)
        .then(res => {
          this.chartOptions.evaluate = getPieChart(res);
        })
        .finally(() => {
          this.loading.evaluate = false;
        });
    },
    getRadarChart() {
      this.chartOptions.radar = {};
      this.loading.radar = true;
      radarAPI({ monthTime: this.form.endTime })
        .then(res => {
          this.chartOptions.radar = getRadarChart(res);
        })
        .finally(() => {
          this.loading.radar = false;
        });
    },
    getPolicyEvaluateRatio() {
      policyEvaluateRatioAPI(this.form).then(res => {
        this.evaluateData = res;
      });
    },
    getTwelveMonthCaseData() {
      this.chartOptions.case = {};
      this.loading.case = true;
      queryTwelveMonthCaseDataAPI({ nowTime: this.form.endTime })
        .then(res => {
          let data = [{ communityName: "", data: res }];
          this.chartOptions.case = getLineOptions(data, "数量");
        })
        .finally(() => {
          this.loading.case = false;
        });
    },
    getTwelveMonthCaseDataByCommunity() {
      if (!this.communityId.toString()) {
        return {};
      }
      let form = {
        nowTime: this.form.endTime,
        communityId: this.communityId.toString()
      };
      this.chartOptions.caseCount = {};
      this.loading.caseCount = true;
      queryTwelveMonthCaseDataByCommunityAPI(form)
        .then(res => {
          this.chartOptions.caseCount = getLineBarOptions(res);
        })
        .finally(() => {
          this.loading.caseCount = false;
        });
    },
    getTwelveMonthData() {
      if (!this.communityIds.toString()) {
        return {};
      }
      let form = {
        nowTime: this.form.endTime,
        communityIds: this.communityIds.toString()
      };
      this.chartOptions.score = {};
      this.loading.score = true;
      queryTwelveMonthDataAPI(form)
        .then(res => {
          this.chartOptions.score = getLineOptions(res, "评分");
        })
        .finally(() => {
          this.loading.score = false;
        });
    },
    getCaseRange(id) {
      this.caseRange.forEach(item => {
        if (!id || id === item.id) {
          let params = Object.assign({}, this.form, item.params, {
            subCaseReasonIds: item.params.subCaseReasonIds.toString()
          });
          propertyCommitteeRankAPI(params).then(res => {
            item.data = res.data || res || [];
          });
        }
      });
    },
    chartAnimate(chart) {
      let setTime = null;
      chart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: 0
      });
      // 显示 tooltip
      chart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: 0
      });
      chart.on("mouseover", params => {
        if (setTime) {
          clearTimeout(setTime);
          setTime = null;
        }
        if (params.dataIndex !== 0) {
          chart.dispatchAction({
            type: "downplay",
            seriesIndex: 0,
            dataIndex: 0
          });
        }
      });
      chart.on("mouseout", () => {
        setTime = setTimeout(() => {
          this.$nextTick(() => {
            chart.dispatchAction({
              type: "highlight",
              seriesIndex: 0,
              dataIndex: 0
            });
            // 显示 tooltip
            chart.dispatchAction({
              type: "showTip",
              seriesIndex: 0,
              dataIndex: 0
            });
          });
        }, 500);
      });
    },
    rowClick(row) {
      this.$router.push({
        path: "/examine",
        query: { communityId: row.id, monthTime: this.form.endTime }
      });
    },
    rankSearch(name) {
      if (this.rankData.length) {
        let rankIndex = 0;
        this.rankData.forEach((item, index) => {
          item.active = false;
          if (name) {
            if (item.communityName.indexOf(name) > -1) {
              if (index !== 0) {
                rankIndex = index;
              }
              item.active = true;
            }
          }
        });
        if (name) {
          let eleHeight = 33;
          let scrollBar = document.querySelector(
            ".rank-table .el-table__body-wrapper"
          );
          scrollBar.scrollTo({
            top: eleHeight * rankIndex,
            behavior: "smooth"
          });
        }
      }
    },
    async showDetail(row, page = 1) {
      this.detailRow = row;
      this.detailVisible = true;
      let params = Object.assign(
        {
          entityType: row.entityType,
          id: row.id,
          page: page,
          pagSize: this.detailPage.pageSize
        },
        this.form
      );
      let scoreTypes = getAssessmentTypes();
      let res = await propertyCommitteeRankByIdAPI(params);
      this.detailPage.totalCount = res.totalCount;
      this.detailPage.currentPage = res.page;
      this.rankDetailData = (res.data || []).map(item => {
        item.assessmentTime = toDateFormat(item.assessmentTime);
        let typeName = "";
        scoreTypes.forEach(type => {
          if (type.id === item.assessmentType) {
            typeName = type.name;
          }
        });
        return Object.assign(item, {
          scoreReport: typeName + ":" + (item.score || "--")
        });
      });
    },
    activeRow({ row }) {
      return row.active ? "active-row" : "";
    }
  },
  beforeDestroy() {
    if (this.chartInterval) {
      clearInterval(this.chartInterval);
    }
  }
};
</script>

<style scoped lang="scss">
@import "src/styles/theme";
.form-content {
  text-align: left;
}

.count-content {
  display: flex;
  padding-bottom: 20px;
  min-height: 400px;

  & .flex-1 {
    flex: 1;
    min-width: 0;
  }
  & .flex-2 {
    flex: 2;
  }
  & .flex-3 {
    flex: 3;
  }
  & .flex-4 {
    flex: 4;
  }
  & .flex-5 {
    flex: 5;
  }

  & .pr-2 {
    padding-right: 20px;
  }

  ::v-deep {
    .el-table {
      .active-row {
        background: oldlace;
      }
      .el-table__row {
        cursor: pointer;
        & td:nth-child(2) {
          color: $--color-primary;
        }
      }
    }
  }

  .rank-index {
    height: 24px;
    width: 24px;
    line-height: 19px;
    position: relative;
    left: -4px;
    text-align: center;
    font-size: 12px;
    color: white;
    background: $--color-primary;
    border-radius: 2px;
    background: url("../../assets/icon/勋章4@3x.png") center / contain;

    &.rank-index-0 {
      background: url("../../assets/icon/勋章1@3x.png") center / contain;
    }
    &.rank-index-1 {
      background: url("../../assets/icon/勋章2@3x.png") center / contain;
    }
    &.rank-index-2 {
      background: url("../../assets/icon/勋章3@3x.png") center / contain;
    }
  }

  .search-form {
    position: absolute;
    right: 10px;
    top: 5px;
    width: 160px;
  }

  .search-form.large {
    width: 240px;

    .el-cascader--mini {
      width: 240px;
    }
  }

  ::v-deep {
    .el-table--small th,
    .el-table--small td {
      padding: 4px 0;
    }
    .el-table .cell {
      overflow: hidden;
      white-space: nowrap;
    }
  }

  .examine-content {
    height: 356px;
    width: 100%;
    ::v-deep {
      .el-scrollbar__view {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
      }
    }
  }
}
</style>
