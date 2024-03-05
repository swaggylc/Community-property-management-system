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
        },
      ],
    },
    {
      path:'/screen_data',
      name:'screen_data',
      component:()=>import('@/page/screen_data/ScreenData.vue')
    },
  ],
  //   滚动行为：控制滚动条的位置
  scrollBehavior() {
    return { top: 0, left: 0 };
  },
});
