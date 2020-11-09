<template>
  <el-radio-group
    v-model="currentValue"
    v-bind="$attrs"
    v-on="$listeners"
    @change="change"
  >
    <el-radio
      v-for="item in options"
      :key="item.id"
      :label="item.id"
      :disabled="item.disabled"
    >
      <slot v-bind:data="item">{{ item.name }}</slot>
    </el-radio>
  </el-radio-group>
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
      currentValue: ""
    };
  },
  watch: {
    value(v) {
      this.currentValue = v;
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
