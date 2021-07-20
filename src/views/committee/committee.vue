<template>
  <div class="tabs-box">
    <common-table
      ref="table"
      :headers="headers"
      :api="pageAPI"
      :params="params"
      :modelUrl="modelUrl"
      :uploadURL="uploadURL"
      :settings="['setting', 'upload']"
      @editRow="editRow"
      @deleteRow="deleteRow"
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
    </edit-dialog>
  </div>
</template>

<script>
import CommonTable from "@/components/commonTable/table";
import EditDialog from "@/components/commonTable/editDialog";
import TableSearch from "@/components/commonTable/tableSearch.vue";
import { getEntityType } from "@/utils/index";
import { pageAPI, deleteAPI, addAPI, updateAPI } from "@/api/committee/index";

export default {
  name: "Committee",
  components: {
    CommonTable,
    TableSearch,
    EditDialog
  },
  data() {
    return {
      pageAPI,
      visibleDialog: false,
      loading: false,
      type: "add",
      title: "新增居委",
      options: {},
      modelUrl: "",
      uploadURL: "/api-customer/service-wisdom-town/committee/import",
      params: { entityType: getEntityType("COMMITTEE") },
      searchColumns: [
        { prop: "entityName", label: "居委名称", type: "input" },
        {
          prop: "entityDirectorName",
          label: "负责人",
          type: "input"
        }
      ],
      headers: [
        { prop: "index", label: "序号" },
        { prop: "entityName", label: "居委名称" },
        { prop: "entityDirectorName", label: "居委负责人" },
        { prop: "contactPhone", label: "联系电话" },
        { prop: "address", label: "居委地址" },
        { prop: "updateTime", label: "修改时间", type: "timeMinute" },
        { prop: "action", label: "操作", width: 100, fixed: "right" }
      ],
      columns: [
        {
          prop: "entityName",
          label: "居委名称",
          type: "text",
          required: true
        },
        {
          prop: "orgId",
          label: "组织机构",
          type: "org",
          required: true
        },
        {
          prop: "entityDirectorName",
          label: "居委负责人",
          type: "text",
          required: true
        },
        {
          prop: "contactPhone",
          label: "联系电话",
          type: "text",
          required: true
        },
        {
          prop: "address",
          label: "居委地址",
          type: "text",
          required: true,
          props: {
            placeholder: "示例：上海市闵行区XX街道929号"
          }
        },
        {
          prop: "location",
          label: "居委位置",
          type: "address",
          required: true,
          cols: 2
        }
      ],
      form: {}
    };
  },
  created() {
    this.getOptions();
  },
  methods: {
    getOptions() {
      this.modelUrl =
        "/api-customer/service-wisdom-town/committee/download/excel?token=" +
        this.$store.state.userInfo.token;
    },
    search() {
      this.$refs.table.onQuery();
    },
    editRow(row) {
      this.type = "edit";
      this.title = "编辑居委";
      this.form = row;
      if (row.lng && row.lat) {
        this.form.location = [row.lng, row.lat];
      }
      this.visibleDialog = true;
    },
    deleteRow(row) {
      this.$confirm("确定要删除吗？").then(() => {
        deleteAPI({ id: row.id })
          .then(() => {
            this.$message.success("居委删除成功！");
            this.$refs.table.refresh();
          })
          .catch(err => {
            this.$message.error("居委删除失败：" + err);
          });
      });
    },
    add() {
      this.type = "add";
      this.title = "新增居委";
      this.form = { gridId: -1 };
      this.visibleDialog = true;
    },
    submit(form) {
      let saveForm = Object.assign({}, form, {
        entityType: getEntityType("COMMITTEE"),
        lng: form.location[0],
        lat: form.location[1]
      });
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
  }
};
</script>

<style scoped lang="scss"></style>
