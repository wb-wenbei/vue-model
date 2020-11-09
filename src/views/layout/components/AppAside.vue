<template>
  <el-aside width="200px">
    <el-menu
      v-if="menus.length"
      :default-active="active"
      class="aside-menu"
      :default-openeds="['1', '3']"
    >
      <el-submenu
        v-for="(menu, index) in menus"
        :key="index"
        :index="menu.path"
      >
        <template slot="title">
          <i class="el-icon-message"></i>
          {{ menu.meta.title }}
        </template>
        <template v-if="menu.children && menu.children.length">
          <router-link
            v-for="item in menu.children"
            :key="item.path"
            :to="item.path"
          >
            <el-menu-item :index="item.path">
              {{ item.meta.title }}
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: "app-aside",
  data() {
    return {
      active: "",
      menus: []
    };
  },
  created() {
    console.log(this.$route.path);
    this.active = this.$route.path;
    let routes = this.$router.options.routes;
    let menus = [];
    routes.forEach(route => {
      if (route.meta) {
        menus.push(route);
      }
    });
    this.menus = menus;
    console.log(menus);
  }
};
</script>

<style scoped lang="scss">
.aside-menu {
  text-align: left;
}
</style>
