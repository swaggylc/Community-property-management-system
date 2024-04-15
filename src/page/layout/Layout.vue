<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <div class="header-title">小区物业管理系统</div>
        <el-menu class="el-header-menu" mode="horizontal" :ellipsis="false">
          <div class="flex-grow" />
          <el-menu-item index="1">Processing Center</el-menu-item>
          <el-sub-menu index="2">
            <template #title>{{
              userStore.userInfo ? userStore.userInfo.username : ""
            }}</template>
            <el-menu-item index="2-1">账号设置</el-menu-item>
            <el-menu-item index="2-2" @click="logout">退出登录</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-header>
      <el-container>
        <el-aside class="aside">
          <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            :default-active="defaultActive"
            text-color="#fff"
          >
            <el-menu-item index="home" @click="handleSelect('home')">
              <i class="iconfont icon-home"></i>
              <span>首页</span>
            </el-menu-item>
            <el-menu-item
              index="screen_data"
              @click="handleSelect('screen_data')"
            >
              <i class="iconfont icon-shujudaping"></i>
              <span>数据大屏</span>
            </el-menu-item>
            <el-menu-item
              v-if="userStore.userInfo.type == 1"
              index="user_manage"
              @click="handleSelect('user_manage')"
            >
              <i class="iconfont icon-user"></i>
              <span>用户管理</span>
            </el-menu-item>
            <el-menu-item
              v-if="userStore.userInfo.type == 1"
              index="repair_manage"
              @click="handleSelect('repair_manage')"
            >
              <i class="iconfont icon-baoxiu"></i>
              <span>报修管理</span>
            </el-menu-item>
            <el-menu-item
              v-if="userStore.userInfo.type == 0"
              index="user_repair"
              @click="handleSelect('user_repair')"
            >
              <i class="iconfont icon-baoxiu"></i>
              <span>我要报修</span>
            </el-menu-item>
            <el-menu-item
              v-if="userStore.userInfo.type == 0"
              index="repair_history"
              @click="handleSelect('repair_history')"
            >
              <i class="iconfont icon-baoxiujilu"></i>
              <span>报修记录</span>
            </el-menu-item>
            <el-sub-menu index="visitor" v-if="userStore.userInfo.type == 1">
              <template #title>
                <i
                  class="iconfont icon-baoxiujilu"
                  style="margin-right: 8px"
                ></i>
                <span>访客</span>
              </template>
              <el-menu-item
                index="visitor_check"
                @click="handleSelect('visitor_check')"
              >
                <i class="iconfont icon-baoxiujilu"></i>
                <span>访客登记</span>
              </el-menu-item>
              <el-menu-item
                index="visitor_log"
                @click="handleSelect('visitor_log')"
              >
                <i class="iconfont icon-baoxiujilu"></i>
                <span>访客记录</span>
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item
              v-if="userStore.userInfo.type == 0"
              index="go_complain"
              @click="handleSelect('go_complain')"
            >
              <i class="iconfont icon-baoxiujilu"></i>
              <span>我要投诉</span>
            </el-menu-item>
            <el-menu-item
              v-if="userStore.userInfo.type == 0"
              index="my_complain"
              @click="handleSelect('my_complain')"
            >
              <i class="iconfont icon-baoxiujilu"></i>
              <span>投诉记录</span>
            </el-menu-item>
            <el-menu-item
              v-if="userStore.userInfo.type == 1"
              index="complain_manage"
              @click="handleSelect('complain_manage')"
            >
              <i class="iconfont icon-baoxiujilu"></i>
              <span>投诉管理</span>
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
const defaultActive = route.name || "home";

/**
 * @description: 点击侧边菜单的回调
 * @param {string} index 菜单索引
 * @return {}
 */
const handleSelect = (name) => {
  router.push({ name });
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
    .el-menu-vertical-demo {
      border-right: none;
      .el-sub-menu {
        :deep(.el-sub-menu__title) {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        :deep(.el-sub-menu__icon-arrow) {
          right: 58px;
        }
      }
      .el-menu-item {
        display: flex;
        justify-content: center;
        i {
          margin-right: 8px;
        }
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
