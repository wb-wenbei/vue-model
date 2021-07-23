<template>
  <div class="tabs-box">
    <common-table
      ref="table"
      :headers="headers"
      :api="pageAPI"
      :params="params"
      :settings="['setting', 'download']"
      :canEdit="false"
      :canDelete="false"
      @add="add"
      @loadComplete="loadComplete"
      @download="downloadDialog = true"
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
      v-if="visibleDialog"
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
      max-table-height="300"
    >
      <template v-slot:detail-header>
        <div class="detail-header">
          <div class="detail-content">
            <div>考核对象：{{ detailData.communityName }}</div>
            <div>归属物业：{{ detailData.propertyName }}</div>
            <div>考核策略：{{ detailData.policyName }}</div>
            <div>考核次数：{{ detailData.assessmentTimes }}</div>
            <div>考核成绩：{{ detailData.assessmentScore }}</div>
            <div>考核评价：{{ detailData.assessmentLevelName }}</div>
          </div>
          <div class="detail-chart">
<!--            <common-chart
              v-if="chartOptions"
              :loading="chartLoading"
              :options="chartOptions"
            ></common-chart>-->
          </div>
        </div>
      </template>
      <template v-slot:assessmentTime="{ row }">
        {{ row.assessmentTime | formatDate }}
      </template>
      <template v-slot:action="{ row }">
        <template
          v-if="
            row.assessmentTime >=
              new Date(new Date().setDate(1)).setHours(0, 0, 0, 0)
          "
        >
          <el-button
            v-if="row.assessmentWay === 1 && row.assessmentType === 1"
            @click="exemptionRow(row)"
            type="text"
            >豁免
          </el-button>
          <el-button
            v-if="row.assessmentWay === 1 && row.assessmentType === 2"
            @click="exemptionRow(row)"
            type="text"
            >取消
          </el-button>
          <el-button @click="deleteRow(row)" type="text">删除</el-button>
        </template>
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
            >考核对象：{{ detailData.communityName }}
          </el-col>
          <el-col :span="6" class="detail-row-item"
            >考核时间：{{ detailRow.assessmentTime | formatDate }}
          </el-col>
          <el-col :span="6" class="detail-row-item"
            >考核维度：{{ detailRow.caseDimensionName }}
          </el-col>
          <el-col :span="6" class="detail-row-item"
            >一级案由：{{ detailRow.caseReasonName }}
          </el-col>
          <el-col :span="6" class="detail-row-item"
            >二级案由：{{ detailRow.subCaseReasonName }}
          </el-col>
          <el-col :span="6" class="detail-row-item"
            >考核方式：{{ detailRow.assessmentWayName }}
          </el-col>
          <el-col :span="6" class="detail-row-item"
            >阈值：{{ detailRow.singleThreshold }}
          </el-col>
          <el-col :span="24" class="detail-row-item"
            >备注：{{ detailRow.remark }}
          </el-col>
        </el-row>
      </template>
    </detail-dialog>
    <el-dialog
      :visible.sync="downloadDialog"
      append-to-body
      custom-class="download-dialog"
      width="600px"
      center
    >
      <div style="text-align: center;padding-bottom: 20px">
        考核记录详情下载
      </div>
      <el-form class="demo-form-inline" :model="downLoadParams">
        <el-form-item v-show="false" label="下载类型">
          <form-select
            v-model="downLoadParams.type"
            :clearable="false"
            :options="[
              { id: 1, name: '历年考核排名' },
              { id: 2, name: '根据月份区间选择' }
            ]"
          ></form-select>
        </el-form-item>
        <el-form-item v-show="downLoadParams.type === 2" label="月份区间">
          <el-date-picker
            v-model="downLoadParams.timeRange"
            :clearable="false"
            type="monthrange"
            value-format="timestamp"
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button type="primary" @click="exportExcel">下载</el-button>
          <el-button @click.stop="downloadDialog = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import CommonTable from "@/components/commonTable/table";
import EditDialog from "@/components/commonTable/editDialog";
import FormSelect from "@/components/form/select";
import DetailDialog from "@/components/commonTable/detailDialog";
import TableSearch from "@/components/commonTable/tableSearch.vue";
import CommonChart from "@/components/commonChart/chart.vue";
import { getAssessmentType2 } from "@/config/dictionary";
import { getRadarChart } from "./config/chartOptions";
import { getExportParams } from "@/utils/index";

