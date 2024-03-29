// 一些公共的接口
import request from "@/utils/request.js";
// 登陆接口
export const LOGIN = (params) => {
  return request.get("/public/login", {params});
};
// 用户注册接口
export const REGISTER = (params) => {
  return request.post("/public/register", params);
};
// 获取报修列表
export const GET_REPAIR_LIST = (params) => {
  return request.get("/public/repair_list");
};
// 添加报修信息
export const ADD_REPAIR = (params) => {
  return request.post("/public/add_repair", params);
};
