<template>
  <div class="card">
    <div class="top-border"></div>
    <div class="title">
      <div>{{ title }}</div>
      <slot name="right-header"></slot>
    </div>
    <div class="content">
      <slot>content</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "card",
  props: {
    title: { type: String, default: "标题" }
  }
};
</script>

<style scoped lang="scss">
.card {
  background-image: linear-gradient(180deg, #004453 0%, #002129 100%);
  border-radius: 4px;
  padding: 16px;
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .top-border {
    position: absolute;
    width: 100%;
    height: 1px;
    top: 0;
    left: 0;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 20%,
      #84e2d8 50%,
      rgba(0, 0, 0, 0) 80%
    );
  }

  .title {
    height: 36px;
    line-height: 36px;
    position: relative;
    border-bottom: 1px solid #305860;
    color: white;
    text-align: left;
    display: flex;
    justify-content: space-between;

    &::before {
      content: "";
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 20px;
      height: 3px;
      background: rgba(19, 168, 168, 0.85);
    }

    &::after {
      content: "";
      position: absolute;
      bottom: -1px;
      right: 0;
      width: 3px;
      height: 3px;
      background: rgba(19, 168, 168, 0.85);
    }
  }

  .content {
    flex: 1;
    min-height: 0;
  }
}
</style>
