import { createApp } from "vue";
import App from "./App.vue";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn"; //解决elementpLus一些组件是英文的问题

import '../reset.css'
import '@/assets/iconfont/iconfont.scss'

// 引入vue-router
import router from "@/router/index.js";
// 引入pinia仓库
import pinia from "@/store/index.js";



const app = createApp(App);
// 安装vue-router
app.use(router);
// 安装pinia
app.use(pinia);
// 引入路由鉴权文件
import '@/Authentication.js'








app.use(ElementPlus, {
  locale: zhCn,
});
app.mount("#app");
