// 一些公共的接口
import request from "@/utils/request.js";
// 登陆接口
export const LOGIN = (params) => {
  return request.get("/public/login", { params });
};
// 用户注册接口
export const REGISTER = (params) => {
  return request.post("/public/register", params);
};
// 获取男女用户数量
export const GET_USER_NUMBER = () => {
  return request.get("/public/sex_ratio");
};
// 获取报修列表
export const GET_REPAIR_LIST = (params) => {
  return request.get("/public/repair_list");
};
// 根据uid获取报修信息
export const GET_SELF_REPAIR = (uid) => {
  return request.get("/public/repair_list/" + uid);
};
// 添加报修信息
export const ADD_REPAIR = (params) => {
  return request.post("/public/add_repair", params);
};
// 更改报修状态
export const UPDATE_REPAIR = (params) => {
  return request.post("/public/change_repair_status", params);
};
// 填写评价
export const ADD_APPRAISE = (params) => {
  return request.post("/public/appraise", params);
};
// 查询报修信息
export const GET_REPAIR_CONDITION = (params) => {
  return request.post("/public/repair_list/condition", params);
};
// 访客登记
export const ADD_VISITOR_CHECK = (params) => {
  return request.post("/public/add_visitor_check", params);
};
