<template>
  <el-dialog
    custom-class="table-edit-dialog"
    :title="title"
    :width="width"
    :top="top"
    :fullscreen="fullscreen"
    :append-to-body="appendToBody"
    :close-on-click-modal="false"
    :visible.sync="visibleDialog"
    :before-close="closeDialog"
  >
    <div slot="title" class="dialog-title">
      <slot name="dialog-header">{{ title }}</slot>
      <i
        class="screen-icon el-icon-full-screen"
        @click.stop="fullscreen = !fullscreen"
      ></i>
    </div>
    <slot name="detail-header"></slot>
    <slot name="detail-content">
      <div class="common-table">
        <el-table
          ref="multipleTable"
          :data="tableData"
          v-loading="loading"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <!--        多选-->
          <el-table-column v-if="selection" type="selection" width="55">
          </el-table-column>
          <template v-for="(header, index) in headers">
            <el-table-column
              v-if="header.prop === 'index'"
              :key="index"
              :type="header.prop"
              :width="header.width ? header.width : 50"
              :label="header.label || '序号'"
            ></el-table-column>
            <el-table-column
              v-else
              align="left"
              :key="index"
              :width="header.width ? header.width : 'auto'"
              :type="header.prop === 'index' ? 'index' : ''"
              show-overflow-tooltip
              :prop="header.prop"
              :sortable="header.sortable"
              :fixed="header.fixed"
              :label="header.label"
            >
              <template slot-scope="scope">
                <slot :name="header.prop" v-bind:row="scope.row">
                  <span :class="header.copiable ? 'copiable' : ''">{{
                    scope.row[header.prop]
                  }}</span>
                </slot>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
      <el-pagination
        v-if="page.totalCount > page.pageSize"
        background
        layout="total, prev, pager, next, jumper"
        :page-size="page.pageSize"
        :current-page="page.currentPage"
        @current-change="changePage($event, true)"
        prev-text="上一页"
        next-text="下一页"
        :total="page.totalCount"
      ></el-pagination>
    </slot>
    <slot name="detail-footer"></slot>
    <div v-if="showFooter" slot="footer" class="dialog-footer">
      <slot name="form-action"></slot>
    </div>
  </el-dialog>
</template>

<script>
import "./css/index.scss";

export default {
  name: "detailDialog",
  props: {
    width: { type: String, default: "80%" },
    top: { type: String, default: "10vh" },
    visibleDialog: { type: Boolean, default: false },
    title: { type: String, default: "信息明细" },
    selection: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    appendToBody: { type: Boolean, default: false },
    showFooter: { type: Boolean, default: false },
    data: {},
    headers: { type: Array }
  },
  data() {
    return {
      fullscreen: false,
      tableData: [],
      selects: [],
      page: {
        pageSize: 10,
        totalCount: 0,
        currentPage: 1
      }
    };
  },
  watch: {
    data(v) {
      this.tableData = v.data || v;
    }
  },
  created() {
    this.tableData = this.data.data || this.data || [];
  },
  methods: {
    changePage() {
      this.$emit("changePage", this.page);
    },
    handleSelectionChange(v) {
      this.selects = v;
    },
    closeDialog() {
      this.$emit("update:visibleDialog", false);
    }
  }
};
</script>
