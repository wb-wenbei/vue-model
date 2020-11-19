let password = "";
const passwordReg = /^(?=.*[a-zA-Z])(?=.*\d)[\S]{8,16}$/; //8-16位，至少包含一个字母和一个数字，不能有空格
export const accountRules = {
  userName: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur"
    }
  ],
  password: [
    {
      required: true,
      validator: (rule, value, callback) => {
        password = value;
        if (passwordReg.test(value)) {
          callback();
        } else {
          callback(
            new Error("密码需要8-16位，且至少包含字母和数字，不能有空格")
          );
        }
      },
      trigger: "blur"
    }
  ],
  checkPassword: [
    {
      required: true,
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== password) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ],
  orgId: [
    {
      required: true,
      message: "请选择",
      trigger: "blur"
    }
  ],
  roleIds: [
    {
      required: true,
      message: "请选择",
      trigger: "blur"
    }
  ]
};
