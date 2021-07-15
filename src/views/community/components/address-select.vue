<template>
  <div class="select-list">
    <div v-for="(item, index) in currentValue" :key="index">
      <div class="item">{{ item.province }}</div>
      <div class="item">{{ item.city }}</div>
      <div class="item">{{ item.district }}</div>
      <el-input
        class="short-width item"
        v-model="item.address"
        placeholder="示例：虹中路780弄3-20号"
      ></el-input>
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
        v-if="index === currentValue.length - 1 && limit > currentValue.length"
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
  name: "property-select",
  props: {
    value: {},
    limit: { type: Number, default: 5 }
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
      this.currentValue = this.value || [
        { province: "上海市", city: "上海市", district: "闵行区" }
      ];
    },
    addItem() {
      this.currentValue.push({
        province: "上海市",
        city: "上海市",
        district: "闵行区"
      });
    },
    deleteItem(index) {
      this.currentValue.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.item {
  display: inline-block;
  margin: 0 10px 10px 0;
}
</style>
