// 本地存储操作用户信息的方法
export const SET_TOKEN = (userInfo) => {
  localStorage.setItem("userInfo", userInfo);
};
// 本地获取用户信息的方法
export const GET_TOKEN = () => {
  return localStorage.getItem("userInfo");
};
// 清除本地存储的用户信息
export const REMOVE_TOKEN = () => {
  localStorage.removeItem("userInfo");
};
