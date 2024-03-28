<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <div class="header-title">小区物业管理系统</div>
        <el-menu
          class="el-header-menu"
          mode="horizontal"
          :ellipsis="false"
          @select="handleSelect"
        >
          <div class="flex-grow" />
          <el-menu-item index="1">Processing Center</el-menu-item>
          <el-menu-item index="1">Processing Center</el-menu-item>
          <el-menu-item index="1">Processing Center</el-menu-item>
          <el-sub-menu index="2">
            <template #title>{{
              userStore.userInfo ? userStore.userInfo.username : ""
            }}</template>
            <el-menu-item index="2-1">item one</el-menu-item>
            <el-menu-item index="2-2">item two</el-menu-item>
            <el-menu-item index="2-3">item three</el-menu-item>
            <el-menu-item index="2-4" @click="logout">退出登录</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-header>
      <el-container>
        <el-aside class="aside">
          <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            default-active="1"
            text-color="#fff"
          >
            <el-menu-item index="1" @click="handleSelect('1')">
              <i class="iconfont icon-home"></i>
              <span>首页</span>
            </el-menu-item>
            <el-menu-item index="2" @click="handleSelect('2')">
              <i class="iconfont icon-shujudaping"></i>
              <span>数据大屏</span>
            </el-menu-item>
            <el-menu-item index="3" @click="handleSelect('3')">
              <i class="iconfont icon-user"></i>
              <span>用户管理</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="iconfont icon-baoxiu"></i>
              <span>保修管理</span>
            </el-menu-item>
          </el-menu>
          <div class="aside-info">
            <p>有更多问题请咨询客服</p>
            <img :src="wechat" alt="" />
          </div>
        </el-aside>
        <el-main class="main-container">
          <!-- 页面显示区 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import useUserStore from "@/store/userInfo.js";
import { useRoute, useRouter } from "vue-router";
import wechat from "@/assets/images/wechat.jpg";
import { REMOVE_TOKEN } from "@/utils/localFunction.js";

let userStore = useUserStore();
let route = useRoute();
let router = useRouter();

/**
 * @description: 点击侧边菜单的回调
 * @param {string} index 菜单索引
 * @return {}
 */
const handleSelect = (index) => {
  if (index == 1) {
    router.push({ name: "center" });
  } else if (index == 2) {
    router.push({ name: "screen_data" });
  } else if (index == 3) {
    router.push({ name: "user_manage" });
  }
};
/**
 * @description: 退出登陆的回调
 * @return {}
 */
const logout = () => {
  // 清除token
  REMOVE_TOKEN();
  // 跳转登录页
  router.push({ name: "login" });
};
</script>

<style lang="scss" scoped>
.common-layout {
  .header {
    display: flex;
    justify-content: space-between;
    .header-title {
      display: flex;
      align-items: center;
    }
    .el-header-menu {
      flex: 1;
      justify-content: end;
    }
  }
  .aside {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 200px;
    height: calc(100vh - 60px);
    background: #545c64;
    .el-menu-item {
      display: flex;
      justify-content: center;
      i {
        margin-right: 8px;
      }
    }
    .aside-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 12px;
      p {
        text-align: center;
        color: white;
        font-size: 12px;
      }
      img {
        width: 80px;
        height: 80px;
      }
    }
  }
  .main-container {
    height: calc(100vh - 60px);
  }
}
</style>
