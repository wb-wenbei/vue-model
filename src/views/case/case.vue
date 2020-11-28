<template>
  <div class="tabs-box">
    <el-tabs v-model="activeName">
      <el-tab-pane name="case" @click.native="activeName = 'case'">
        <span slot="label" style="padding: 0 6px">案件管理</span>
        <common-table
          ref="table"
          :headers="headers"
          :api="pageAPI"
          :params="params"
          :columns="columns"
          :deleteApi="deleteAPI"
          uploadURL="/api-customer/community/case/import"
          modelUrl=""
          :settings="['setting', 'upload']"
          @editRow="editRow"
          @add="add"
        >
          <template v-slot:table-header>
            <table-search
              v-model="params"
              resettable
              :columns="searchColumns"
              @search="search"
            ></table-search>
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
        >
          <template v-slot:caseAddress="{ form }">
            <span style="display: inline-block;margin-right: 10px"
              >上海市 上海市 闵行区</span
            >
            <el-input
              class="short-width"
              v-model="form.caseAddress"
              placeholder="请输入案件地址"
            ></el-input>
          </template>
          <template v-slot:caseContent="{ form }">
            <el-input
              type="textarea"
              v-model="form.caseContent"
              :rows="10"
              placeholder="注：字数限制1500"
              :maxlength="1500"
              showWordLimit
              @blur="getKeyWordsByContent(form.caseContent)"
            ></el-input>
          </template>
          <template v-slot:caseDimensionId="{ form }">
            <form-select
              v-model="form.caseDimensionId"
              :options="columns[9].options"
              @change="dimensionChange($event, 'form')"
            ></form-select>
          </template>
          <template v-slot:caseReasonId="{ form }">
            <form-select
              v-model="form.caseReasonId"
              :options="columns[10].options"
              @change="ReasonChange"
            ></form-select>
          </template>
        </edit-dialog>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CommonTable from "@/components/commonTable/table";
import EditDialog from "@/components/commonTable/editDialog";
import FormSelect from "@/components/form/select";
import TableSearch from "@/components/commonTable/tableSearch.vue";
import { getTypeList, getTypeChildren } from "@/utils/index";

import {
  pageAPI,
  deleteAPI,
  addAPI,
  updateAPI,
  matchKeyWordAPI
} from "@/api/case/index";
import { getAllAPI as communityListAPI } from "@/api/community/index";
import { getAllAPI as keywordListAPI } from "@/api/keywords/index";

