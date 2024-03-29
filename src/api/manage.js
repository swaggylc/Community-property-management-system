import request from "@/utils/request.js";
// 管理接口
// 获取用户列表
export const GET_USER_LIST = (params) => {
  return request.get("/user/user_list");
};
// 搜索用户
export const GET_SEARCH_USER = (params) => {
  return request.get("/user/search_user", { params });
};
// 更改用户信息
export const EDIT_USER_INFO = (params) => {
  return request.post("/user/edit_user", params);
};
// 删除用户
export const DELETE_USER = (params) => {
  return request.delete("/user/delete_user", { params });
};
