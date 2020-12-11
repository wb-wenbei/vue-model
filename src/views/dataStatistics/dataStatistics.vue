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
          v-model="form.monthTime"
          type="month"
          value-format="timestamp"
          placeholder="选择月"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <div class="count-content">
      <div class="flex-3 pr-2">
        <count-card title="小区排名">
          <el-table :data="rankData" style="width: 100%">
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
          </el-table>
        </count-card>
      </div>
      <div class="flex-5 pr-2">
        <count-card title="考核评价占比">
          <common-chart
            :loading="loading.evaluate"
            :options="chartOptions.evaluate"
          ></common-chart>
        </count-card>
      </div>
      <div class="flex-5">
        <count-card title="考核策略考核评价占比">
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
      <div class="flex-5 pr-2">
        <count-card title="近12个月案件变化趋势">
          <common-chart
            :loading="loading.case"
            :options="chartOptions.case"
          ></common-chart>
        </count-card>
      </div>
      <div class="flex-3">
        <count-card title="近3个月各纬度案件数量">
          <common-chart
            :loading="loading.radar"
            :options="chartOptions.radar"
          ></common-chart>
        </count-card>
      </div>
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
  </div>
</template>

<script>
import CountCard from "./components/countCard";
import StrategyCard from "./components/strategyCard";
import CommunityCheck from "./components/communityCheck";
import CommonChart from "@/components/commonChart/chart";
import {
  getPieChart,
  getRadarChart,
  getLineOptions,
  getLineBarOptions
} from "./config/chartOptions";
import {
  communityScoreRankAPI,
  evaluateRatioAPI,
  policyEvaluateRatioAPI,
  queryTwelveMonthCaseDataAPI,
  queryTwelveMonthCaseDataByCommunityAPI,
  queryTwelveMonthDataAPI
} from "@/api/dataStatistics/index";
import { radarAPI } from "@/api/examine/index";

export default {
  name: "DataStatistics",
  components: { CountCard, StrategyCard, CommonChart, CommunityCheck },
  data() {
    return {
      activeName: "dataStatistics",
      form: {
        monthTime: Date.now()
      },
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
      rankData: [],
      evaluateData: []
    };
  },
  watch: {
    "form.monthTime"() {
      this.getData();
    }
  },
  created() {
    this.getData();
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
    getCommunityRank() {
      communityScoreRankAPI({
        pageSize: 10,
        page: 1,
        monthTime: this.form.monthTime,
        isOneMonth: true
      }).then(res => {
        this.rankData = res.data || [];
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
      radarAPI(this.form)
        .then(res => {
          this.chartOptions.radar = getRadarChart(res);
        })
        .finally(() => {
          this.loading.radar = false;
        });
    },
    getPolicyEvaluateRatio() {
      policyEvaluateRatioAPI(this.form).then(res => {
        console.log("policyEvaluateRatioAPI", res);
        this.evaluateData = res;
      });
    },
    getTwelveMonthCaseData() {
      this.chartOptions.case = {};
      this.loading.case = true;
      queryTwelveMonthCaseDataAPI(this.form)
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
        monthTime: this.form.monthTime,
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
        monthTime: this.form.monthTime,
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
    }
  }
};
</script>

<style scoped lang="scss">
.form-content {
  text-align: left;
}

.count-content {
  display: flex;
  padding-bottom: 20px;
  min-height: 400px;

  & .flex-1 {
    flex: 1;
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

  .rank-index {
    height: 16px;
    line-height: 16px;
    width: 16px;
    text-align: center;
    font-size: 12px;
    color: white;
    background: #3b7cef;
    border-radius: 2px;

    &.rank-index-0,&.rank-index-1,&.rank-index-2{
      height: 24px;
      width: 24px;
      position: relative;
      left: -4px;
    }

    &.rank-index-0 {
      background: url("../../assets/icon/first.png") center / contain;
    }
    &.rank-index-1 {
      background: url("../../assets/icon/second.png") center / contain;
    }
    &.rank-index-2 {
      background: url("../../assets/icon/third.png") center / contain;
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
        flex-wrap: wrap;
      }
    }
  }
}
</style>
