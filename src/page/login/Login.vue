<template>
  <div class="login-container">
    <!-- 登陆卡片 -->
    <el-card class="login-card" v-if="isLogin">
      <h2 class="login-title">
        小区物业管理系统 - {{ form.type ? "管理员" : "业主" }}登录
      </h2>
      <el-form class="login-form" :model="form" ref="loginForm" :rules="rules">
        <el-form-item prop="account">
          <el-input v-model="form.account" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <p>切换账号类型：</p>
          <el-switch v-model="form.type" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
      <div class="login-register" @click="isLogin = !isLogin">
        还没有账号，去注册
        <i class="iconfont icon-youjiantou"></i>
      </div>
    </el-card>
    <!-- 注册卡片 -->
    <el-card class="login-card" v-if="!isLogin">
      <h2 class="login-title">小区物业管理系统 - 业主注册</h2>
      <el-form
        class="login-form"
        :model="userRegisteredForm"
        :rules="registeredRules"
        label-width="auto"
        ref="registeredForm"
      >
        <el-form-item prop="account" label="账号">
          <el-input
            v-model="userRegisteredForm.account"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input
            v-model="userRegisteredForm.password"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="username" label="用户名">
          <el-input
            v-model="userRegisteredForm.username"
            type="text"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="name" label="姓名">
          <el-input
            v-model="userRegisteredForm.name"
            type="text"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="address" label="住址">
          <el-input
            v-model="userRegisteredForm.address"
            type="text"
            placeholder="请输入住址(例:x栋xx01)"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="userRegisteredForm.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="userRegister">注册</el-button>
        </el-form-item>
      </el-form>
      <div class="login-register" @click="isLogin = !isLogin">
        我有账号，去登陆
        <i class="iconfont icon-youjiantou"></i>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import { ElMessage } from "element-plus";
import useUserStore from "@/store/userInfo.js";
import { useRoute, useRouter } from "vue-router";
import { REGISTER } from "@/api/public.js";

const router = useRouter();

let userStore = useUserStore();

const isLogin = ref(true);

let loginForm = ref(null);
let registeredForm = ref(null);
// 表单数据
let form = reactive({
  account: "",
  password: "",
  type: false,
});
// 注册表单数据
let userRegisteredForm = ref({
  account: "",
  password: "",
  address: "",
  name: "",
  sex: "男",
  username: "",
});
// 表单验证规则
const rules = {
  account: [
    { required: true, message: "请输入账号", trigger: "blur" },
    { min: 11, max: 11, message: "请输入11位手机号", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" },
  ],
};
// 注册表单验证规则
const registeredRules = {
  account: [
    { required: true, message: "请输入账号", trigger: "blur" },
    { min: 11, max: 11, message: "请输入11位手机号", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" },
  ],
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" },
  ],
  name: [
    { required: true, message: "请输入姓名", trigger: "blur" },
    { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" },
  ],
  address: [
    { required: true, message: "请输入住址", trigger: "blur" },
    { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" },
  ],
};
// 手机号正则
let reg = /^1[3-9]\d{9}$/;

let isPhone = computed(() => {
  return reg.test(form.account);
});
let isPhoneRegister = computed(() => {
  return reg.test(userRegisteredForm.value.account);
});

/**
 * @description:点击登录按钮的回调
 * @param {object} params 参数
 * @return {}
 */
const login = () => {
  // 验证
  loginForm.value.validate((valid) => {
    if (valid) {
      if (isPhone.value) {
        let params = {
          account: form.account,
          password: form.password,
          type: form.type ? 1 : 0,
        };
        let userLogin = userStore.userLogin(params);
        userLogin.then((res) => {
          if (res.code == 200) {
            ElMessage.success("登录成功");
            // 路由跳转
            router.push("/center");
          } else if (res.code == 400) {
            ElMessage.error(res.message);
          }
        });
        // 跳转
      } else {
        ElMessage.error("请输入正确的手机号");
      }
    } else {
      ElMessage.error("请填写完整信息");
      return false;
    }
  });
};

/**
 * @description:注册的回调
 * @return {}
 */
const userRegister = () => {
  registeredForm.value.validate(async (valid) => {
    if (valid) {
      if (isPhoneRegister.value) {
        const res = await REGISTER(userRegisteredForm.value);
        if (res.code == 200) {
          ElMessage.success("注册成功,请登录！");
          isLogin.value = true;
          userRegisteredForm.value = {
            account: "",
            password: "",
            address: "",
            name: "",
            sex: "男",
            username: "",
          };
        } else {
          ElMessage.error(res.msg);
        }
      }else{
        ElMessage.error("请输入正确的手机号");
      }
    }else{
      ElMessage.error("请填写完整信息");
    }
  });
};
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("./../../assets/images/R.jpg");
  background-size: cover;
  background-position: center;
}

.login-card {
  width: 400px;

  .login-register {
    color: #666;
    text-align: right;
    font-size: 14px;
    line-height: 16px;
    height: 16px;
    cursor: pointer;

    &:hover {
      color: #1f6cdd;
    }
  }
}

.login-title {
  text-align: center;
  margin-bottom: 30px;
}

.login-form {
  margin-bottom: 20px;

  .el-form-item {
    margin-bottom: 20px;
  }

  .el-button {
    width: 100%;
  }
}
</style>
