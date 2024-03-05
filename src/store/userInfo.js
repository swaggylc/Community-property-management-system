/*
 * @Author: Lu Can lucanlc0417@gmail.com
 * @Date: 2024-02-03 22:16:21
 * @LastEditors: Lu Can lucanlc0417@gmail.com
 * @LastEditTime: 2024-03-05 20:33:35
 * @FilePath: \2024-毕业设计\admin\src\store\userInfo.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
      let result = await login(params);
      if (result.code == 200) {
        this.userInfo = result.data;
        // 存储到本地，localStorage
        SET_TOKEN(JSON.stringify(this.userInfo));
        return {
          code: 200,
          message: "登陆成功",
        };
      } else {
        return {
          code: 400,
          message: result.msg,
        };
      }
    },
  },
  getters: {},
});

export default useUserStore;
