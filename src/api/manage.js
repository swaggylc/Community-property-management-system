import request from "@/utils/request.js";
// 管理接口
// 获取用户列表
export const  GET_USERLIST = (params) => {
  return request.get("/user/user_list", { params });
};

