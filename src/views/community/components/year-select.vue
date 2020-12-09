<template>
  <div class="select-list">
    <div v-for="(item, index) in currentValue" :key="index">
      <el-input
        class="short-width item"
        v-model="item.year"
        placeholder="请输入建成年份"
      >
        <template slot="append">年</template>
      </el-input>
      <el-button
        class="item"
        v-if="currentValue.length > 1"
        type="danger"
        icon="el-icon-close"
        circle
        @click="deleteItem(index)"
      ></el-button>
      <el-button
        class="item"
        v-if="index === currentValue.length - 1"
        type="primary"
        icon="el-icon-plus"
        circle
        @click="addItem"
      ></el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "year-select",
  props: {
    value: {}
  },
  data() {
    return {
      currentValue: []
    };
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler() {
        this.loadData();
      }
    },
    currentValue: {
      immediate: true,
      deep: true,
      handler(v) {
        this.$emit("input", v);
      }
    }
  },
  methods: {
    loadData() {
      this.currentValue = this.value || [{ year: "" }];
    },
    addItem() {
      this.currentValue.push({ year: "" });
    },
    deleteItem(index) {
      this.currentValue.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.item {
  margin: 0 10px 10px 0;
}
</style>
