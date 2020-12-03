import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const Layout = () => import("../views/layout/layout");

const routes = [
  {
    path: "/",
    redirect: "/organize"
  },
  {
    path: "/error/403",
    name: "403",
    component: () => import("../views/error/403")
  },
  {
    path: "/error/404",
    name: "404",
    component: () => import("../views/error/404")
  },
  {
    path: "/error/500",
    name: "500",
    component: () => import("../views/error/500")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login/index")
  },
  {
    path: "/organize",
    component: Layout,
    meta: {
      title: "组织架构",
      icon: "zuzhiguanlin",
      code: "hongqiao.organize"
    },
    children: [
      {
        path: "/organize",
        name: "Organize",
        component: () => import("../views/organize/organize"),
        meta: {
          title: "组织架构",
          code: "hongqiao.organize"
        }
      }
    ]
  },
  {
    path: "/roles",
    component: Layout,
    meta: {
      title: "角色权限",
      icon: "jiaosequanxian",
      code: "hongqiao.roles"
    },
    children: [
      {
        path: "/roles",
        name: "Roles",
        component: () => import("../views/roles/roles"),
        meta: {
          title: "角色权限",
          code: "hongqiao.roles"
        }
      }
    ]
  },
  {
    path: "/account",
    component: Layout,
    meta: {
      title: "账号管理",
      icon: "zhanghaoguanli",
      code: "hongqiao.account"
    },
    children: [
      {
        path: "/account",
        name: "Account",
        component: () => import("../views/account/account"),
        meta: {
          title: "账号管理",
          code: "hongqiao.account"
        }
      }
    ]
  },
  {
    path: "/mine",
    component: Layout,
    children: [
      {
        path: "/mine/revisePwd",
        component: () => import("../views/mine/revisePwd/index"),
        meta: {
          title: "修改密码",
          code: ""
        }
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

const whiteList = [
  "/login",
  "/mine/revisePwd",
  "/visual",
  "/error/403",
  "/error/404",
  "/error/500"
];

router.beforeEach((to, from, next) => {
  if (whiteList.includes(to.path)) {
    next();
    return;
  }
  let token = store.state.auth.token;
  let permission = store.state.auth.permission;
  if (!token || permission.length === 0) {
    next({ path: "/login" });
    return;
  }
  if (permission.length && to.meta.code && permission.includes(to.meta.code)) {
    next();
  } else {
    router.push({ path: "/error/403" });
  }
});

export default router;
