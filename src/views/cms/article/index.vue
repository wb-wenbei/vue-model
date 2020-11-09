<template>
  <div class="tabs-box">
    <el-tabs v-model="activeName">
      <el-tab-pane name="article" @click.native="activeName = 'article'">
        <span slot="label" style="padding: 0 6px">新闻管理</span>
        <common-table
          :headers="headers"
          :data="tableData"
          @editRow="editRow"
        ></common-table>
        <edit-dialog :visibleDialog.sync="visibleDialog"></edit-dialog>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CommonTable from "@/components/commonTable/table";
import EditDialog from "@/components/commonTable/editDialog";

export default {
  name: "index",
  components: { CommonTable, EditDialog },
  data() {
    return {
      activeName: "article",
      headers: [
        { prop: "index", label: "序号" },
        { prop: "title", label: "标题" },
        { prop: "updateTime", label: "更新时间", type: "time" },
        { prop: "updateUser", label: "更新人" },
        { prop: "action", label: "操作", width: 140, fixed: "right" }
      ],
      visibleDialog: false,
      tableData: [
        {
          id: 1,
          title: "文章测试",
          updateTime: Date.now(),
          updateUser: "test"
        }
      ]
    };
  },
  methods: {
    editRow() {
      this.visibleDialog = true;
    }
  }
};
</script>

<style scoped lang="scss">
.tabs-box {
  padding: 16px 30px;
}
</style>
