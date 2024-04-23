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
// 获取访客记录
export const GET_VISITOR_LIST = () => {
  return request.get("/public/get_visitor_list");
};
// 访客登记
export const ADD_VISITOR_CHECK = (params) => {
  return request.post("/public/add_visitor_check", params);
};
// 修改访客记录
export const UPDATE_VISITOR_CHECK = (params) => {
  return request.post("/public/update_visitor", params);
};
// 删除访客记录
export const DELETE_VISITOR_CHECK = (params) => {
  return request.post("/public/delete_visitor", params);
};
// 搜索访客的接口
export const SEARCH_VISITOR = (params) => {
  return request.post("/public/search_visitor", params);
};
// 获取验证码
export const GET_CODE = (params) => {
  return request.get("/public/get_code", { params });
};
// 获取所有管理员信息
export const GET_MANAGER = () => {
  return request.get("/manager/get_manager");
};
// 查询所有投诉信息
export const GET_COMPLAIN_LIST = () => {
  return request.get("/public/get_complain_list");
};
// 用户添加投诉的接口
export const ADD_COMPLAINT = (params) => {
  return request.post("/public/add_complain", params);
};
// 根据联系方式获取报修信息
export const GET_SELF_COMPLAIN = (account) => {
  return request.get("/public/my_complain/" + account);
};
// 根据id删除投诉信息
export const DELETE_COMPLAIN = (params) => {
  return request.post("/public/delete_complain", params);
};
// 更改是否首次投诉
export const UPDATE_COMPLAIN_REPEAT = (params) => {
  return request.post("/public/update_complain_status", params);
};