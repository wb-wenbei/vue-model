<template>
  <div class="tabs-box">
    <el-tabs v-model="activeName">
      <el-tab-pane name="community" @click.native="activeName = 'community'">
        <span slot="label" style="padding: 0 6px">社区管理</span>
        <common-table
          ref="table"
          :headers="headers"
          :api="pageAPI"
          :columns="columns"
          :deleteApi="deleteAPI"
          :settings="['setting']"
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
        </edit-dialog>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CommonTable from "@/components/commonTable/table";
import EditDialog from "@/components/commonTable/editDialog";
import TableSearch from "@/components/commonTable/tableSearch.vue";

import { pageAPI, deleteAPI, addAPI, updateAPI } from "@/api/community/index";

export default {
  name: "Community",
  components: { CommonTable, EditDialog, TableSearch },
  data() {
    return {
      pageAPI,
      deleteAPI,
      activeName: "community",
      visibleDialog: false,
      loading: false,
      type: "add",
      title: "添加社区",
      community: [],
      totalMenus: [],
      matchMenu: [],
      params: {},
      searchColumns: [
        { prop: "name", label: "社区名称", type: "input" },
        { prop: "orgId", label: "归属物业", type: "org" },
        { prop: "level", label: "社区等级", type: "select", options: [] },
        { prop: "type", label: "社区类型", type: "select", options: [] }
      ],
      headers: [
        { prop: "index", label: "序号" },
        { prop: "name", label: "社区名称" },
        { prop: "name1", label: "归属物业" },
        { prop: "name2", label: "社区类型" },
        { prop: "name3", label: "物业费" },
        { prop: "name4", label: "社区等级" },
        { prop: "name5", label: "建筑面积" },
        { prop: "name6", label: "建成年份" },
        { prop: "name7", label: "人口户数" },
        { prop: "name8", label: "更新时间", type: "date" },
        { prop: "action", label: "操作", width: 100, fixed: "right" }
      ],
      columns: [
        { prop: "name", label: "社区名称", type: "text", required: true }
      ],
      form: {}
    };
  },
  created() {},
  methods: {
    search() {
      this.$refs.table.onQuery();
    },
    editRow(row) {
      this.type = "edit";
      this.title = "编辑社区";
      this.form = row;
      this.visibleDialog = true;
    },
    add() {
      this.type = "add";
      this.title = "添加社区";
      this.form = {};
      this.visibleDialog = true;
    },
    submit(form) {
      let saveForm = Object.assign({}, form);
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

<style scoped lang="scss">
.tabs-box {
  padding: 0 30px 16px;
}
</style>
