<template>
  <el-select
    ref="select"
    class="form-select"
    v-model="currentValue"
    v-bind="$attrs"
    v-on="$listeners"
    :size="size"
    :clearable="clearable"
    :multiple="multiple"
    :filterable="filterable"
    :collapse-tags="collapseTags"
    :placeholder="placeholder"
    @change="change"
  >
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    >
      <slot v-bind:data="item">
        <span>{{ item.name }}</span>
      </slot>
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: "form-select",
  props: {
    value: {},
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    size: { type: String, default: "small" },
    clearable: { type: Boolean, default: true },
    filterable: { type: Boolean, default: true },
    collapseTags: { type: Boolean, default: true },
    multiple: { type: Boolean, default: false },
    placeholder: { type: String, default: "请选择" }
  },
  data() {
    return {
      currentValue: null
    };
  },
  watch: {
    value(v) {
      this.getCurrentValue(v);
    }
  },
  created() {
    this.getCurrentValue(this.value);
  },
  methods: {
    getCurrentValue(v) {
      if (this.multiple && !Array.isArray(v)) {
        if (v || v === 0) {
          this.currentValue = [v];
        } else {
          this.currentValue = [];
        }
      } else {
        this.currentValue = v;
      }
    },
    change() {
      this.$emit("input", this.currentValue);
    }
  }
};
</script>

<style lang="scss">
.form-select {
  .el-select__tags {
    overflow: hidden;
  }
}
</style>
