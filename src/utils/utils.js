/**
 * @description: 判断是否在路由白名单内
 * @param {array} arr 路由白名单
 * @param {string} item 将要跳转的路由
 * @return {}
 */
export const isWhiteRoute = (arr, item) => {
  return arr.indexOf(item) !== -1;
};
// 判断当前时间段的方法
export const getNowTime = () => {
  const now = new Date().getHours();
  if (now >= 6 && now < 9) {
    return "早上好";
  } else if (now >= 9 && now < 12) {
    return "上午好";
  } else if (now >= 12 && now < 14) {
    return "中午好";
  } else if (now >= 14 && now < 18) {
    return "下午好";
  } else if (now >= 18 && now < 24) {
    return "晚上好";
  } else {
    return "凌晨好";
  }
};
