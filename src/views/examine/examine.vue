<template>
  <div class="tabs-box">
    <el-tabs v-model="activeName">
      <el-tab-pane name="examine" @click.native="activeName = 'examine'">
        <span slot="label" style="padding: 0 6px">考核记录</span>
        <common-table
          ref="table"
          :headers="headers"
          :api="pageAPI"
          :params="params"
          :columns="columns"
          :settings="['setting']"
          :canEdit="false"
          :canDelete="false"
          @add="add"
        >
          <template v-slot:table-header>
            <table-search
              v-model="params"
              resettable
              :columns="searchColumns"
              @search="search"
            >
              <template v-slot:monthTime="{ form }">
                <el-date-picker
                  v-model="form.monthTime"
                  class="short-width"
                  type="month"
                  value-format="timestamp"
                  placeholder="选择考核月份"
                >
                </el-date-picker>
              </template>
            </table-search>
          </template>
          <template v-slot:action="{ row }">
            <el-button @click="showDetail(row)" type="text">查看明细</el-button>
          </template>
        </common-table>
        <edit-dialog
          :visibleDialog.sync="visibleDialog"
          :title="title"
          :columns="columns"
          :loading="loading"
          :form="form"
          @save="submit"
          @formUpdate="formUpdate"
        >
        </edit-dialog>
        <detail-dialog
          v-if="detailVisible"
          :visibleDialog.sync="detailVisible"
          title="考核明细"
          :loading="detailLoading"
          :data="detailData.list"
          :headers="detailHeaders"
        >
          <template v-slot:detail-header>
            <div class="detail-header">
              <div class="detail-content">
                <div>考核对象：{{ detailData.communityName }}</div>
                <div>归属物业：{{ detailData.orgName }}</div>
                <div>考核策略：{{ detailData.policyName }}</div>
                <div>考核次数：{{ detailData.assessmentTimes }}</div>
                <div>考核成绩：{{ detailData.assessmentScore }}</div>
                <div>考核评价：{{ detailData.assessmentLevel }}</div>
              </div>
              <div class="detail-chart">
                <common-chart
                  v-if="chartOptions"
                  :loading="chartLoading"
                  :options="chartOptions"
                ></common-chart>
              </div>
            </div>
          </template>
          <template v-slot:assessmentTime="{ row }">
            {{ row.assessmentTime | formatDate }}
          </template>
          <template v-slot:action="{ row }">
            <el-button
              v-if="row.assessmentType === 1"
              @click="exemptionRow(row)"
              type="text"
              >豁免</el-button
            >
            <el-button
              v-if="row.assessmentType === 2"
              @click="exemptionRow(row)"
              type="text"
              >取消</el-button
            >
            <el-button @click="deleteRow(row)" type="text">删除</el-button>
            <el-button @click="showRow(row)" type="text">查看</el-button>
          </template>
        </detail-dialog>
        <detail-dialog
          v-if="showDetailRow"
          :visibleDialog.sync="showDetailRow"
          title="查看明细"
        >
          <template v-slot:detail-content>
            <el-row :gutter="10">
              <el-col :span="6" class="detail-row-item"
                >考核对象：{{ detailRow.communityName }}</el-col
              >
              <el-col :span="6" class="detail-row-item"
                >考核时间：{{ detailRow.assessmentTime | formatDate }}</el-col
              >
              <el-col :span="6" class="detail-row-item"
                >考核维度：{{ detailRow.caseDimensionName }}</el-col
              >
              <el-col :span="6" class="detail-row-item"
                >报案缘由：{{ detailRow.caseReasonName }}</el-col
              >
              <el-col :span="6" class="detail-row-item"
                >考核方式：{{ detailRow.assessmentWayName }}</el-col
              >
              <el-col :span="6" class="detail-row-item"
                >阈值：{{ detailRow.singleThreshold }}</el-col
              >
              <el-col :span="24" class="detail-row-item"
                >备注：{{ detailRow.remark }}</el-col
              >
            </el-row>
          </template>
        </detail-dialog>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CommonTable from "@/components/commonTable/table";
import EditDialog from "@/components/commonTable/editDialog";
import DetailDialog from "@/components/commonTable/detailDialog";
import TableSearch from "@/components/commonTable/tableSearch.vue";
import CommonChart from "@/components/commonChart/chart.vue";
import { getAssessmentTypes } from "@/config/dictionary";
import { getRadarChart } from "./config/chartOptions";

import {
  pageAPI,
  detailAddAPI,
  detailListAPI,
  radarAPI,
  detailExemptionAPI,
  detailDeleteAPI
} from "@/api/examine/index";
import { getTypeList, getTypeChildren } from "@/utils/index";
import { getAllAPI as communityAllAPI } from "@/api/community/index";
import { listAllAPI as evaluateAllAPI } from "@/api/strategy/evaluate";
import { listAllAPI as strategyAllAPI } from "@/api/strategy/index";

