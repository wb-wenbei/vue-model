<template>
  <div class="tabs-box">
    <common-table
      ref="table"
      :headers="headers"
      :api="pageAPI"
      :params="params"
      :deleteApi="deleteAPI"
      :settings="['setting', 'upload']"
      :modelUrl="modelUrl"
      :uploadURL="uploadURL"
      @editRow="editRow"
      @add="add"
    >
      <template v-slot:table-header>
        <table-search
          v-model="params"
          resettable
          labelWidth="90px"
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
      @formUpdate="formUpdate"
      @save="submit"
    >
      <template v-slot:caseAddress="{ form }">
        <span style="display: inline-block;margin-right: 10px">
          上海市 上海市 闵行区
        </span>
        <el-input
          class="short-width"
          v-model="form.caseAddress"
          placeholder="请输入案件地址"
        ></el-input>
      </template>
    </edit-dialog>
  </div>
</template>

<script>
import CommonTable from "@/components/commonTable/table";
import EditDialog from "@/components/commonTable/editDialog";
import TableSearch from "@/components/commonTable/tableSearch.vue";

import {
  pageAPI,
  deleteAPI,
  addAPI,
  updateAPI,
  queryCaseDimensionsCascadeAPI
} from "@/api/case/index";
import { getAllAPI as communityListAPI } from "@/api/community/index";
import { getAllAPI as keywordListAPI } from "@/api/keywords/index";
import { getAllAPI } from "@/api/committee";
import { getEntityType } from "@/utils";

export default {
  name: "Case",
  components: {
    CommonTable,
    EditDialog,
    TableSearch
  },
  data() {
    return {
      pageAPI,
      deleteAPI,
      visibleDialog: false,
      loading: false,
      type: "add",
      title: "新增案件",
      modelUrl: "",
      uploadURL: "/api-customer/community/case/import",
      case: [],
      params: {},
      dimensionTree: [],
      headers: [
        { prop: "index", label: "序号" },
        { prop: "caseNumber", label: "接警单编号" },
        { prop: "communityName", label: "社区名称" },
        { prop: "communityTypeName", label: "社区类型" },
        { prop: "propertyName", label: "归属物业" },
        { prop: "committeeName", label: "归属居委" },
        { prop: "caseDimensionName", label: "案件维度" },
        { prop: "caseReasonName", label: "一级案由" },
        { prop: "subCaseReasonName", label: "二级案由" },
        { prop: "caseTime", label: "报案时间", type: "date" },
        { prop: "action", label: "操作", width: 100, fixed: "right" }
      ],
      commonOptions: {
        communities: [],
        caseDimensions: [],
        caseReasons: [],
        subCaseReasons: [],
        properties: [],
        keywords: []
      },
      searchOptions: {
        caseReasons: [],
        subCaseReasons: []
      },
      form: {},
      formData: {}
    };
  },
  computed: {
    searchColumns() {
      return [
        { prop: "caseNumber", label: "接警单编号", type: "input" },
        {
          prop: "caseDimension",
          label: "案件维度",
          type: "select",
          options: this.commonOptions.caseDimensions
        },
        {
          prop: "caseReasonId",
          label: "一级案由",
          type: "select",
          options: this.searchOptions.caseReasons
        },
        {
          prop: "subCaseReasonId",
          label: "二级案由",
          type: "select",
          options: this.searchOptions.subCaseReasons
        },
        {
          prop: "communityId",
          label: "社区名称",
          type: "select",
          options: this.commonOptions.communities
        },
        {
          prop: "propertyId",
          label: "归属物业",
          type: "select",
          options: this.commonOptions.properties
        }
      ];
    },
    columns() {
      return [
        { prop: "basicInfo", label: "基础信息", type: "title" },
        {
          prop: "caseNumber",
          label: "接警单编号",
          type: "text"
        },
        {
          prop: "caseTime",
          label: "报案时间",
          type: "date",
          required: true
        },
        {
          prop: "communityId",
          label: "社区名称",
          type: "select",
          required: true,
          options: this.commonOptions.communities
        },
        {
          prop: "caseAddress",
          label: "案件地址",
          required: true,
          cols: 4
        },
        {
          prop: "caseContent",
          label: "备注",
          type: "textArea",
          cols: 2
        },
        { prop: "assessInfo", label: "归类信息", type: "title" },
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
          prop: "caseKeyword",
          label: "案件关键词",
          type: "select",
          required: true,
          options: this.commonOptions.keywords,
          props: { multiple: true }
        }
      ];
    }
  },
  watch: {
    "params.caseDimension"(v, oldV) {
      this.dimensionChange(v, oldV, "search");
    },
    "params.caseReasonId"(v, oldV) {
      this.caseReasonChange(v, oldV, "search");
    },
    "formData.caseDimensionId"(v, oldV) {
      this.dimensionChange(v, oldV);
    },
    "formData.caseReasonId"(v, oldV) {
      this.caseReasonChange(v, oldV);
    },
    "formData.subCaseReasonId"(v, oldV) {
      this.subCaseReasonChange(v, oldV);
    }
  },
  created() {
    this.getOptions();
    let token = this.$store.state.auth.token;
    this.modelUrl = `/api-customer/community/getFile?token=${token}&type=2`;
  },
  methods: {
    getOptions() {
      this.getCaseDimensions();
      this.getCommunities();
      this.getProperties();
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
      this.commonOptions.communities = await communityListAPI();
    },
    async getProperties() {
      this.commonOptions.properties = await getAllAPI({
        entityType: getEntityType("PROPERTY")
      });
    },
    async getKeywords(parentCode) {
      this.commonOptions.keywords = await keywordListAPI({
        code: parentCode
      });
    },
    search() {
      this.$refs.table.onQuery();
    },
    editRow(row) {
      this.type = "edit";
      this.title = "编辑案件";
      this.formData = {};
      if (row.caseAddress && row.caseAddress.length) {
        row.caseAddress = row.caseAddress[0].address;
      }
      this.commonOptions.caseReasons = this.getTreeChildByCode(
        row.caseDimensionId,
        1
      );
      this.commonOptions.subCaseReasons = this.getTreeChildByCode(
        row.caseReasonId,
        2
      );
      this.getKeywords(row.subCaseReasonId);
      this.form = Object.assign({}, row);
      this.visibleDialog = true;
    },
    add() {
      this.type = "add";
      this.title = "新增案件";
      this.form = {};
      this.formData = {};
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
    formUpdate(form) {
      this.formData = form;
    },
    dimensionChange(id, oldId, type) {
      if (type === "search") {
        this.params.caseReasonId = "";
        this.params.subCaseReasonId = "";
        this.searchOptions.caseReasons = this.getTreeChildByCode(id, 1);
      } else {
        if (oldId) {
          this.formData.caseReasonId = "";
          this.formData.subCaseReasonId = "";
          this.formData.caseKeyword = [];
        }
        this.commonOptions.caseReasons = this.getTreeChildByCode(id, 1);
      }
    },
    caseReasonChange(id, oldId, type) {
      if (type === "search") {
        this.params.subCaseReasonId = "";
        this.searchOptions.subCaseReasons = this.getTreeChildByCode(id, 2);
      } else {
        if (oldId) {
          this.formData.subCaseReasonId = "";
          this.formData.caseKeyword = [];
        }
        this.commonOptions.subCaseReasons = this.getTreeChildByCode(id, 2);
      }
    },
    subCaseReasonChange(id, oldV) {
      if (oldV) {
        this.formData.caseKeyword = [];
      }
      this.getKeywords(id);
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
