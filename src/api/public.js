// 一些公共的接口
import request from "@/utils/request.js";
// 登陆接口
export const login = (params) => {
  return request.get("/public/login", {params});
};
