<template>
  <div class="login-container">
    <el-card class="login-card">
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
      <div class="login-register">
        还没有账号，去注册
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

const router = useRouter();

let userStore = useUserStore();

let loginForm = ref(null);
// 表单数据
let form = reactive({
  account: "",
  password: "",
  type: false,
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
let isPhone = computed(() => {
  // 手机号正则
  let reg = /^1[3-9]\d{9}$/;
  return reg.test(form.account);
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
      if (isPhone) {
        let params = {
          account: form.account,
          password: form.password,
          type: form.type ? 1 : 0,
        };
        let userLogin = userStore.userLogin(params);
        userLogin.then((res) => {
          if(res.code==200){
            ElMessage.success("登录成功");
            // 路由跳转
            router.push("/center");
          }else if(res.code==400){
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
 * @description:
 * @param {}
 * @return {}
 */
const userLogin = async () => {};
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
