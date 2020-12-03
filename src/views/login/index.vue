<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-logo"></div>
      <div>
        <el-form
          ref="loginForm"
          class="login-form"
          :model="loginForm"
          :rules="loginRules"
          :hide-required-asterisk="true"
          auto-complete="on"
        >
          <h2 class="title">{{ title }}</h2>
          <el-form-item prop="userName" label="用户名">
            <el-input
              ref="username"
              v-model="loginForm.userName"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>

          <el-form-item prop="password" label="密码">
            <el-input
              ref="password"
              v-model="loginForm.password"
              placeholder="请输入密码"
              @keyup.enter.native="handleLogin"
              show-password
            ></el-input>
          </el-form-item>

          <el-button
            :loading="loading"
            class="login-btn"
            type="primary"
            style="margin-bottom:30px;"
            @click.native.prevent="handleLogin"
            >登录
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { loginAPI } from "@/api/auth.js";

export default {
  name: "index",
  data() {
    return {
      title: "大数据平台",
      loginForm: {
        userName: "",
        password: ""
      },
      loginRules: {
        userName: [
          { required: true, trigger: "blur", message: "请输入用户名" }
        ],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }]
      },
      loading: false
    };
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          loginAPI(this.loginForm)
            .then(res => {
              this.$store.commit("SET_TOKEN", res.token);
              let customersArr = [];
              for (let prop in res.customers) {
                customersArr = [...customersArr, ...res.customers[prop]];
              }
              res.customers = customersArr;
              res.saveTime = new Date().getTime();
              this.$store.commit("SET_USER_INFO", res);
              this.$store.commit("SET_CUSTOMER_ID", res.rootGroupId);
              this.getPermissions();
            })
            .catch(err => {
              this.$message.error("登录失败：" + err);
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
    async getPermissions() {
      await this.$store.dispatch("setPermission");
      await this.$store.dispatch("setBaseOrgList");
      this.$router.push("/");
    }
  }
};
</script>

<style scoped lang="scss">
.login-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../../assets/login/login_bg.png") center no-repeat #b6d4fe;

  .login-box {
    background: url("../../assets/login/login_inner_bg.png") center no-repeat;
    width: 50%;
    border-radius: 45px;
    padding: 80px 30px;
    display: flex;
    & > div {
      flex: 1;
      padding: 20px 5% 20px 15%;
    }

    .login-logo {
      background: url("../../assets/login/login_logo.png") center / cover;
    }
  }

  .login-form {
    ::v-deep .el-input input {
      border: 0;
      border-bottom: 1px solid grey;
      border-radius: 0;
      padding: 0;
      background: transparent !important;
    }

    ::v-deep button {
      width: 100%;
      margin-top: 20px;
    }
  }
}
</style>
