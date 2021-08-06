<template>
  <div class="tabs-box">
    <common-table
      ref="table"
      :headers="headers"
      :api="pageAPI"
      selection
      :params="params"
      :can-add="false"
      :can-delete-batch="false"
      :deleteApi="deleteAPI"
      :uploadURL="uploadURL"
      :modelUrl="modelUrl"
      :settings="['setting', 'upload']"
      @editRow="editRow"
      @uploadComplete="uploadComplete"
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
      <template v-slot:table-select-box="{ selects }">
        <span v-if="selects.length > 0" @click="submitBatch(selects)"
          >批量提交</span
        >
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
    <detail-dialog title="错误数据信息明细" :visibleDialog.sync="showError">
      <template v-slot:detail-content>
        <div style="max-height: 600px;overflow: auto">
          <ul>
            <li
              style="margin-bottom: 4px"
              v-for="(item, index) in errorList"
              :key="index"
            >
              {{ item.errorMessage }}
            </li>
          </ul>
        </div>
      </template>
    </detail-dialog>
  </div>
</template>

<script>
import CommonTable from "@/components/commonTable/table";
import EditDialog from "@/components/commonTable/editDialog";
import DetailDialog from "@/components/commonTable/detailDialog";
import TableSearch from "@/components/commonTable/tableSearch.vue";

import { queryCaseDimensionsCascadeAPI } from "@/api/case/index";
import {
  pageAPI,
  deleteAPI,
  updateAPI,
  submitAPI
} from "@/api/caseAddress/index";
import { getAllAPI as communityListAPI } from "@/api/community/index";
import { getTypeList } from "@/utils";

export default {
  name: "Case",
  components: {
    CommonTable,
    EditDialog,
    DetailDialog,
    TableSearch
  },
  data() {
    return {
      pageAPI,
      deleteAPI,
      visibleDialog: false,
      showError: false,
      loading: false,
      type: "add",
      title: "新增案件",
      modelUrl: "",
      uploadURL: "/api-customer/community/caseManagementMatch/import",
      case: [],
      params: {},
      errorList: [],
      dimensionTree: [],
      headers: [
        { prop: "index", label: "序号" },
        { prop: "caseNumber", label: "接警单编号" },
        { prop: "caseDimensionName", label: "案件维度" },
        { prop: "caseReasonName", label: "一级案由" },
        { prop: "subCaseReasonName", label: "二级案由" },
        { prop: "caseTime", label: "报案时间", type: "date" },
        {
          prop: "match",
          label: "匹配结果",
          filter: v => {
            return v ? "有结果" : "无结果";
          }
        },
        { prop: "communityTypeName", label: "社区类型" },
        { prop: "communityName", label: "社区名称" },
        { prop: "action", label: "操作", width: 100, fixed: "right" }
      ],
      commonOptions: {
        communityTypes: [],
        communities: []
      },
      searchOptions: {
        caseDimensions: [],
        caseReasons: [],
        subCaseReasons: [],
        match: [
          { id: 1, name: "有结果" },
          { id: 0, name: "无结果" }
        ]
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
          options: this.searchOptions.caseDimensions
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
          prop: "match",
          label: "匹配结果",
          type: "select",
          options: this.searchOptions.match
        },
        {
          prop: "communityId",
          label: "社区名称",
          type: "select",
          options: this.commonOptions.communities
        }
      ];
    },
    columns() {
      return [
        {
          prop: "communityTypeId",
          label: "社区类型",
          type: "select",
          required: true,
          options: this.commonOptions.communityTypes
        },
        {
          prop: "communityId",
          label: "社区名称",
          type: "select",
          required: true,
          options: this.commonOptions.communities
        }
      ];
    }
  },
  watch: {
    "params.caseDimension"(v) {
      this.dimensionChange(v);
    },
    "params.caseReasonId"(v) {
      this.caseReasonChange(v);
    },
    "formData.communityTypeId"(v, oldV) {
      this.getCommunities(v, oldV);
    }
  },
  created() {
    this.getOptions();
    let token = this.$store.state.auth.token;
    this.modelUrl = `/api-customer/community/caseManagementMatch/downloadTemplate?token=${token}`;
  },
  methods: {
    getOptions() {
      this.getTypes();
      this.getCaseDimensions();
      this.getCommunities();
    },
    async getTypes() {
      this.commonOptions.communityTypes = await getTypeList("COMMUNITY_TYPE");
    },
    async getCaseDimensions() {
      this.dimensionTree = await queryCaseDimensionsCascadeAPI();
      this.searchOptions.caseDimensions = (this.dimensionTree || []).map(
        item => {
          return { id: item.code, name: item.name };
        }
      );
    },
    async getCommunities(type, oldV) {
      if (oldV) {
        this.formData.communityId = "";
      }
      this.commonOptions.communities = await communityListAPI({
        type: type
      });
    },
    search() {
      this.params.matchResult = "";
      if (this.params.match || this.params.match === 0) {
        this.params.matchResult = !!this.params.match;
      }
      this.$refs.table.onQuery();
    },
    uploadComplete(v) {
      if (v.data && v.data.length) {
        this.$message.error("导入失败!");
        this.errorList = v.data;
        this.showError = true;
      }
    },
    editRow(row) {
      this.type = "edit";
      this.title = "编辑案件匹配";
      this.formData = {};
      this.form = Object.assign({}, row);
      this.visibleDialog = true;
    },
    submit(form) {
      let saveForm = {
        id: form.id,
        communityTypeId: form.communityTypeId,
        communityId: form.communityId,
        communityName: this.getNameById(
          form.communityId,
          this.commonOptions.communities
        )
      };
      if (this.checkForm(saveForm)) {
        this.loading = true;
        updateAPI(saveForm)
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
    submitBatch(selects) {
      this.$confirm("确定要提交至案件管理？").then(() => {
        submitAPI(selects)
          .then(res => {
            if (res > 0) {
              this.$message.success(`本次提交成功${res}条！`);
            } else {
              this.$message.error(`本次提交成功${res}条！`);
            }
            this.search();
          })
          .catch(err => {
            this.$message.error("提交失败：" + err);
          });
      });
    },
    checkForm(form) {
      if (form) {
        return true;
      }
    },
    formUpdate(form) {
      this.formData = form;
    },
    dimensionChange(id) {
      this.params.caseReasonId = "";
      this.params.subCaseReasonId = "";
      this.searchOptions.caseReasons = this.getTreeChildByCode(id, 1);
    },
    caseReasonChange(id) {
      this.params.subCaseReasonId = "";
      this.searchOptions.subCaseReasons = this.getTreeChildByCode(id, 2);
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
    },
    getNameById(id, options) {
      let result = "--";
      options.forEach(item => {
        if (item.id === id) {
          result = item.name;
        }
      });
      return result;
    }
  }
};
</script>
