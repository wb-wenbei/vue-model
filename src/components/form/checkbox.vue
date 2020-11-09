<template>
  <el-checkbox-group
    class="form-checkbox"
    v-model="currentValue"
    v-bind="$attrs"
    v-on="$listeners"
    @change="change"
  >
    <el-checkbox
      v-for="item in options"
      :key="item.id"
      :label="item.id"
      :disabled="item.disabled"
    >
      <slot v-bind:data="item">{{ item.name }}</slot>
    </el-checkbox>
  </el-checkbox-group>
</template>

<script>
export default {
  name: "form-checkbox",
  props: {
    value: {},
    options: {
      type: Array,
      default() {
        return [];
      }
    }
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
    this.currentValue = this.value || [];
  },
  methods: {
    change() {
      this.$emit("input", this.currentValue);
    }
  }
};
</script>

<style lang="scss">
.form-checkbox {
  .el-checkbox {
    margin-top: 0 !important;
    &.is-disabled {
      display: inline;
    }
  }
}
</style>
