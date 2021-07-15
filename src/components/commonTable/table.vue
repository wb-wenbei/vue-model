<template>
  <div class="table-content">
    <div class="table-header-search">
      <slot name="table-header"></slot>
    </div>
    <div class="table-header-btn">
      <div>
        <slot name="header-left">
          <el-button v-if="canAdd" type="primary" @click="add">
            <i class="el-icon-plus"></i>{{ addTitle }}
          </el-button>
        </slot>
      </div>
      <div>
        <slot name="header-right">
          <table-function
            :headers="headers"
            :settings="settings"
            :noShowList="noShowList"
            v-bind="$attrs"
            v-on="$listeners"
            @checkChange="checkChange"
            @uploadSuccess="onQuery"
          ></table-function>
        </slot>
      </div>
    </div>
    <div v-if="selection" class="table-select-box">
      <i class="el-icon-info"></i>
      已选择{{ selects.length }}项
      <span v-if="selects.length > 0" @click="cancelSelect">取消勾选</span>
      <span
        v-if="canDeleteBatch && selects.length > 0"
        @click="deleteBatch"
        class="delete"
        >批量删除</span
      >
      <slot name="table-select-box" v-bind:selects="selects"></slot>
    </div>
    <div class="common-table">
      <el-table
        ref="multipleTable"
        v-loading="isLoading || loading"
        v-bind="$attrs"
        v-on="$listeners"
        :data="tableData"
        :row-key="rowKey"
        border
        style="width: 100%"
        @select-all="selectAll"
        @selection-change="handleSelectionChange"
      >
        <!--        多选-->
        <el-table-column
          v-if="selection"
          type="selection"
          :selectable="selectable"
          width="55"
        >
        </el-table-column>
        <template v-for="(header, index) in currentHeaders">
          <!--          排序-->
          <el-table-column
            v-if="header.prop === 'index' && header.show"
            :key="index"
            :type="header.prop"
            :width="header.width ? header.width : 50"
            :label="header.label || '序号'"
          ></el-table-column>
          <el-table-column
            v-else-if="header.show"
            align="left"
            :key="index"
            :width="header.width ? header.width : 'auto'"
            :type="header.prop === 'index' ? 'index' : ''"
            :prop="header.prop"
            show-overflow-tooltip
            :sortable="header.sortable"
            :fixed="header.fixed"
            :label="header.label"
          >
            <template slot-scope="scope">
              <!--              操作-->
              <span v-if="header.prop === 'action'">
                <slot name="action-prepend" v-bind:row="scope.row"></slot>
                <el-button
                  v-if="canEdit"
                  @click="editRow(scope.row)"
                  type="text"
                  >编辑</el-button
                >
                <el-button
                  v-if="canDelete"
                  @click="deleteRow(scope.row)"
                  type="text"
                  class="table-del"
                  >删除</el-button
                >
                <slot name="action" v-bind:row="scope.row"></slot>
              </span>
              <!--              链接-->
              <span v-else-if="header.type === 'link'">
                <el-button @click="rowClick(scope.row, header.prop)" type="text"
                  ><span :class="header.copiable ? 'copiable' : ''">{{
                    scope.row[header.prop]
                  }}</span></el-button
                >
              </span>
              <!--              时间-->
              <span v-else-if="header.type === 'date'">
                {{ scope.row[header.prop] | formatDate }}
              </span>
              <!--              时间-时-分-->
              <span v-else-if="header.type === 'timeMinute'">
                {{ scope.row[header.prop] | formatDateTimeHm }}
              </span>
              <!--              时间-时分秒-->
              <span v-else-if="header.type === 'timeSecond'">
                {{ scope.row[header.prop] | formatDateTime }}
              </span>
              <!--              图片-->
              <span v-else-if="header.type === 'image'">
                <el-image
                  class="table-image"
                  :src="scope.row[header.prop]"
                  :preview-src-list="[scope.row[header.prop]]"
                ></el-image>
              </span>
              <span v-else-if="header.filter">
                {{ header.filter(scope.row[header.prop]) }}
              </span>
              <slot
                v-else-if="header.type === 'custom'"
                :name="header.prop"
                v-bind:form="scope.row"
              >
                自定义
              </slot>
              <!--              文本-->
              <span v-else :class="header.copiable ? 'copiable' : ''">{{
                scope.row[header.prop]
              }}</span>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
    <el-pagination
      v-if="!noShow && showPagination && page.totalCount > page.pageSize"
      class="pagination"
      :disabled="isLoading"
      background
      layout="total, prev, pager, next, jumper"
      :page-size="page.pageSize"
      :current-page="page.currentPage"
      @current-change="changePage($event, true)"
      prev-text="上一页"
      next-text="下一页"
      :total="page.totalCount"
    ></el-pagination>
  </div>
