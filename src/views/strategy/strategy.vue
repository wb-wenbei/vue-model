<template>
  <div class="tabs-box">
    <el-tabs v-model="activeName">
      <el-tab-pane name="strategy" @click.native="activeName = 'strategy'">
        <span slot="label" style="padding: 0 6px">策略维护</span>
        <common-table
          ref="table"
          :headers="headers"
          :api="pageAPI"
          :params="params"
          :columns="columns"
          :canDelete="false"
          :settings="['setting']"
          @editRow="editRow"
        >
          <template v-slot:header-left>
            <el-button type="primary" @click="add">
              <i class="el-icon-plus"></i>{{ title }}
            </el-button>
            <el-button @click="setEva">
              评价设置
            </el-button>
          </template>
          <template v-slot:table-header>
            <table-search
              v-model="params"
              resettable
              :columns="searchColumns"
              @search="search"
            ></table-search>
          </template>
          <template v-slot:action-prepend="{ row }">
            <el-button @click="concatRow(row)" type="text">关联</el-button>
          </template>
          <!--<template v-slot:action="{ row }">
            <el-button @click="stopRow(row)" type="text">
              {{ row.isEnabled ? "停用" : "启用" }}
            </el-button>
          </template>-->
        </common-table>
        <edit-dialog
          v-if="visibleDialog"
          :visibleDialog.sync="visibleDialog"
          :title="title"
          :columns="columns"
          :loading="loading"
          :form="form"
          @save="submit"
        >
          <template v-slot:assessmentPolicyDetail>
            <form-table
              v-model="form.assessmentPolicyDetail"
              :columns="formColumns"
              :defaultRow="defaultRow"
              :required="[
                'caseDimensionId',
                'assessmentType',
                'singleThreshold'
              ]"
              @change="onChange"
            >
            </form-table>
          </template>
        </edit-dialog>
        <eva-setting :visibleDialog.sync="showEva"></eva-setting>
        <concat-setting
          :visibleDialog.sync="showConcat"
          :data="concatData"
        ></concat-setting>
      </el-tab-pane>
      <el-tab-pane name="keywords" @click.native="activeName = 'keywords'">
        <span slot="label" style="padding: 0 6px">关键词维护</span>
        <keywords></keywords>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CommonTable from "@/components/commonTable/table";
import EditDialog from "@/components/commonTable/editDialog";
import FormTable from "@/components/form/formTable";
import TableSearch from "@/components/commonTable/tableSearch.vue";
import Keywords from "./components/keywords";
import EvaSetting from "./components/evaSetting";
import ConcatSetting from "./components/concatSetting";
import { getAssessmentType } from "@/config/dictionary";

import {
  pageAPI,
  addAPI,
  updateAPI,
  enablePolicyAPI
} from "@/api/strategy/index";
import { getTypeList, getTypeChildren } from "@/utils/index";

