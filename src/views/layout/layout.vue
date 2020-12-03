<template>
  <el-container class="layout-wrap">
    <el-header height="50" class="header">
      <router-link id="logo" tag="div" class="logo" to="/home">
        <span class="gray_white">虹桥镇智慧社区评价系统</span>
      </router-link>
      <div>
        <div class="el-dropdown">
          <el-button
            type="primary"
            size="medium"
            icon="el-icon-s-platform"
            @click="toVisual"
          >
            大屏
          </el-button>
        </div>
        <el-dropdown trigger="click">
          <el-button type="primary" size="medium" icon="el-icon-user-solid">
            {{ userName }}
            <i class="el-icon-caret-bottom"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <span style="display:block;" @click="revisePwd">修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container class="layout-main">
      <app-aside />
      <el-main class="main-body">
        <tags-view />
        <el-scrollbar style="height: calc(100% - 50px)">
          <transition name="fade" mode="out-in" appear>
            <keep-alive :include="cachedViews">
              <router-view />
            </keep-alive>
          </transition>
        </el-scrollbar>
        <div class="footer">
          <div class="footer-logo"></div>
          <div class="footer-copy">
            Copyright @ 2020 TideCloud 沪ICP备16024988号-1
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from "./components/AppAside";
import TagsView from "./components/TagsView";
import { logoutAPI } from "@/api/auth.js";

export default {
  name: "layout",
  components: { AppAside, TagsView },
  data() {
    return {
      activeIndex: 0
    };
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    userName() {
      return this.$store.state.userInfo.userName;
    }
  },
  methods: {
    revisePwd() {
      this.$router.push("/mine/revisePwd");
    },
    logout() {
      logoutAPI().finally(() => {
        this.$store.commit("SET_USER_INFO", {});
        this.$store.commit("SET_USER_INFO", {});
        this.$store.commit("SET_BASE_ORG_LIST", []);
        this.$store.commit("REMOVE_PERMISSION");
        this.$store.commit("REMOVE_TOKEN");
        this.$store.dispatch("tagsView/delAllVisitedViews");
        this.$router.push("/login");
      });
    },
    toVisual() {
      window.open(`/visual`);
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
    padding: 0;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    color: #ffffff;
    background: #3b7cef;
    cursor: pointer;
    display: flex;
    justify-content: space-between;

    .logo {
      padding: 0 10px;
      font-size: 18px;
      font-weight: bold;
    }

    ::v-deep .el-dropdown {
      overflow: hidden;
    }

    ::v-deep .el-button--primary {
      height: 50px;
      background: #3b7cef;
      border-color: transparent;
      border-radius: 0;
    }

    ::v-deep .el-button:focus,
    .el-button:hover {
      background: #326acd;
    }
  }

  .layout-main {
    height: 100%;
    padding: 50px 0 0;

    .main-body {
      background: #eee;
      padding-bottom: 56px;
      position: relative;

      &::v-deep .el-scrollbar__wrap {
        overflow-x: hidden;
        background: white;
      }

      .footer {
        height: 56px;
        position: absolute;
        width: calc(100% - 40px);
        bottom: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        .footer-logo {
          height: 30px;
          margin: 4px 0 2px;
          width: 290px;
          background: url("../../assets/footer/footer_logo.png") center /
            contain;
        }
        .footer-copy {
          line-height: 20px;
          font-size: 12px;
          color: rgba(0, 0, 0, 0.45);
        }
      }
    }
  }
}
</style>