export default {
  name: "Case",
  components: {
    CommonTable,
    EditDialog,
    FormSelect,
    TableSearch
  },
  data() {
    return {
      pageAPI,
      deleteAPI,
      activeName: "case",
      visibleDialog: false,
      loading: false,
      type: "add",
      title: "新增案件",
      case: [],
      params: {},
      searchColumns: [
        { prop: "caseName", label: "案件名称", type: "input" },
        {
          prop: "caseDimension",
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
          prop: "communityId",
          label: "社区名称",
          type: "select",
          options: []
        },
        { prop: "orgId", label: "归属物业", type: "org" }
      ],
      headers: [
        { prop: "index", label: "序号" },
        { prop: "caseName", label: "案件名称" },
        { prop: "communityName", label: "社区名称" },
        { prop: "communityTypeName", label: "社区类型" },
        { prop: "orgName", label: "归属物业" },
        { prop: "caseReasonName", label: "报案缘由" },
        { prop: "caseDimensionName", label: "案件维度" },
        { prop: "caseTime", label: "报案时间", type: "date" },
        { prop: "action", label: "操作", width: 100, fixed: "right" }
      ],
      columns: [
        { index: 0, prop: "basicInfo", label: "基础信息", type: "title" },
        {
          index: 1,
          prop: "caseName",
          label: "案件名称",
          type: "text",
          required: true
        },
        {
          index: 2,
          prop: "caseNumber",
          label: "案件编号",
          type: "text",
          required: true
        },
        {
          index: 3,
          prop: "caseTime",
          label: "报案时间",
          type: "date",
          required: true,
          options: []
        },
        {
          index: 4,
          prop: "communityId",
          label: "社区名称",
          type: "select",
          required: true,
          options: []
        },
        {
          index: 5,
          prop: "orgId",
          label: "归属物业",
          type: "org",
          required: true
        },
        {
          index: 6,
          prop: "caseAddress",
          label: "案件地址",
          required: true,
          cols: 4
        },
        {
          index: 7,
          prop: "caseContent",
          label: "案件内容",
          required: true,
          cols: 2
        },
        { index: 8, prop: "assessInfo", label: "归类信息", type: "title" },
        {
          index: 9,
          prop: "caseDimensionId",
          label: "案件维度",
          required: true,
          options: []
        },
        {
          index: 10,
          prop: "caseReasonId",
          label: "报案缘由",
          required: true,
          options: []
        },
        {
          index: 11,
          prop: "caseKeyword",
          label: "案件关键词",
          type: "select",
          required: true,
          options: [],
          props: { multiple: true }
        }
      ],
      form: {
        caseDimensionId: "",
        caseReasonId: "",
        caseKeyword: ""
      }
    };
  },
  watch: {
    "params.caseDimension"(v) {
      this.dimensionChange(v, "search");
    }
  },
  created() {
    this.getOptions();
  },
  methods: {
    getOptions() {
      this.getCaseDimensions();
      this.getCommunities();
      this.getCaseReasons();
      this.getKeywords();
    },
    async getCaseDimensions() {
      let caseDimensions = await getTypeList("CASE_DIMENSION");
      this.searchColumns[1].options = caseDimensions;
      this.columns[9].options = caseDimensions;
    },
    async getCaseReasons(typeCode, type) {
      let caseReasons = [];
      if (typeCode) {
        caseReasons = await getTypeChildren(typeCode);
      } else {
        caseReasons = await getTypeList("CASE_REASON");
      }
      if (!type) {
        this.columns[10].options = caseReasons;
        this.searchColumns[2].options = caseReasons;
      }
      if (type === "form") {
        this.columns[10].options = caseReasons;
      } else if (type === "search") {
        this.searchColumns[2].options = caseReasons;
      }
    },
    async getCommunities() {
      let communities = await communityListAPI();
      this.searchColumns[3].options = communities;
      this.columns[4].options = communities;
    },
    async getKeywords(parentCode) {
      let keywords = await keywordListAPI({ parentCode: parentCode });
      this.columns[11].options = keywords;
    },
    search() {
      this.$refs.table.onQuery();
    },
    editRow(row) {
      this.type = "edit";
      this.title = "编辑案件";
      this.form = Object.assign({}, row);
      if (this.form.caseAddress && this.form.caseAddress.length) {
        this.form.caseAddress = this.form.caseAddress[0].address;
      }
      this.visibleDialog = true;
    },
    add() {
      this.type = "add";
      this.title = "新增案件";
      this.form = {
        caseDimensionId: "",
        caseReasonId: "",
        caseKeyword: ""
      };
      this.visibleDialog = true;
    },
    submit(form) {
      let saveForm = Object.assign({}, form);
      saveForm.caseAddress = [
        {
          province: "上海市",
          city: "上海市",
          district: "闵行区",
          address: saveForm.caseAddress
        }
      ];
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
      if (form) {
        return true;
      }
    },
    dimensionChange(v, type) {
      this.getCaseReasons(v, type);
      if (type === "form") {
        this.form.caseDimensionId = v;
        this.form.caseReasonId = "";
        this.form.caseKeyword = [];
      } else if (type === "search") {
        this.params.caseReasonId = "";
      }
    },
    ReasonChange(v) {
      this.getKeywords(v);
      this.form.caseReasonId = v;
      this.form.caseKeyword = [];
    },
    async getKeyWordsByContent(content) {
      this.form.caseContent = content;
      let res = await matchKeyWordAPI({ content: content });
      this.form.caseDimensionId = res.dimensionId;
      this.form.caseReasonId = res.reasonId;
      this.form.caseKeyword = res.keywordId;
    }
  }
};
</script>
