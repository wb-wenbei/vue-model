<template>
  <section class="revise-pwd">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="revise-ruleForm"
    >
      <el-form-item label="新密码" prop="password">
        <el-input
          v-model="ruleForm.password"
          placeholder="请输入新密码"
          type="password"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="repPassword">
        <el-input
          v-model="ruleForm.repPassword"
          placeholder="请再次输入新密码"
          type="password"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
          :loading="isLoading"
          >{{ isLoading ? "提交中" : "提交" }}</el-button
        >
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import { updatePwdAPI, getUserInfoAPI } from "@/api/auth";

const passwordReg = /^(?=.*[a-zA-Z])(?=.*\d)[\S]{8,16}$/; //8-16位，至少包含一个字母和一个数字，不能有空格

export default {
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: "",
        repPassword: ""
      },
      isLoading: false,
      rules: {
        password: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (passwordReg.test(value)) {
                callback();
              } else {
                callback(
                  new Error(
                    "新密码需要8-16位，且至少包含字母和数字，不能有空格"
                  )
                );
              }
            },
            trigger: "blur"
          }
        ],
        repPassword: [
          { required: true, message: "请再次输入新密码", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" }
        ]
      },
      id: null
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      getUserInfoAPI().then(res => {
        this.id = res.id;
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            id: this.id,
            password: this.ruleForm.password
          };
          this.isLoading = true;
          updatePwdAPI({ data })
            .then(() => {
              this.isLoading = false;
              this.$message({
                message: "修改成功",
                type: "success"
              });
              setTimeout(() => {
                localStorage.removeItem("total-token");
                this.$router.push("/login");
              }, 2000);
            })
            .catch(e => {
              this.isLoading = false;
              this.$message.error("修改失败：" + e);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.revise-pwd {
  padding: 80px;
  display: flex;
  justify-content: center;

  .revise-ruleForm {
    width: 460px;
  }
}
</style>
