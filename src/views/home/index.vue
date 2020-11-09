<template>
  <div>
    <h1>homePage</h1>
    <div style="height:1000px"></div>
  </div>
</template>

<script>
export default {
  name: "index",
  created() {
    let token = this.$store.state.auth.token;
    console.log("token", token);
  }
};
</script>

<style scoped></style>
