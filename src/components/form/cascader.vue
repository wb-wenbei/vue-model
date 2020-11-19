<template>
  <el-cascader
    ref="cascader"
    class="form-cascader"
    v-model="currentValue"
    v-bind="$attrs"
    v-on="$listeners"
    :size="size"
    :options="options"
    :placeholder="placeholder"
    @change="change"
  >
  </el-cascader>
</template>

<script>
export default {
  name: "area-select",
  props: {
    value: {},
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    size: { type: String, default: "small" },
    placeholder: { type: String, default: "请选择" }
  },
  data() {
    return {
      currentValue: []
    };
  },
  watch: {
    value(v) {
      this.currentValue = v || [];
    }
  },
  created() {
    this.currentValue = this.value;
  },
  methods: {
    change() {
      this.$emit("input", this.currentValue);
    }
  }
};
</script>

<style scoped></style>
