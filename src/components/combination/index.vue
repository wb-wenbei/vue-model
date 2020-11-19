<!--组织机构-->
<template>
  <section class="combination">
    <el-input
      size="small"
      placeholder="输入名称进行搜索"
      v-model="filterText"
    ></el-input>
    <div class="combination-box" :style="{ maxHeight: maxHeight }">
      <el-tree
        class="filter-combination"
        :data="baseOrgs"
        :props="defaultProps"
        :show-checkbox="showCheckbox"
        :default-expand-all="expandAll"
        :node-key="nodeKey"
        :check-on-click-node="true"
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
        :default-checked-keys="
          isRadio ? defaultChecked : $store.state.combinationIds
        "
        @check="check"
        :check-strictly="isRadio"
        ref="combination"
      ></el-tree>
    </div>
    <div class="butoon-box" v-if="!isRadio">
      <el-button type="text" @click="confirm">确定</el-button>
      <el-button class="cancel" type="text" @click="cancle">取消</el-button>
    </div>
  </section>
</template>

<script>
import { flatData } from "./utils.js";

export default {
  name: "tide-combination",
  props: {
    maxHeight: {
      type: String,
      default: "calc(100vh - 304px)"
    },
    isRadio: {
      type: Boolean,
      default: true
    },
    options: {},
    //双向绑定的值
    modelselectArr: {
      type: Array,
      default: () => []
    },
    defaultChecked: {
      type: Array,
      default: () => []
    },
    showCheckbox: {
      type: Boolean,
      default: true
    },
    expandAll: {
      type: Boolean,
      default: false
    },
    children: {
      type: String,
      default: "children"
    },
    nodeKey: {
      type: String,
      default: "code"
    },
    treeType: {
      type: String
    },
    disabledArray: {
      type: Array
    }
  },
  model: {
    prop: "modelselectArr",
    event: "export"
  },
  created() {
    if (this.options) {
      this.baseOrgs = this.options;
    } else {
      if (this.$store.state.baseOrgList) {
        this.baseOrgs = this.$store.state.baseOrgList;
      } else {
        this.$store.dispatch("setBaseOrgList");
      }
    }
  },
  data() {
    return {
      filterText: "",
      defaultProps: {
        children: this.children,
        label: "name"
      },
      selectArr: [],
      baseOrgs: null
    };
  },
  methods: {
    filterNode(value, data, node) {
      if (!value) return true;
      if (data.name.indexOf(value) !== -1) {
        node.expanded = false;
      }
      return data.name.indexOf(value) !== -1;
    },
    // 共两个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、树目前的选中状态对象，包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性.
    // 大致逻辑:单选时候，selectArr只放入选择的节点或者清空。多选时候，将选择的全部返回
    check(data, selects) {
      let nodeKey = this.nodeKey;
      if (!this.isRadio) {
        this.selectArr = selects.checkedNodes.map(item => ({
          [nodeKey]: item[nodeKey],
          pId: item.pId,
          name: item.name,
          disabled: item.disabled,
          type: item.type || null
        }));
        this.$emit("exportKeys", selects.checkedKeys);
        this.$emit("export", this.selectArr);
      } else {
        // 单选且显示单选框时候才清空
        if (this.showCheckbox) {
          this.$refs.combination.setCheckedNodes([]);
          this.selectArr = [];
        }
        if (selects.checkedKeys.includes(data[nodeKey])) {
          if (this.treeType == "car") {
            this.$refs.combination.setCheckedKeys([data.nodeKey]);
            this.selectArr[0] = {
              nodeKey: data.nodeKey,
              data: data.data,
              name: data.name,
              pId: data.pId || null,
              type: data.type || null
            };
          } else {
            console.log(nodeKey);
            this.selectArr[0] = {
              [nodeKey]: data[nodeKey],
              pId: data.pId || null,
              name: data.name,
              type: data.type || null
            };
            this.$refs.combination.setCheckedNodes([data]);
          }
        }
        console.log(this.selectArr);
        this.$emit("export", this.selectArr);
      }
    },
    // 确定。提交信息。此处应有一个接口.提交成功后应存在store里面。刷新后勾选的还要勾选起来
    confirm() {
      let ids = [];
      this.selectArr.map(item => {
        if (!item.disabled) {
          ids.push(item[this.nodeKey]);
        }
      });
      this.$store.commit("updateCombinationIds", ids);
      setTimeout(() => {
        location.reload();
      }, 200);
    },
    // 取消，selectArr选中的id初始化。隐藏弹窗层
    cancle() {
      document.querySelector(".taide").click();
    },
    // 往外暴露一个根据id匹配名字的方法
    getMatchName(code) {
      if (code) {
        let newArray = flatData(this.baseOrgs);
        let result = "";
        newArray.forEach(item => {
          if (code === item[this.nodeKey]) {
            result = item.name;
            return;
          }
        });
        return result;
      } else {
        return "";
      }
    },
    resetChecked() {
      this.$refs.combination.setCheckedNodes([]);
    },
    updateOrgs(orgs) {
      orgs.forEach(org => {
        if (this.disabledArray.indexOf(org.code) > -1) {
          org.disabled = true;
        }
        if (org.children) {
          this.updateOrgs(org.children);
        }
      });
    }
  },
  watch: {
    options: {
      deep: true,
      handler(v) {
        this.baseOrgs = v;
      }
    },
    filterText(val) {
      this.$refs.combination.filter(val);
    },
    defaultChecked() {
      if (!this.showCheckbox) {
        this.$refs.combination.setCheckedNodes([]);
      }
    }
  }
};
</script>

<style lang="scss">
.combination {
  min-width: 300px;

  .combination-box {
    // max-height: calc(100vh - 175px);
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

  .butoon-box {
    text-align: center;

    .cancel {
      color: #999999 !important;
    }
  }
}
</style>
