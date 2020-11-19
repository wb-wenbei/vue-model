<!-- 多选组 -->
<template>
  <div class="select-group">
    <div
      class="select-group-item"
      v-for="menuItem in menuOptions"
      :key="menuItem.code"
    >
      <el-checkbox
        :indeterminate="menuItem.isIndeterminate"
        v-model="menuItem.check"
        @change="handleCheckAllChange($event, menuItem)"
        >{{ menuItem.name }}</el-checkbox
      >
      <el-checkbox-group
        v-if="menuItem.sonMenus && menuItem.sonMenus.length"
        v-model="menuItem.checkArr"
        @change="handleCheckedSingleChange($event, menuItem)"
      >
        <el-checkbox
          v-for="sonMenu in menuItem.sonMenus"
          :label="sonMenu"
          :key="sonMenu.id"
          >{{ sonMenu.name }}</el-checkbox
        >
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
import { getSetMenu, getSubmitMenu } from "../config/resloveMenu";

export default {
  props: {
    // 原始的菜单
    menuOptionsOrg: {
      type: Array,
      default: () => []
    },
    //用于匹配已选项目的菜单
    mactchMenus: {
      type: Array,
      default: () => []
    },
    // 用于双向绑定
    value: {
      type: Array,
      default: () => []
    }
  },
  model: {
    prop: "value",
    event: "exportEvent"
  },
  created() {
    // 获取设置的菜单
    this.menuOptions = getSetMenu(this.menuOptionsOrg, this.mactchMenus);
  },
  data() {
    return {
      menuOptions: []
    };
  },
  mounted() {
    this.$nextTick(this.export);
  },
  methods: {
    handleCheckAllChange(value, menuItem) {
      menuItem.checkArr = value ? menuItem.sonMenus.map(item => item) : [];
      menuItem.isIndeterminate = false;
      this.export();
    },
    handleCheckedSingleChange(value, menuItem) {
      let checkedCount = value.length;
      menuItem.check = checkedCount === menuItem.sonMenus.length;
      menuItem.isIndeterminate =
        checkedCount > 0 && checkedCount < menuItem.sonMenus.length;
      this.export();
    },
    export() {
      this.$emit("exportEvent", getSubmitMenu(this.menuOptions));
    }
  }
};
</script>

<style lang="scss" scoped>
.select-group {
  .el-checkbox-group {
    > label {
      margin-left: 30px;
    }
  }
}
</style>
