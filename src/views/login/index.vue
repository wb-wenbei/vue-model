<template>
  <div class="login-container">
    <el-card class="box-card">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        :hide-required-asterisk="true"
        auto-complete="on"
      >
        <h3 class="title">{{ title }}</h3>
        <el-form-item prop="userName" label="用户名">
          <el-input
            ref="username"
            v-model="loginForm.userName"
            placeholder="请输入"
            name="userName"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
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
    </el-card>
  </div>
</template>

<script>
import { setToken } from "@/utils/auth";
import { loginAPI } from "@/api/auth.js";

export default {
  name: "index",
  data() {
    return {
      title: "",
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
              setToken(res.token);
              let customersArr = [];
              for (let prop in res.customers) {
                customersArr = [...customersArr, ...res.customers[prop]];
              }
              res.customers = customersArr;
              res.saveTime = new Date().getTime();
              this.$store.commit("SET_USER_INFO", res);
              this.$store.commit("SET_CUSTOMER_ID", res.rootGroupId);
              this.$router.push("/");
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
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
}
</style>
