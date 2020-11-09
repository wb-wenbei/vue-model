import Vue from "vue";
import VueRouter from "vue-router";
import { getToken } from "@/utils/auth";

Vue.use(VueRouter);

const Layout = () => import("../views/layout/layout");

const routes = [
  {
    path: "/",
    redirect: "/cms/article"
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
    path: "/cms",
    component: Layout,
    meta: {
      title: "内容管理",
      icon: "cms",
      code: ""
    },
    children: [
      {
        path: "/cms/article",
        component: () => import("../views/cms/article/index"),
        meta: {
          title: "新闻管理",
          code: ""
        }
      },
      {
        path: "/cms/job",
        component: () => import("../views/cms/job/index"),
        meta: {
          title: "职位管理",
          code: ""
        }
      }
    ]
  },
  {
    path: "/mine",
    component: Layout,
    meta: {
      title: "个人中心",
      icon: "mine",
      code: ""
    },
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

const whiteList = ["/login"];

router.beforeEach((to, from, next) => {
  if (getToken()) {
    next();
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next();
    } else {
      next({ path: "/login" });
    }
  }
});

export default router;
