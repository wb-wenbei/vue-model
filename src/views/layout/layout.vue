<template>
  <el-container class="layout-wrap">
    <el-header height="50" class="header">
      <router-link id="logo" tag="div" class="logo" to="/home">
        <span class="gray_white">太的科技内容管理系统</span>
      </router-link>
      <el-dropdown trigger="click">
        <el-button type="primary" size="medium" icon="el-icon-user-solid">
          账号
          <i class="el-icon-caret-bottom"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span style="display:block;" @click="revisePwd">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container class="layout-main">
      <app-aside />
      <el-main class="main-body">
        <el-scrollbar style="height: 100%">
          <transition name="fade" mode="out-in" appear>
            <keep-alive>
              <router-view />
            </keep-alive>
          </transition>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from "./components/AppAside";
import { logoutAPI } from "@/api/auth.js";
import { removeToken } from "@/utils/auth";

export default {
  name: "layout",
  components: { AppAside },
  data() {
    return {
      activeIndex: 0
    };
  },
  methods: {
    revisePwd() {
      this.$router.push("/mine/revisePwd");
    },
    logout() {
      logoutAPI().finally(() => {
        removeToken();
        this.$store.commit("SET_USER_INFO", {});
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style scoped lang="scss">
.layout-wrap {
  height: 100%;

  .header {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    background-color: #36445e;
    padding: 0;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    color: #ffffff;
    cursor: pointer;
    display: flex;
    justify-content: space-between;

    .logo {
      padding: 0 10px;
      font-size: 18px;
    }

    ::v-deep .el-button--primary {
      height: 50px;
      background: #36445e;
      border-color: #36445e;
    }
    ::v-deep .el-button:focus,
    .el-button:hover {
      background: #101010;
    }
  }

  .layout-main {
    height: 100%;
    padding: 50px 0 0;

    .main-body {
      background: #ddd;

      &::v-deep .el-scrollbar__wrap {
        overflow-x: hidden;
        background: white;
      }
    }
  }

  .footer {
    height: 40px;
    line-height: 40px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
