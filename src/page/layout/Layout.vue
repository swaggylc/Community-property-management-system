<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <div class="header-title">小区物业管理系统</div>
        <el-menu class="el-header-menu" mode="horizontal" :ellipsis="false">
          <div class="flex-grow" />
          <div
            class="head-message"
            index="message"
            @click="handleSelect('notice_manage')"
          >
            <i class="iconfont icon-xiaoxi-zhihui"></i>
            <span style="margin-left: 4px">消息</span>
          </div>
          <el-sub-menu index="2">
            <template #title>{{
              userStore.userInfo ? userStore.userInfo.username : ""
            }}</template>
            <el-menu-item index="2-1" @click="accountSet"
              >账号设置</el-menu-item
            >
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
              <i class="iconfont icon-tousu_o"></i>
              <span>我要投诉</span>
            </el-menu-item>
            <el-menu-item
              v-if="userStore.userInfo.type == 0"
              index="my_complain"
              @click="handleSelect('my_complain')"
            >
              <i class="iconfont icon-tousujilu"></i>
              <span>投诉记录</span>
            </el-menu-item>
            <el-menu-item
              v-if="userStore.userInfo.type == 1"
              index="complain_manage"
              @click="handleSelect('complain_manage')"
            >
              <i class="iconfont icon-tousuguanli"></i>
              <span>投诉管理</span>
            </el-menu-item>
            <el-sub-menu index="notice" v-if="userStore.userInfo.type == 1">
              <template #title>
                <i
                  class="iconfont icon-baoxiujilu"
                  style="margin-right: 8px"
                ></i>
                <span>通知</span>
              </template>
              <el-menu-item
                index="add_notice"
                @click="handleSelect('add_notice')"
              >
                <i class="iconfont icon-baoxiujilu"></i>
                <span>发布通知</span>
              </el-menu-item>
              <el-menu-item
                index="notice_manage"
                @click="handleSelect('notice_manage')"
              >
                <i class="iconfont icon-baoxiujilu"></i>
                <span>通知管理</span>
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item
              v-if="userStore.userInfo.type == 0"
              index="user_notice"
              @click="handleSelect('notice_manage')"
            >
              <i class="iconfont icon-tousuguanli"></i>
              <span>通知公告</span>
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
    <!-- 更改密码的弹框 -->
    <el-dialog v-model="dialogVisible" title="账号设置">
      <el-form
        :model="accountFormData"
        label-width="auto"
        style="max-width: 600px"
        :rules="rules"
      >
        <el-form-item label="账号" prop="account">
          <el-input v-model="accountFormData.account" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="accountFormData.password" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="accountFormData.name" />
        </el-form-item>
        <el-form-item label="昵称" prop="username">
          <el-input v-model="accountFormData.username" />
        </el-form-item>
        <el-form-item
          label="住址"
          v-if="userStore.userInfo.type == 0"
          prop="address"
        >
          <el-input v-model="accountFormData.address" />
        </el-form-item>
        <el-form-item label="性别" v-if="userStore.userInfo.type == 0">
          <el-select v-model="accountFormData.sex" style="width: 240px">
            <el-option
              v-for="item in sexOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submit"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import useUserStore from "@/store/userInfo.js";
import { useRoute, useRouter } from "vue-router";
import wechat from "@/assets/images/wechat.jpg";
import { REMOVE_TOKEN } from "@/utils/localFunction.js";
import { ACCOUNT_SETTING } from "@/api/public.js";
import { ElMessage } from "element-plus";

let userStore = useUserStore();
let route = useRoute();
let router = useRouter();
const defaultActive = route.name || "home";

const dialogVisible = ref(false);

const accountFormData = ref({
  account: userStore.userInfo.account,
  password: "",
  name: userStore.userInfo.name,
  username: userStore.userInfo.username,
  address: userStore.userInfo.address,
  sex: userStore.userInfo.sex,
  type: userStore.userInfo.type,
  uid: userStore.userInfo.uid,
});

const sexOptions = ref([
  {
    label: "男",
    value: "男",
  },
  {
    label: "女",
    value: "女",
  },
]);

const rules = ref({
  account: [{ required: true, message: "请输入账号", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  username: [{ required: true, message: "请输入昵称", trigger: "blur" }],
  address: [{ required: true, message: "请输入住址", trigger: "blur" }],
});

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

/**
 * @description: 点击账号设置的回调
 * @param {}
 * @return {}
 */
const accountSet = () => {
  dialogVisible.value = true;
};

/**
 * @description:
 * @param {}
 * @return {}
 */
const submit = async () => {
  const res = await ACCOUNT_SETTING(accountFormData.value);
  if (res.code == 200) {
    dialogVisible.value = false;
    // 提示重新登录
    ElMessage({
      message: "修改成功，请重新登录",
      type: "success",
    });
    // 退出登录
    logout();
  }
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
      .head-message {
        display: flex;
        align-items: center;
        border-bottom: 3px solid transparent;
        font-size: 14px;
        cursor: pointer;
      }
      .head-message:hover {
        color: #409eff;
      }
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
