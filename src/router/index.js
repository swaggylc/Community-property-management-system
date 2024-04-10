/*
 * @Author: Lu Can lucanlc0417@gmail.com
 * @Date: 2024-02-03 21:45:03
 * @LastEditors: Lu Can lucanlc0417@gmail.com
 * @LastEditTime: 2024-03-05 20:23:12
 * @FilePath: \2024-毕业设计\admin\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHistory } from "vue-router";
// 用于创建路由器实例，可以管理多个路由

export default createRouter({
  // 指定路由的模式，此处使用的是history模式
  history: createWebHistory(),
  // 管理路由
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("@/page/login/Login.vue"),
      meta: {
        title: "登录",
      },
    },
    {
      path: "/",
      redirect: "/center",
    },
    {
      path: "/center",
      name: "center",
      component: () => import("@/page/layout/Layout.vue"),
      redirect: "/center/home",
      children: [
        {
          path: "/center/home",
          name: "home",
          component: () => import("@/page/home/Home.vue"),
          meta: {
            title: "首页",
          },
        },
        {
          path: "/center/user_manage",
          name: "user_manage",
          component: () => import("@/page/user_manage/UserManage.vue"),
          meta: {
            title: "用户管理",
          },
        },
        {
          path: "/center/repair_manage",
          name: "repair_manage",
          component: () => import("@/page/repair_manage/RepairManage.vue"),
          meta: {
            title: "报修管理",
          },
        },
        {
          path: "/center/user_repair",
          name: "user_repair",
          component: () => import("@/page/user_repair/UserRepair.vue"),
          meta: {
            title: "用户报修",
          },
        },
        {
          path: "/center/repair_history",
          name: "repair_history",
          component: () => import("@/page/repair_history/RepairHistory.vue"),
          meta: {
            title: "我的报修",
          },
        },
        {
          path: "/center/visitor",
          name: "visitor",
          component: () => import("@/page/visitor/index.vue"),
          redirect: "/center/visitor/check",
          children: [
            {
              path: "/center/visitor/log",
              name: "visitor_log",
              component: () => import("@/page/visitor/sub/VisitorLog.vue"),
              meta: {
                title: "访客记录",
              },
            },
            {
              path: "/center/visitor/check",
              name: "visitor_check",
              component: () => import("@/page/visitor/sub/VisitorCheck.vue"),
              meta: {
                title: "访客登记",
              },
            },
          ],
        },
      ],
    },
    {
      path: "/screen_data",
      name: "screen_data",
      component: () => import("@/page/screen_data/ScreenData.vue"),
      meta: {
        title: "数据大屏",
      },
    },
  ],
  //   滚动行为：控制滚动条的位置
  scrollBehavior() {
    return { top: 0, left: 0 };
  },
});
