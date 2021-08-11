<template>
  <div class="count-card">
    <div class="card-title">{{ title }}</div>
    <div class="card-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "countCard",
  props: {
    title: {
      type: String,
      default: "标题"
    }
  }
};
</script>

<style scoped lang="scss">
@import "src/styles/theme";
.count-card {
  border: 1px solid #d8d8d8;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 5px 10px;
  height: 100%;

  .card-title {
    font-weight: bold;
    color: #262626;
    font-size: 16px;
    position: relative;
    text-align: left;
    padding-bottom: 5px;
    margin-bottom: 5px;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      width: 20px;
      background: $--color-primary;
    }
  }

  .card-content {
    height: calc(100% - 36px);
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
