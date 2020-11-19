import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import { Message } from "element-ui";

Vue.use(VueRouter);

const Layout = () => import("../views/layout/layout");

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/error/403",
    name: "403",
    component: () => import("../views/error/500")
  },
  {
    path: "/error/404",
    name: "404",
    component: () => import("../views/error/500")
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
    path: "/home",
    name: "Home",
    component: Layout,
    meta: {
      title: "数据统计",
      icon: "cms",
      code: "hongqiao.dataCount",
      affix: true
    },
    children: [
      {
        path: "/home",
        name: "DataCount",
        component: () => import("../views/home/index"),
        meta: {
          title: "数据统计",
          code: "hongqiao.dataCount"
        }
      }
    ]
  },
  {
    path: "/community",
    component: Layout,
    meta: {
      title: "社区管理",
      icon: "cms",
      code: "hongqiao.community"
    },
    children: [
      {
        path: "/community",
        name: "Community",
        component: () => import("../views/community/community"),
        meta: {
          title: "社区管理",
          code: "hongqiao.community"
        }
      }
    ]
  },
  {
    path: "/strategy",
    name: "strategy",
    component: Layout,
    meta: {
      title: "策略管理",
      icon: "cms",
      code: "hongqiao.strategy"
    },
    children: [
      {
        path: "/strategy",
        name: "Strategy",
        component: () => import("../views/strategy/strategy"),
        meta: {
          title: "策略管理",
          code: "hongqiao.strategy"
        }
      }
    ]
  },
  {
    path: "/case",
    name: "case",
    component: Layout,
    meta: {
      title: "案件管理",
      icon: "cms",
      code: "hongqiao.case"
    },
    children: [
      {
        path: "/case",
        name: "Case",
        component: () => import("../views/case/case"),
        meta: {
          title: "案件管理",
          code: "hongqiao.case"
        }
      }
    ]
  },
  {
    path: "/examine",
    name: "examine",
    component: Layout,
    meta: {
      title: "考核记录",
      icon: "cms",
      code: "hongqiao.examine"
    },
    children: [
      {
        path: "/examine",
        name: "Examine",
        component: () => import("../views/examine/examine"),
        meta: {
          title: "考核记录",
          code: "hongqiao.examine"
        }
      }
    ]
  },
  {
    path: "/organize",
    component: Layout,
    meta: {
      title: "组织架构",
      icon: "cms",
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
      icon: "cms",
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
      icon: "cms",
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

const whiteList = ["/login", "/mine/revisePwd"];

router.beforeEach((to, from, next) => {
  if (whiteList.includes(to.path)) {
    next();
    return;
  }
  let permission = store.state.auth.permission;
  if (permission.length === 0) {
    next({ path: "/login" });
    return;
  }
  if (permission.length && to.meta.code && permission.includes(to.meta.code)) {
    next();
  } else {
    Message.error("您没有权限访问此页面");
    setTimeout(() => {
      router.back();
    }, 1000);
  }
});

export default router;
