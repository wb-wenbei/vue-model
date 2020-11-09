<template>
  <div class="form-table-transfer">
    <div class="transfer-box left">
      <div class="transfer-title">{{ leftTitle }}</div>
      <div class="search-box">
        <el-input v-model="search.name" size="small" placeholder="请输入内容">
          <i class="el-icon-search el-input__icon" slot="suffix"></i>
        </el-input>
      </div>
      <el-table
        ref="multipleTable"
        :data="allData"
        v-loading="loading"
        style="width: 100%"
        max-height="400px"
        :row-class-name="allRowClassName"
        @select="selectionChange"
        @select-all="selectionChange"
      >
        <el-table-column type="selection" v-if="!disabled" width="55">
        </el-table-column>
        <el-table-column
          v-for="(header, index) in headers"
          :key="header.prop + '-' + index"
          :prop="header.prop"
          :label="header.label"
          show-overflow-tooltip
          :width="header.width"
        >
        </el-table-column>
      </el-table>
    </div>
    <div class="transfer-box right">
      <div class="transfer-title">{{ rightTitle }}</div>
      <div class="search-box">
        <el-input
          v-model="search.selectName"
          size="small"
          placeholder="请输入内容"
        >
          <i class="el-icon-search el-input__icon" slot="suffix"></i>
        </el-input>
      </div>
      <el-table
        :data="selectData"
        v-loading="loading"
        style="width: 100%"
        max-height="400px"
        :row-class-name="selectRowClassName"
      >
        <el-table-column
          v-for="(header, index) in headers"
          :key="header.prop + '-' + index"
          :prop="header.prop"
          :label="header.label"
          show-overflow-tooltip
          :width="header.width"
        >
        </el-table-column>
        <el-table-column label="移除" width="50">
          <template slot-scope="scope">
            <el-button
              type="text"
              :disabled="disabled"
              icon="el-icon-minus"
              @click="delRow(scope.row)"
            >
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "form-select",
  props: {
    value: {},
    data: { type: Array },
    headers: { type: Array },
    disabled: { type: Boolean, default: false },
    leftTitle: { type: String, default: "请选择：" },
    rightTitle: { type: String, default: "已选择：" },
    limit: { type: Number },
    loading: { type: Boolean, default: false }
  },
  data() {
    return {
      currentValue: [],
      search: {
        name: "",
        selectName: ""
      },
      allData: [],
      filterAllData: [],
      selectData: [],
      filterSelectData: []
    };
  },
  watch: {
    value() {
      this.currentValue = this.value;
    },
    data: {
      deep: true,
      handler() {
        this.allData = this.data;
        this.loadData();
        this.$nextTick(() => {
          this.loadSelect();
        });
      }
    },
    currentValue: {
      deep: true,
      handler() {
        this.loadData();
        this.$emit("input", this.currentValue);
      }
    },
    "search.name"() {
      this.allFilterTableData();
    },
    "search.selectName"() {
      this.selectFilterTableData();
    }
  },
  created() {
    this.currentValue = this.value;
    this.allData = this.data;
    this.loadData();
  },
  mounted() {
    this.loadSelect();
  },
  methods: {
    loadData() {
      if (this.allData && this.allData.length) {
        this.selectData = [];
        this.allData.forEach(v => {
          if (this.currentValue && this.currentValue.indexOf(v.id) > -1) {
            this.selectData.push(v);
          }
        });
      }
    },
    loadSelect() {
      this.$refs.multipleTable.clearSelection();
      this.allData.forEach(v => {
        if (this.currentValue && this.currentValue.indexOf(v.id) > -1) {
          this.$refs.multipleTable.toggleRowSelection(v);
        }
      });
    },
    delRow(row) {
      if (this.currentValue && this.currentValue.length) {
        this.currentValue.forEach((v, index) => {
          if (v === row.id) {
            this.currentValue.splice(index, 1);
            return;
          }
        });
        this.loadSelect();
      }
    },
    selectionChange(val) {
      let value = [];
      if (val && val.length) {
        val.forEach(v => {
          value.push(v.id);
        });
      }
      if (this.limit && value.length > this.limit) {
        this.$message.error("最多可选择" + this.limit + "项！");
        this.loadSelect();
      } else {
        this.currentValue = value;
      }
    },
    allRowClassName(v) {
      return "all-row-show-" + v.row.id;
    },
    selectRowClassName(v) {
      return "select-row-show-" + v.row.id;
    },
    allFilterTableData() {
      this.allData.forEach(v => {
        let rowDom = document.getElementsByClassName("all-row-show-" + v.id)[0];
        if (v.name.indexOf(this.search.name) > -1) {
          rowDom.style.display = "block";
        } else {
          rowDom.style.display = "none";
        }
      });
    },
    selectFilterTableData() {
      this.selectData.forEach(v => {
        let rowDom = document.getElementsByClassName(
          "select-row-show-" + v.id
        )[0];
        if (v.name.indexOf(this.search.selectName) > -1) {
          rowDom.style.display = "block";
        } else {
          rowDom.style.display = "none";
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.form-table-transfer {
  display: flex;
  justify-content: space-around;

  .transfer-box {
    flex: 1;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid rgb(238, 238, 238);
    border-radius: 3px;
    min-width: 280px;

    &.left {
      margin-right: 10px;
    }

    &.right {
      margin-left: 10px;
    }

    .transfer-title {
      padding-bottom: 10px;
      line-height: 20px;
    }

    .search-box {
      padding-bottom: 10px;
    }
  }
}
</style>