import {
  pageAPI,
  detailAddAPI,
  detailListAPI,
  radarAPI,
  detailExemptionAPI,
  detailDeleteAPI
} from "@/api/examine/index";
import { getAllAPI as communityAllAPI } from "@/api/community/index";
import { listAllAPI as evaluateAllAPI } from "@/api/strategy/evaluate";
import { listAllAPI as strategyAllAPI } from "@/api/strategy/index";
import { queryCaseDimensionsCascadeAPI } from "@/api/case";

export default {
  name: "Examine",
  components: {
    CommonTable,
    EditDialog,
    FormSelect,
    DetailDialog,
    TableSearch,
    CommonChart
  },
  data() {
    return {
      pageAPI,
      activeName: "examine",
      visibleDialog: false,
      downloadDialog: false,
      detailVisible: false,
      showDetailRow: false,
      detailLoading: false,
      chartLoading: false,
      showDetailNow: false,
      firstLoad: false,
      loading: false,
      type: "add",
      title: "新增考核记录",
      examine: [],
      totalMenus: [],
      matchMenu: [],
      params: {
        monthTime: Date.now(),
        communityIdArr: [],
        communityIds: ""
      },
      downLoadParams: {
        type: 2,
        timeRange: [],
        startTime: "",
        endTime: ""
      },
      headers: [
        { prop: "index", label: "序号" },
        { prop: "communityName", label: "社区名称" },
        { prop: "propertyName", label: "归属物业" },
        { prop: "policyName", label: "考核策略" },
        { prop: "assessmentTimes", label: "考核次数" },
        { prop: "assessmentScore", label: "考核成绩" },
        { prop: "assessmentLevelName", label: "考核评价" },
        { prop: "action", label: "操作", width: 100, fixed: "right" }
      ],
      detailHeaders: [
        { prop: "index", label: "序号" },
        { prop: "caseDimensionName", label: "考核维度" },
        { prop: "caseReasonName", label: "报案缘由" },
        { prop: "assessmentTypeName", label: "考核方式" },
        { prop: "singleThreshold", label: "单次阈值" },
        { prop: "assessmentTime", label: "考核时间" },
        { prop: "assessmentWayName", label: "考核类型" },
        { prop: "action", label: "操作", width: 140, fixed: "right" }
      ],
      pickerOptions: {
        disabledDate(v) {
          return v > Date.now();
        }
      },
      commonOptions: {
        communities: [],
        caseDimensions: [],
        caseReasons: [],
        subCaseReasons: [],
        evaluates: [],
        strategies: []
      },
      form: {},
      formData: {},
      detailData: {},
      chartOptions: {},
      detailRow: {}
    };
  },
  computed: {
    searchColumns() {
      return [
        {
          prop: "monthTime",
          label: "考核日期"
        },
        {
          prop: "policyId",
          label: "考核策略",
          type: "select",
          options: this.commonOptions.strategies
        },
        {
          prop: "communityIdArr",
          label: "社区名称",
          type: "select",
          options: this.commonOptions.communities,
          props: { multiple: true }
        },
        {
          prop: "evaluate",
          label: "考核评价",
          type: "select",
          options: this.commonOptions.evaluates
        }
      ];
    },
    columns() {
      return [
        { prop: "basicInfo", label: "考核信息", type: "title" },
        {
          prop: "communityId",
          label: "考核对象",
          type: "select",
          required: true,
          options: this.commonOptions.communities
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
          options: this.commonOptions.caseDimensions
        },
        {
          prop: "caseReasonId",
          label: "一级案由",
          type: "select",
          required: true,
          options: this.commonOptions.caseReasons
        },
        {
          prop: "subCaseReasonId",
          label: "二级案由",
          type: "select",
          required: true,
          options: this.commonOptions.subCaseReasons
        },
        {
          prop: "assessmentType",
          label: "考核方式",
          type: "select",
          required: true,
          options: getAssessmentType2()
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
      ];
    }
  },
  watch: {
    "params.communityIdArr": {
      deep: true,
      immediate: true,
      handler(v) {
        this.params.communityIds = v.toString();
      }
    },
    "downLoadParams.timeRange": {
      deep: true,
      immediate: true,
      handler(v) {
        [this.downLoadParams.startTime, this.downLoadParams.endTime] = ["", ""];
        if (v && v.length) {
          this.downLoadParams.startTime = v[0];
          this.downLoadParams.endTime = new Date(v[1]).setMonth(
            new Date(v[1]).getMonth() + 1
          );
        }
      }
    },
    "formData.caseDimensionId"(v, oldV) {
      this.dimensionChange(v, oldV);
    },
    "formData.caseReasonId"(v, oldV) {
      this.caseReasonChange(v, oldV);
    }
  },
  created() {
    this.firstLoad = true;
    this.getOptions();
  },
  activated() {
    if (!this.showDetailNow) {
      this.checkCommunity(true);
    }
  },
  methods: {
    checkCommunity(search) {
      this.params.communityIdArr = [];
      this.params.communityIds = "";
      this.params.monthTime = Date.now();
      if (this.$route.query.monthTime && this.$route.query.communityId) {
        this.params.monthTime =
          Number(this.$route.query.monthTime) || Date.now();
        this.params.communityIdArr = [Number(this.$route.query.communityId)];
        this.params.communityIds = this.$route.query.communityId;
        this.showDetailNow = true;
        this.$nextTick(() => {
          search && this.search();
        });
      }
    },
    loadComplete(tableData) {
      if (this.firstLoad) {
        this.firstLoad = false;
        return;
      }
      if (this.showDetailNow) {
        this.showDetailNow = false;
        this.showDetail(tableData[0]);
      }
    },
    getOptions() {
      this.getCommunities();
      this.getCaseDimensions();
      this.getEvaluates();
      this.getStrategies();
    },
    async getCaseDimensions() {
      this.dimensionTree = await queryCaseDimensionsCascadeAPI();
      this.commonOptions.caseDimensions = (this.dimensionTree || []).map(
        item => {
          return { id: item.code, name: item.name };
        }
      );
    },
    async getCommunities() {
      this.commonOptions.communities = await communityAllAPI();
    },
    async getEvaluates() {
      this.commonOptions.evaluates = await evaluateAllAPI();
    },
    async getStrategies() {
      this.commonOptions.strategies = await strategyAllAPI();
    },
    dimensionChange(id, oldId) {
      if (oldId) {
        this.formData.caseReasonId = "";
        this.formData.subCaseReasonId = "";
      }
      this.commonOptions.caseReasons = this.getTreeChildByCode(id, 1);
    },
    caseReasonChange(id, oldId) {
      if (oldId) {
        this.formData.subCaseReasonId = "";
      }
      this.commonOptions.subCaseReasons = this.getTreeChildByCode(id, 2);
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
      this.formData = form;
    },
    showDetail(row) {
      this.detailData = row;
      if (row) {
        this.detailData.list = [];
        this.getDetailList(row);
        this.getChart(row);
        this.detailVisible = true;
      }
    },
    getDetailList(row) {
      this.detailLoading = true;
      detailListAPI({
        communityId: row.communityId,
        monthTime: row.assessmentMonth
      })
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
      radarAPI({
        communityId: row.communityId,
        monthTime: row.assessmentMonth
      }).then(res => {
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
      this.detailRow = row;
      this.showDetailRow = true;
    },
    exportExcel() {
      let searchData = {
        token: this.$store.state.userInfo.token
      };
      if (this.downLoadParams.type === 2) {
        if (this.downLoadParams.startTime && this.downLoadParams.endTime) {
          searchData.startTime = this.downLoadParams.startTime;
          searchData.endTime = this.downLoadParams.endTime;
        } else {
          this.$message.error("请先选择下载月份区间！");
          return;
        }
      }
      let str = getExportParams(searchData);
      window.location.href = `/api-customer/community/assessment/Excel?${str}`;
      this.downloadDialog = false;
    },
    getTreeChildByCode(code, level) {
      if (!code && code !== 0) {
        return [];
      }
      let list = [];
      switch (level) {
        case 1:
          list = this.dimensionTree;
          break;
        case 2:
          (this.dimensionTree || []).forEach(item => {
            list.push(...(item.child || []));
          });
          break;
      }
      let result = [];
      list.forEach(item => {
        if (code === item.code) {
          result = (item.child || []).map(v => {
            return { id: v.code, name: v.name };
          });
        }
      });
      return result;
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

::v-deep {
  .download-dialog {
    .el-dialog__header {
      padding: 0;
    }
  }
}
</style>
