<template>
  <div class="form-transfer">
    <div class="transfer-box left">
      <div class="transfer-title">{{ leftTitle }}</div>
      <div class="search-box">
        <el-input v-model="search.name" size="small" placeholder="请输入内容">
          <i class="el-icon-search el-input__icon" slot="suffix"></i>
        </el-input>
      </div>
      <el-tree
        ref="select-tree"
        v-loading="loading"
        :data="allData"
        show-checkbox
        :node-key="defaultProps.key"
        :props="defaultProps"
        :filter-node-method="filterNode"
        :default-expanded-keys="checkedKeys"
        :default-checked-keys="checkedKeys"
        @check-change="checkChange"
      >
      </el-tree>
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
      <div class="select-list">
        <template v-for="item in selectData">
          <div
            :key="item[defaultProps.key]"
            v-show="
              item[defaultProps.label].indexOf(search.selectName) > -1 ||
                search.selectName === ''
            "
            class="select-item"
          >
            <div class="text">{{ item[defaultProps.label] }}</div>
            <div class="btn">
              <el-button
                type="text"
                icon="el-icon-close"
                @click="delRow(item)"
              ></el-button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "form-select",
  props: {
    value: {},
    data: { type: Array },
    leftTitle: { type: String, default: "请选择：" },
    rightTitle: { type: String, default: "已选择：" },
    loading: { type: Boolean, default: false },
    defaultProps: {
      type: Object,
      default() {
        return {
          children: "children",
          label: "name",
          key: "id",
          selectKey: "type" //数据中selectKey为true的才可以选择
        };
      }
    }
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
      filterSelectData: [],
      checkedKeys: []
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
      }
    },
    currentValue: {
      deep: true,
      handler() {
        this.loadData();
        this.$emit("input", this.currentValue);
      }
    },
    "search.name"(val) {
      this.$refs["select-tree"].filter(val);
    }
  },
  created() {
    this.currentValue = this.value;
    this.allData = this.data;
    this.loadData();
  },

  methods: {
    loadData() {
      this.selectData = this.checkTreeList(this.allData, this.currentValue);
      this.checkedKeys = this.selectData.map(v => {
        return v.id;
      });
      if (this.$refs["select-tree"]) {
        this.$refs["select-tree"].setCheckedKeys(this.checkedKeys);
      }
    },
    checkTreeList(list, value) {
      if (!list || !list.length) {
        return [];
      }
      let result = [];
      list.forEach(v => {
        if (value && value.indexOf(v[this.defaultProps.key]) > -1) {
          if (this.defaultProps.selectKey) {
            if (v[this.defaultProps.selectKey]) {
              result.push(v);
            }
          } else {
            result.push(v);
          }
        }
        if (v[this.defaultProps.children]) {
          result = [
            ...result,
            ...this.checkTreeList(v[this.defaultProps.children], value)
          ];
        }
      });
      return result;
    },
    delRow(row) {
      if (this.currentValue && this.currentValue.length) {
        this.currentValue.forEach((v, index) => {
          if (v === row.id) {
            this.currentValue.splice(index, 1);
            return;
          }
        });
      }
    },
    checkChange() {
      let values = this.$refs["select-tree"].getCheckedKeys();
      this.currentValue = values.filter(v => {
        return v != null;
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data[this.defaultProps.label].indexOf(value) !== -1;
    }
  }
};
</script>

<style scoped lang="scss">
.form-transfer {
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

    .select-item {
      height: 26px;
      font-size: 14px;
      padding: 0 10px;
      color: grey;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .btn {
        button {
          font-size: 18px;
        }
        display: none;
      }
    }
    .select-item:hover {
      background: rgba(59, 124, 239, 0.1);
      .btn {
        display: block;
      }
    }
  }
}
</style>
