import { defineStore } from "pinia";
import { login } from "@/api/public";
// 引入本地存储的方法
import { SET_TOKEN, GET_TOKEN } from "@/utils/localFunction.js";

const useUserStore = defineStore("User", {
  state: () => {
    return {
      userInfo: GET_TOKEN() != "undefined" ? JSON.parse(GET_TOKEN()) : {}, //用户信息
    };
  },
  actions: {
    // 用户手机号登陆的方法
    async userLogin(params) {
      // console.log(loginForm);
      let result = await login(params);
      console.log(result, "result");
      if (result.code == 200) {
        this.userInfo = result.data;
        // 存储到本地，localStorage
        SET_TOKEN(JSON.stringify(this.userInfo));
        return "ok";
      } else {
        return Promise.reject(result.message);
      }
    },
  },
  getters: {},
});

export default useUserStore;