</template>

<script>
import TableFunction from "./tableFunction";

/**
 * 参数说明：
 * headers：列参数 (header.type: time / timeSecond / link / image )
 * data：自定义表格数据
 * api：api路径
 * params：api参数
 * deleteApi：删除api路径（根据{id:id}删除）
 * selection：多选
 * addTitle：添加标题
 * deleteTitle：删除标题
 * canAdd：显示新增
 * canEdit：显示编辑
 * canDelete：显示删除
 * canDeleteBatch：显示批量删除
 * showPagination：显示分页
 *
 */
export default {
  name: "commonTable",
  components: { TableFunction },
  props: {
    headers: { type: Array },
    data: { type: Array },
    api: { type: Function },
    deleteApi: { type: Function },
    params: { type: Object },
    loading: { type: Boolean, default: false },
    selection: { type: Boolean, default: false },
    rowKey: { type: String, default: "id" },
    addTitle: { type: String, default: "新增" },
    deleteTitle: { type: String, default: "删除" },
    deleteMessage: { type: String, default: "确定要删除吗？" },
    canAdd: { type: Boolean, default: true },
    canEdit: { type: Boolean, default: true },
    canDelete: { type: Boolean, default: true },
    canDeleteBatch: { type: Boolean, default: true },
    showPagination: { type: Boolean, default: true },
    settings: {
      type: Array,
      default() {
        return [];
      }
    },
    noShowList: {
      type: Array,
      default: () => []
    },
    selectable: {
      type: Function
    }
  },
  data() {
    return {
      noShow: false,
      isLoading: false,
      currentHeaders: [],
      tableData: [],
      selects: [],
      cacheSelects: {},
      cacheSelectState: 1, // 0：清除选择，1:默认，2：全部选择
      pageParams: {
        pageSize: 10,
        page: 1
      },
      page: {
        pageSize: 10,
        totalCount: 0,
        currentPage: 1
      }
    };
  },
  watch: {
    data(v) {
      this.tableData = v;
    }
  },
  created() {
    this.resetHeaders();
    this.loadData();
  },
  methods: {
    resetHeaders() {
      let headers = [];
      this.headers.map(h => {
        h.show = true;
        headers.push(h);
      });
      this.currentHeaders = this.arrayObjDeepCopy(headers);
      this.currentHeaders.forEach(h => {
        h.show = !this.noShowList.includes(h.prop);
      });
    },
    arrayObjDeepCopy(source) {
      var sourceCopy = source instanceof Array ? [] : {};
      for (var item in source) {
        sourceCopy[item] =
          typeof source[item] === "object"
            ? this.arrayObjDeepCopy(source[item])
            : source[item];
      }
      return sourceCopy;
    },
    loadData() {
      if (this.api) {
        if (this.isLoading) {
          setTimeout(() => {
            this.loadData();
          }, 100);
          return;
        }
        this.isLoading = true;
        this.cacheSelects[this.page.currentPage] = this.selects.map(item => {
          return item[this.rowKey];
        });
        let data = Object.assign(this.pageParams, this.params);
        this.api(data)
          .then(res => {
            if (res) {
              this.tableData = res.data || (Array.isArray(res) ? res : []);
              this.page.currentPage = res.page;
              this.page.totalCount = res.totalCount;
              this.page.pageSize = res.pageSize;
            } else {
              this.tableData = [];
            }
            this.$nextTick(() => {
              // this.setCacheSelect();
              this.$emit("loadComplete", this.tableData);
            });
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
      if (this.data && this.data.length > 0) {
        this.tableData = this.data;
      }
    },
    refresh() {
      //更新数据
      this.pageParams = {
        pageSize: this.page.pageSize || 10,
        page: this.page.currentPage || 1
      };
      this.loadData();
    },
    onQuery() {
      this.pageParams = {
        pageSize: 10,
        page: 1
      };
      this.loadData();
    },
    rowClick(v, prop) {
      this.$emit("rowClick", v, prop);
    },
    add() {
      this.$emit("add");
    },
    editRow(v) {
      this.$emit("editRow", v);
    },
    deleteRow(v) {
      this.$emit("deleteRow", v);
      if (this.deleteApi) {
        this.$confirm(this.deleteMessage)
          .then(() => {
            this.deleteApi({ id: v.id })
              .then(() => {
                this.$message.success(this.deleteTitle + "成功");
                this.loadData();
              })
              .catch(err => {
                this.$message.error(this.deleteTitle + "失败" + err);
              })
              .finally(() => {
                this.$emit("deleteComplete");
              });
          })
          .catch(() => {});
      }
    },
    deleteBatch() {
      this.$emit("deleteBatch", this.selects);
    },
    checkChange(v) {
      let checkall = [];
      this.currentHeaders.forEach(h => {
        h.show = v.includes(h.prop);
        if (h.show) {
          checkall.push(h.prop);
        }
      });
      if (checkall.length) {
        this.noShow = false;
      } else {
        this.noShow = true;
      }
    },
    cancelSelect() {
      this.$refs.multipleTable.clearSelection();
    },
    changePage(v) {
      this.pageParams.page = v;
      this.loadData();
    },
    selectAll(v) {
      this.cacheSelectState = v.length > 0;
    },
    handleSelectionChange(v) {
      this.selects = v;
    },
    setCacheSelect() {
      if (
        this.cacheSelects[this.page.currentPage] &&
        this.cacheSelects[this.page.currentPage].length
      ) {
        let rows = this.tableData.filter(item => {
          return this.cacheSelects[this.page.currentPage].includes(
            item[this.rowKey]
          );
        });
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row, true);
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.common-table {
  margin: 16px 0;
}

.pagination {
  text-align: right;
}

.table-del {
  /*color: #999 !important;*/
}

.table-header-btn {
  display: flex;
  justify-content: space-between;
}

.table-select-box {
  text-align: left;
  line-height: 40px;
  color: #3b7cef;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  border-color: #3b7cef;
  border-image: initial;
  padding: 0 20px;
  margin-top: 8px;

  span {
    cursor: pointer;
    margin-left: 24px;
    font-size: 14px;
    color: rgb(102, 102, 102);
  }

  span:hover {
    color: #3b7cef;
  }

  span.delete:hover {
    color: #fc4f52;
  }
}

.table-image {
  height: 30px;
  width: 30px;
  cursor: pointer;
}
</style>

<style lang="scss">
.table-header-search {
  margin-bottom: 8px;

  .el-form {
    position: relative;
    display: flex;
    flex-wrap: wrap;

    .el-form-item {
      float: left;
      margin-bottom: 8px;

      .el-form-item__label {
        color: #999999;
      }

      .el-form-item__content {
        padding-right: 10px;
      }
    }

    > button {
      margin-top: 7px;
      width: 68px;
      height: 28px;
      padding: 0;
    }
  }
}

.common-table {
  .el-table__empty-block {
    min-height: 200px;
  }
}
</style>