export default {
  name: "Strategy",
  components: {
    CommonTable,
    EditDialog,
    FormTable,
    TableSearch,
    Keywords,
    EvaSetting,
    ConcatSetting
  },
  data() {
    return {
      pageAPI,
      activeName: "strategy",
      visibleDialog: false,
      loading: false,
      showEva: false,
      showConcat: false,
      concatData: {},
      type: "add",
      title: "新增策略",
      strategy: [],
      params: {},
      caseReasons: [],
      headers: [
        { prop: "index", label: "序号" },
        { prop: "policyName", label: "策略名称" },
        {
          prop: "assessmentPolicyDetail",
          label: "关联社区",
          filter: v => {
            return v ? v.length : 0;
          }
        },
        /*{
          prop: "isEnabled",
          label: "状态",
          filter: v => {
            return v ? "启用" : "停用";
          }
        },*/
        { prop: "userName", label: "创建人" },
        { prop: "updateTime", label: "更新时间", type: "date" },
        { prop: "action", label: "操作", width: 100, fixed: "right" }
      ],
      searchColumns: [
        {
          prop: "policyName",
          label: "策略名称",
          type: "input"
        }
      ],
      columns: [
        {
          index: 0,
          prop: "policyName",
          label: "策略名称",
          type: "text",
          required: true,
          cols: 4
        },
        {
          index: 1,
          prop: "assessmentPolicyDetail",
          label: "策略设置",
          required: true,
          cols: 4
        }
      ],
      form: { assessmentPolicyDetail: [] },
      defaultRow: {
        assessmentType: 1,
        options: { caseReasonId: [] }
      },
      formColumns: [
        {
          prop: "caseDimensionId",
          label: "案件维度",
          type: "select",
          options: []
        },
        {
          prop: "caseReasonId",
          label: "报案缘由",
          type: "select",
          options: []
        },
        {
          prop: "assessmentType",
          label: "考核方式",
          type: "select",
          options: getAssessmentType()
        },
        {
          prop: "singleThreshold",
          label: "单次阈值",
          type: "text",
          append: "分"
        },
        { prop: "percent", label: "评分占比", type: "text", append: "%" }
      ]
    };
  },
  created() {
    this.getOptions();
  },
  methods: {
    getOptions() {
      this.getCaseDimensions();
      this.getCaseReasons();
    },
    async getCaseDimensions() {
      let caseDimensions = await getTypeList("CASE_DIMENSION");
      this.formColumns[0].options = caseDimensions;
    },
    async getCaseReasons() {
      this.caseReasons = await getTypeList("CASE_REASON");
      this.formColumns[1].options = this.caseReasons;
    },
    search() {
      this.$refs.table.onQuery();
    },
    editRow(row) {
      this.type = "edit";
      this.title = "编辑策略";
      let form = JSON.parse(JSON.stringify(row));
      if (form.assessmentPolicyDetail && form.assessmentPolicyDetail.length) {
        form.assessmentPolicyDetail.forEach(v => {
          v.percent = v.scoresPercentage * 100;
          v.isEdit = 0;
          v.options = { caseReasonId: this.caseReasons };
        });
      }
      this.form = form;
      this.visibleDialog = true;
    },
    add() {
      this.type = "add";
      this.title = "新增策略";
      this.form = { isSpecCommunityFacilities: 0 };
      this.visibleDialog = true;
    },
    concatRow(row) {
      this.concatData = row;
      this.showConcat = true;
    },
    setEva() {
      this.showEva = true;
    },
    stopRow(row) {
      enablePolicyAPI({ id: row.id })
        .then(() => {
          this.$message.success(`状态切换成功！`);
          this.$refs.table.refresh();
        })
        .catch(err => {
          this.$message.error(`${this.title}失败：${err}`);
        });
    },
    submit(form) {
      let saveForm = Object.assign({}, form);
      if (this.checkForm(saveForm)) {
        let api = this.type === "add" ? addAPI : updateAPI;
        this.loading = true;
        api(saveForm)
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
      if (!form.assessmentPolicyDetail || !form.assessmentPolicyDetail.length) {
        return false;
      }
      let percentCount = 0;
      let isEdit = false;
      let sameCaseReasonId = false;
      let caseReasonIds = [];
      form.assessmentPolicyDetail.forEach(v => {
        v.scoresPercentage = Number(v.percent / 100);
        v.singleThreshold = Number(v.singleThreshold);
        percentCount += Number(v.percent);
        if (v.isEdit) {
          isEdit = true;
        }
        if (caseReasonIds.indexOf(v.caseReasonId) > -1) {
          sameCaseReasonId = true;
        } else {
          caseReasonIds.push(v.caseReasonId);
        }
      });
      if (isEdit) {
        this.$message.error("请先保存所有策略设置明细！");
        return false;
      }
      if (sameCaseReasonId) {
        this.$message.error("相同报案缘由只能设置一次扣分策略！");
        return false;
      }
      if (percentCount !== 100) {
        this.$message.error("策略设置评分占比之和必须为100%！");
        return false;
      }
      return true;
    },
    async onChange(type, event, row) {
      if (type === "caseDimensionId") {
        let caseReasons = await getTypeChildren(event);
        row.caseReasonId = "";
        if (row.options) {
          row.options.caseReasonId = caseReasons;
        } else {
          row.options = { caseReasonId: caseReasons };
        }
      }
    }
  }
};
</script>
