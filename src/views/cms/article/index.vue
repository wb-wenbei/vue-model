<template>
  <div class="tabs-box">
    <el-tabs v-model="activeName">
      <el-tab-pane name="article" @click.native="activeName = 'article'">
        <span slot="label" style="padding: 0 6px">新闻管理</span>
        <common-table
          :headers="headers"
          :data="tableData"
          @editRow="editRow"
          @add="add"
        ></common-table>
        <edit-dialog
          :visibleDialog.sync="visibleDialog"
          :title="title"
          :columns="columns"
        >
          <template v-slot:content></template>
        </edit-dialog>
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
      title: "添加文章",
      tableData: [
        {
          id: 1,
          title: "文章测试",
          updateTime: Date.now(),
          updateUser: "test"
        }
      ],
      columns: [
        { prop: "title", label: "标题", type: "text", required: true },
        {
          prop: "description",
          label: "描述",
          type: "textarea",
          required: true
        },
        { prop: "image", label: "图片", type: "image", required: true },
        { prop: "content", label: "内容", type: "custom", cols: 2 },
        { prop: "sort", label: "排序", type: "number" },
        { prop: "sort", label: "排序", type: "number" },
        { prop: "setTop", label: "置顶", type: "radio" }
      ],
      form: {
        title: "",
        image: "",
        description: "",
        content: "",
        sort: 0,
        setTop: false
      }
    };
  },
  methods: {
    editRow() {
      this.title = "编辑文章";
      this.visibleDialog = true;
    },
    add() {
      this.title = "添加文章";
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
