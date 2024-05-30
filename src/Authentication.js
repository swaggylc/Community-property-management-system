// 路由鉴权：判断路由是否可以访问的设置
import router from "./router/index.js";
// 引入进度条插件
//@ts-ignore
import NProgress from "nprogress";
// 引入进度条样式
import "nprogress/nprogress.css";
import { isWhiteRoute } from "./utils/utils.js";
// 引入仓库
import pinia from "./store/index.js";
// 引入用户仓库
import useUserStore from "@/store/userInfo.js";
let userStore = useUserStore(pinia);
// 引入本地存储方法
// import { REMOVE_SOME } from "@/utils/localFunction.js";

// 设置进度条配置
NProgress.configure({ showSpinner: false });

// 路由白名单
const whiteList = ["/login", "/register", "/404", "/401"];

// 添加路由守卫
// 全局前置守卫
/**
 * @description: 全局前置守卫
 * @param {to} 跳转的路由信息
 * @param {from} 跳转前的路由信息
 * @param {next} 跳转到下一个路由的方法，放行函数
 * @return {void}
 */
router.beforeEach(async (to, from, next) => {
  document.title = "xx小区物业管理系统-" + to.meta.title;
  // 访问路由前触发
  // 开启进度条
  NProgress.start();
  // 判断仓库中是否有token，判断用户是否登录
  let token = userStore.userInfo;
  // 取出账号的type
  let type = userStore.userInfo.type;
  // 已登录
  if (token) {
    // 判断是否需要管理员身份
    if (to.meta.requireManager) {
      if (type == 1) {
        next();
      } else {
        next({
          name: "home",
        });
      }
    } else {
      next();
    }
  } else {
    // 未登录
    //   判断跳转的路由是否在白名单中
    if (isWhiteRoute(whiteList, to.path)) {
      // 在白名单中，直接放行
      next();
    } else {
      // 跳转到登录页面
      next({
        name: "login",
        query: {
          redirect: to.path,
        },
      });
    }
  }
});

// 全局后置钩子
router.afterEach((to, from) => {
  // 访问路由后触发
  // 关闭进度条
  NProgress.done();
});

// 用户未登录，只能访问登录页面，访问其他页面重定向到登录页面
// 用户已登录，可以访问所有页面，但是不能访问登录页面，访问登录页面重定向到首页
