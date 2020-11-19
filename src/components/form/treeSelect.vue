<template>
  <el-select
    size="small"
    :multiple="!isRadio"
    v-bind="$attrs"
    v-on="$listeners"
    collapse-tags
    popper-class="combination-option"
    v-model="selectValue"
    :disabled="disabled"
    placeholder="请选择"
  >
    <el-option :value="0" disabled>
      <section class="combination">
        <el-input
          size="small"
          placeholder="输入名称进行搜索"
          v-model="filterText"
        ></el-input>
        <div class="combination-box">
          <el-tree
            ref="tree"
            :nodeKey="defaultProps.value"
            :data="data"
            show-checkbox
            :check-strictly="isRadio"
            @check="check"
            @check-change="checkChange"
            :filter-node-method="filterNode"
            :props="defaultProps"
          >
          </el-tree>
        </div>
      </section>
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: "TreeSelect",
  props: {
    value: {},
    data: {
      type: Array
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isRadio: { type: Boolean, default: false },
    props: { type: Object }
  },
  data() {
    return {
      selectValue: [],
      currentValue: [],
      filterText: "",
      defaultProps: {
        children: "children",
        label: "name",
        value: "id"
      }
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    value() {
      this.load();
    }
  },
  created() {
    if (this.props) {
      this.defaultProps = Object.assign(this.defaultProps, this.props);
    }
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      if (this.value) {
        this.currentValue = this.value;
        if (!Array.isArray(this.value)) {
          this.currentValue = [this.value];
        }
        this.$refs.tree.setCheckedKeys(this.currentValue);

        this.selectValue = [];
        if (this.$refs.tree.getCheckedNodes().length > 0) {
          let arr = this.$refs.tree.getCheckedNodes();
          if (arr && arr.length > 0) {
            arr.forEach(v => {
              this.selectValue.push(v[this.defaultProps.label]);
            });
          }
        }
        this.selectValue = this.isRadio
          ? this.selectValue[0]
          : this.selectValue;
      } else {
        this.selectValue = this.isRadio ? "" : [];
        this.$refs.tree.setCheckedKeys([]);
      }
    },
    filterNode(value, data, node) {
      if (!value) return true;
      if (data[this.defaultProps.label].indexOf(value) !== -1) {
        node.expanded = false;
      }
      return data[this.defaultProps.label].indexOf(value) !== -1;
    },
    check(v, state) {
      if (this.isRadio) {
        if (state.checkedKeys.length) {
          this.$emit("input", v[this.defaultProps.value]);
          this.selectValue = v[this.defaultProps.label];
          this.$refs.tree.setCheckedKeys([v[this.defaultProps.value]]);
        } else {
          this.$emit("input", "");
          this.selectValue = "";
          this.$refs.tree.setCheckedKeys([]);
        }
      }
    },
    checkChange() {
      if (!this.isRadio) {
        this.$emit("input", this.$refs.tree.getCheckedKeys());
        this.selectValue = [];
        let arr = this.$refs.tree.getCheckedNodes();
        if (arr && arr.length > 0) {
          arr.forEach(v => {
            this.selectValue.push(v[this.defaultProps.label]);
          });
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.combination-option {
  .el-select-dropdown__item {
    height: auto;
  }

  .el-select-dropdown__wrap {
    max-height: calc(100vh - 101px - 60px);
  }
}

.combination {
  min-width: 300px;

  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background: #13a8a8;
    border-color: #13a8a8;
  }

  .el-input.is-active .el-input__inner,
  .el-input__inner:focus {
    border-color: #13a8a8;
  }

  .el-checkbox__inner:hover {
    border-color: #13a8a8;
  }

  .combination-box {
    border: 1px solid #eeeeee;
    overflow: hidden;
    overflow-y: auto;
    margin: 12px 0;
  }

  .el-tree-node__content {
    height: 40px;
    position: relative;

    &::after {
      content: "";
      display: block;
      width: 100%;
      height: 1px;
      background: #eeeeee;
      position: absolute;
      bottom: 0;
    }

    .el-tree-node__label {
      display: inline-block;
      width: calc(100% - 46px);
      line-height: 40px;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: normal !important;
    }
  }
}
</style>
