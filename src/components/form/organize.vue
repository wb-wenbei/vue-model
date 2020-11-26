<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 19:29:12
 * @LastEditTime: 2019-08-15 17:47:47
 * @LastEditors: Please set LastEditors
 -->
<!--组织机构选择框。传出去应是一个id。创建时候，如果有id，则应该去匹配值，没有id不管-->
<template>
  <el-select
    size="small"
    popper-class="combination-option"
    v-model="combinationName"
    :disabled="disabled"
    placeholder="请选择"
  >
    <el-option :value="value" disabled>
      <tide-combination
        :defaultChecked="[value]"
        ref="combination"
        :nodeKey="nodeKey"
        :disabledArray="disabledArray"
        @export="exportEvent"
      ></tide-combination>
    </el-option>
  </el-select>
</template>

<script>
import TideCombination from "@/components/combination/index";
export default {
  components: { TideCombination },
  props: {
    value: {},
    disabled: {
      type: Boolean,
      default: false
    },
    orgName: {
      type: String,
      default: ""
    },
    disabledArray: {
      type: Array
    }
  },
  name: "cbinationSelect",
  data() {
    return {
      combinationName: "",
      options: [],
      nodeKey: "code"
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.combinationName = this.$refs.combination.getMatchName(this.value);
      this.$emit("orgName", this.combinationName);
    });
  },
  methods: {
    exportEvent(val) {
      this.combinationName = val[0] ? val[0].name : "";
      this.$emit("orgName", this.combinationName);
      this.$emit("input", val[0] ? val[0].code : "");
    }
  },
  watch: {
    value() {
      this.combinationName = this.$refs.combination.getMatchName(this.value);
    }
  }
};
</script>

<style lang="scss">
.combination-option {
  .el-select-dropdown__item {
    height: auto;
  }
  .el-select-dropdown__wrap {
    max-height: calc(100vh - 101px - 60px);
  }
}
</style>