export default {
  name: "Examine",
  components: {
    CommonTable,
    EditDialog,
    DetailDialog,
    TableSearch,
    CommonChart
  },
  data() {
    return {
      pageAPI,
      activeName: "examine",
      visibleDialog: false,
      detailVisible: false,
      showDetailRow: false,
      detailLoading: false,
      chartLoading: false,
      loading: false,
      type: "add",
      title: "新增考核记录",
      examine: [],
      totalMenus: [],
      matchMenu: [],
      params: {},
      searchColumns: [
        {
          prop: "monthTime",
          label: "考核日期"
        },
        {
          prop: "policyId",
          label: "考核策略",
          type: "select",
          options: []
        },
        {
          prop: "evaluate",
          label: "考核评价",
          type: "select",
          options: []
        }
      ],
      headers: [
        { prop: "index", label: "序号" },
        { prop: "communityName", label: "社区名称" },
        { prop: "orgName", label: "归属物业" },
        { prop: "policyName", label: "考核策略" },
        { prop: "assessmentTimes", label: "考核次数" },
        { prop: "assessmentScore", label: "考核成绩" },
        { prop: "assessmentLevel", label: "考核评价" },
        { prop: "action", label: "操作", width: 100, fixed: "right" }
      ],
      columns: [
        { prop: "basicInfo", label: "考核信息", type: "title" },
        {
          prop: "communityId",
          label: "考核对象",
          type: "select",
          required: true,
          options: []
        },
        {
          prop: "assessmentTime",
          label: "考核时间",
          type: "date",
          required: true
        },
        {
          prop: "caseDimensionId",
          label: "案件维度",
          type: "select",
          required: true,
          options: []
        },
        {
          prop: "caseReasonId",
          label: "报案缘由",
          type: "select",
          required: true,
          options: []
        },
        {
          prop: "assessmentWay",
          label: "考核方式",
          type: "select",
          required: true,
          options: getAssessmentTypes()
        },
        {
          prop: "singleThreshold",
          label: "阈值",
          type: "num",
          required: true
        },
        {
          prop: "remark",
          label: "备注",
          type: "textArea",
          cols: 3
        }
      ],
      detailHeaders: [
        { prop: "index", label: "序号" },
        { prop: "caseDimensionName", label: "考核维度" },
        { prop: "caseReasonName", label: "报案缘由" },
        { prop: "assessmentWayName", label: "考核方式" },
        { prop: "singleThreshold", label: "单次阈值" },
        { prop: "assessmentTime", label: "考核时间" },
        { prop: "assessmentTypeName", label: "考核类型" },
        { prop: "action", label: "操作", width: 140, fixed: "right" }
      ],
      form: {},
      caseDimensionId: "",
      detailData: {},
      chartOptions: {},
      detailRow: {}
    };
  },
  watch: {
    caseDimensionId(v) {
      this.getCaseReasons(v);
    }
  },
  created() {
    this.getOptions();
  },
  methods: {
    getOptions() {
      this.getCommunities();
      this.getCaseDimensions();
      this.getEvaluates();
      this.getStrategies();
    },
    async getCommunities() {
      let communities = await communityAllAPI();
      this.columns[1].options = communities;
    },
    async getEvaluates() {
      let evaluates = await evaluateAllAPI();
      this.searchColumns[2].options = evaluates;
    },
    async getStrategies() {
      let strategies = await strategyAllAPI();
      this.searchColumns[1].options = strategies;
    },
    async getCaseDimensions() {
      let caseDimensions = await getTypeList("CASE_DIMENSION");
      this.columns[3].options = caseDimensions;
    },
    async getCaseReasons(dimensionId) {
      let caseReasons = await getTypeChildren(dimensionId);
      this.columns[4].options = caseReasons;
    },
    search() {
      this.$refs.table.onQuery();
    },
    add() {
      this.type = "add";
      this.title = "新增考核记录";
      this.form = {};
      this.visibleDialog = true;
    },
    submit(form) {
      let saveForm = Object.assign({}, form);
      if (this.checkForm(saveForm)) {
        this.loading = true;
        detailAddAPI(saveForm)
          .then(() => {
            this.$message.success(`${this.title}成功！`);
            this.visibleDialog = false;
            this.$refs.table.refresh();
          })
          .catch(err => {
            this.$message.error(`${this.title}失败：${err}`);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    checkForm(form) {
      if (form) {
        return true;
      }
    },
    formUpdate(form) {
      this.caseDimensionId = form.caseDimensionId;
    },
    showDetail(row) {
      this.detailData = row;
      this.detailData.list = [];
      this.getDetailList(row);
      this.getChart(row);
      this.detailVisible = true;
    },
    getDetailList(row) {
      this.detailLoading = true;
      detailListAPI({ communityId: row.communityId })
        .then(res => {
          this.detailData.list = res || [];
        })
        .finally(() => {
          this.detailLoading = false;
        });
    },
    getChart(row) {
      this.chartLoading = true;
      this.chartOptions = {};
      radarAPI({ communityId: row.communityId }).then(res => {
        this.chartOptions = getRadarChart(res);
        this.chartLoading = false;
      });
    },
    exemptionRow(row) {
      let text = row.assessmentType === 1 ? "豁免" : "取消豁免";
      this.$confirm(`确定${text}该条记录？`).then(() => {
        detailExemptionAPI({ id: row.id })
          .then(() => {
            this.$message.success(`${text}成功！`);
            this.getDetailList(this.detailData);
          })
          .catch(err => {
            this.$message.success(`${text}失败：` + err);
          });
      });
    },
    deleteRow(row) {
      this.$confirm("确定删除该条记录？").then(() => {
        detailDeleteAPI({ id: row.id })
          .then(() => {
            this.$message.success(`删除成功！`);
            this.getDetailList(this.detailData);
          })
          .catch(err => {
            this.$message.success(`删除失败：` + err);
          });
      });
    },
    showRow(row) {
      console.log(row);
      this.detailRow = row;
      this.showDetailRow = true;
    }
  }
};
</script>

<style scoped lang="scss">
.detail-header {
  display: flex;
  justify-content: space-between;
  padding: 0 20px 10px;

  .detail-content {
    line-height: 36px;
    flex: 1;
    font-size: 15px;
    padding-bottom: 30px;
  }

  .detail-chart {
    flex: 1;
  }
}

.detail-row-item {
  padding: 10px !important;
}
</style>
