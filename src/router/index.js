import { createRouter, createWebHistory } from "vue-router";
// 用于创建路由器实例，可以管理多个路由

export default createRouter({
  // 指定路由的模式，此处使用的是history模式
  history: createWebHistory(),
  // 管理路由
  routes: [
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
