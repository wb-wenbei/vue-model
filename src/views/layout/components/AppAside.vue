<template>
  <el-aside
    class="aside-animate"
    style="overflow-x: hidden"
    :width="isCollapse ? '64px' : '200px'"
  >
    <div class="menu-controller">
      <div class="menu-animate" v-show="!isCollapse">平台导航</div>
      <svg-icon
        class="menu-icon"
        :icon-class="isCollapse ? 'menu-open' : 'menu-close'"
        @click="isCollapse = !isCollapse"
      />
    </div>
    <el-menu
      v-if="menus.length"
      :default-active="active"
      class="aside-menu"
      :collapse="isCollapse"
      :default-openeds="['1', '3']"
    >
      <template v-for="menu in menus">
        <router-link
          v-if="!menu.children || menu.children.length < 2"
          :key="menu.path"
          :to="menu.children ? menu.children[0].path : menu.path"
        >
          <el-menu-item :index="menu.path">
            <svg-icon class="menu-icon" :icon-class="menu.meta.icon" />
            <span slot="title">{{ menu.meta.title }}</span>
          </el-menu-item>
        </router-link>

        <el-submenu v-else :key="menu.path" :index="menu.path">
          <template slot="title">
            <svg-icon class="menu-icon" :icon-class="menu.meta.icon" />
            <span slot="title">{{ menu.meta.title }}</span>
          </template>
          <router-link
            v-for="child in menu.children"
            :key="child.meta.path"
            :to="child.path"
          >
            <el-menu-item :index="child.path">
              <span slot="title">{{ child.meta.title }}</span>
            </el-menu-item>
          </router-link>
        </el-submenu>
      </template>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: "app-aside",
  data() {
    return {
      isCollapse: false,
      active: "",
      menus: []
    };
  },
  computed: {
    permissions() {
      return this.$store.state.auth.permission;
    }
  },
  watch: {
    permissions: {
      immediate: true,
      handler() {
        this.getMenus();
      }
    },
    "$route.path"(path) {
      this.active = path;
    }
  },
  methods: {
    getMenus() {
      this.active = this.$route.path;
      let routes = this.$router.options.routes;
      let menus = [];

      routes.forEach(route => {
        if (route.meta && this.permissions.includes(route.meta.code)) {
          menus.push(route);
        }
      });
      this.menus = menus;
    }
  }
};
</script>

<style scoped lang="scss">
.aside-animate {
  transition: width 0.5s;
}

.menu-controller {
  height: 40px;
  line-height: 40px;
  min-width: 64px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;

  .menu-icon {
    font-size: 18px;
    position: relative;
    top: 10px;
    cursor: pointer;
  }
}

.aside-menu {
  text-align: left;
  border-right: 0;

  ::v-deep &:not(.el-menu--collapse) {
    width: 200px;
  }

  .menu-icon {
    font-size: 18px;
    position: relative;
    top: 1px;
    margin-right: 5px;
  }
}
</style>
