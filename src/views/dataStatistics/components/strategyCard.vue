<template>
  <div class="strategy-card">
    <div class="title">{{ title }}</div>
    <div
      v-for="(item, index) in data"
      :key="index"
      class="item"
      :class="'item-' + (index % 3)"
    >
      <div class="name">{{ item.name }}</div>
      <div class="ratio">{{ item.ratio | percent }}</div>
      <div class="value">{{ item.value }}个</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "strategyCard",
  props: {
    title: { type: String, default: "标题" },
    data: {
      type: Array,
      default() {
        return [
          { name: "优秀", value: 10, ratio: "0.23" },
          { name: "中等", value: 10, ratio: "0.23" },
          { name: "差", value: 10, ratio: "0.23" }
        ];
      }
    }
  }
};
</script>

<style scoped lang="scss">
.strategy-card {
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 1px 1px 6px 2px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  padding: 10px;
  margin: 10px;
  text-align: left;
  font-size: 14px;
  width: 140px;
  height: 135px;

  .title {
    font-size: 16px;
    color: #595959;
    font-weight: bold;
    line-height: 32px;
  }

  .item-0 {
    color: #19b0ae;
  }

  .item-1 {
    color: #4a90e2;
  }

  .item-2 {
    color: #f6a93b;
  }

  .item {
    display: flex;
    justify-content: space-around;
    line-height: 32px;

    & > div {
      flex: 1;
    }

    .name {
      color: #595959;
    }

    .value {
      text-align: right;
    }
  }
}
</style>
