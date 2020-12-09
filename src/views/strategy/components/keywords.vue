<template>
  <div class="keywords">
    <common-table
      ref="table"
      :headers="headers"
      :api="pageAPI"
      :params="params"
      :columns="columns"
      :deleteApi="deleteAPI"
      uploadURL="/api-customer/community/keyword/import"
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
      :visibleDialog.sync="visibleDialog"
      :title="title"
      :columns="columns"
      :loading="loading"
      :form="form"
      @save="submit"
    >
      <template v-slot:caseDimensionId="{ form }">
        <form-select
          v-model="form.caseDimensionId"
          :options="columns[0].options"
          @change="dimensionChange($event, 'form')"
        ></form-select>
      </template>
    </edit-dialog>
  </div>
</template>

<script>
import CommonTable from "@/components/commonTable/table";
import EditDialog from "@/components/commonTable/editDialog";
import FormSelect from "@/components/form/select";
import TableSearch from "@/components/commonTable/tableSearch.vue";
import { getTypeList, getTypeChildren } from "@/utils/index";

import { pageAPI, deleteAPI, addAPI, updateAPI } from "@/api/keywords/index";

export default {
  name: "case",
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
      visibleDialog: false,
      loading: false,
      type: "add",
      title: "新增关键词",
      case: [],
      allCaseReasons: [],
      params: {
        caseDimensionId: ""
      },
      searchColumns: [
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
          prop: "keyword",
          label: "关键词",
          type: "input"
        }
      ],
      searchOptions: {},
      headers: [
        { prop: "index", label: "序号" },
        { prop: "caseDimensionName", label: "案件维度" },
        { prop: "caseReasonName", label: "报案缘由" },
        { prop: "keyword", label: "关键词" },
        { prop: "updateTime", label: "修改时间", type: "date" },
        { prop: "userName", label: "添加人" },
        { prop: "action", label: "操作", width: 100, fixed: "right" }
      ],
      columns: [
        {
          index: 0,
          prop: "caseDimensionId",
          label: "案件维度",
          required: true,
          options: []
        },
        {
          index: 1,
          prop: "caseReasonId",
          label: "报案缘由",
          type: "select",
          required: true,
          options: []
        },
        {
          index: 2,
          prop: "keyword",
          label: "关键词",
          type: "text",
          required: true
        }
      ],
      form: {
        caseDimensionId: "",
        caseReasonId: ""
      }
    };
  },
  watch: {
    "params.caseDimensionId"(v) {
      this.dimensionChange(v, "search");
    }
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
      this.searchColumns[0].options = caseDimensions;
      this.columns[0].options = caseDimensions;
    },
    async getCaseReasons(typeCode, type = "from") {
      let caseReasons = [];
      if (typeCode) {
        caseReasons = await getTypeChildren(typeCode);
      } else {
        caseReasons = await getTypeList("CASE_REASON");
        this.allCaseReasons = [...caseReasons];
      }
      if (type === "form") {
        this.columns[1].options = caseReasons;
      } else {
        this.searchColumns[1].options = caseReasons;
      }
    },
    search() {
      this.$refs.table.onQuery();
    },
    editRow(row) {
      this.type = "edit";
      this.title = "编辑关键词";
      this.form = row;
      this.columns[1].options = this.allCaseReasons;
      this.visibleDialog = true;
    },
    add() {
      this.type = "add";
      this.title = "新增关键词";
      this.form = {
        caseDimensionId: "",
        caseReasonId: ""
      };
      this.visibleDialog = true;
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
      if (form) {
        return true;
      }
    },
    dimensionChange(v, type) {
      this.getCaseReasons(v, type);
      if (type === "form") {
        this.form.caseDimensionId = v;
        this.form.caseReasonId = "";
      } else {
        this.params.caseReasonId = "";
      }
    }
  }
};
</script>
