<template>
  <div class="tabs-box">
    <el-tabs v-model="activeName">
      <el-tab-pane
        name="dataStatistics"
        @click.native="activeName = 'dataStatistics'"
      >
        <span slot="label" style="padding: 0 6px">月度数据统计</span>
        <el-form
          ref="form"
          class="form-content"
          :model="form"
          label-width="70px"
        >
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
                    <div
                      class="rank-index"
                      :class="'rank-index-' + scope.$index"
                    >
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
                v-if="chartOptions.evaluate"
                :options="chartOptions.evaluate"
              ></common-chart>
            </count-card>
          </div>
          <div class="flex-5">
            <count-card title="考核策略考核评价占比">
              <div class="examine-content">
                <el-scrollbar style="height: 100%">
                  <strategy-card></strategy-card>
                  <strategy-card></strategy-card>
                  <strategy-card></strategy-card>
                  <strategy-card></strategy-card>
                </el-scrollbar>
              </div>
            </count-card>
          </div>
        </div>
        <div class="count-content">
          <div class="flex-3">
            <count-card title="各社区近12个月分值变化趋势">
              <div class="flex-1">
                <common-chart
                  v-if="chartOptions.score"
                  :options="chartOptions.score"
                ></common-chart>
              </div>
              <community-check v-model="checkedList"></community-check>
            </count-card>
          </div>
        </div>
        <div class="count-content">
          <div class="flex-5 pr-2">
            <count-card title="近12个月案件变化趋势">
              <common-chart
                v-if="chartOptions.score"
                :options="chartOptions.score"
              ></common-chart>
            </count-card>
          </div>
          <div class="flex-3">
            <count-card title="近3个月各纬度案件数量">
              <common-chart
                v-if="chartOptions.radar"
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
                  v-if="chartOptions.caseCount"
                  :options="chartOptions.caseCount"
                ></common-chart>
              </div>
              <community-check v-model="checkedList" single></community-check>
            </count-card>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
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
  evaluateRatioAPI
} from "@/api/dataStatistics/index";

export default {
  name: "DataStatistics",
  components: { CountCard, StrategyCard, CommonChart, CommunityCheck },
  data() {
    return {
      activeName: "dataStatistics",
      form: {
        monthTime: Date.now()
      },
      chartOptions: {
        evaluate: {},
        radar: {}
      },
      rankData: [
        {
          id: 1,
          communityName: "虹桥社区",
          score: 98
        },
        { id: 2, communityName: "虹桥社区", assessmentScore: 98 },
        { id: 3, communityName: "虹桥社区", assessmentScore: 98 },
        { id: 4, communityName: "虹桥社区", assessmentScore: 98 },
        { id: 5, communityName: "虹桥社区", assessmentScore: 98 },
        { id: 6, communityName: "虹桥社区", assessmentScore: 98 },
        { id: 7, communityName: "虹桥社区", assessmentScore: 98 },
        { id: 8, communityName: "虹桥社区", assessmentScore: 98 },
        { id: 9, communityName: "虹桥社区", assessmentScore: 98 },
        { id: 10, communityName: "虹桥社区", assessmentScore: 98 }
      ],
      checkedList: []
    };
  },
  watch: {
    "form.monthTime"() {
      this.getData();
    }
  },
  created() {
    this.getOptions();
    this.getData();
  },
  methods: {
    getOptions() {
      this.chartOptions.evaluate = getPieChart();
      this.chartOptions.score = getLineOptions();
      this.chartOptions.caseCount = getLineBarOptions();
    },
    getData() {
      this.getCommunityRank();
      this.getEvaluateRatio();
      this.getRadarChart();
    },
    getCommunityRank() {
      communityScoreRankAPI({
        pageSize: 10,
        page: 1,
        monthTime: this.form.monthTime
      }).then(res => {
        this.rankData = res.data || [];
      });
    },
    getEvaluateRatio() {
      evaluateRatioAPI(this.form).then(res => {
        console.log(res);
      });
    },
    getRadarChart() {
      this.chartOptions.radar = getRadarChart();
      console.log(this.chartOptions.radar);
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

    &.rank-index-0 {
      background: #ff6161;
    }
    &.rank-index-1 {
      background: #ff7428;
    }
    &.rank-index-2 {
      background: #f6a93b;
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
