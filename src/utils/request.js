// 对axios函数库进行二次封装
/**
 * 对axios二次封装的目的
 * 1、利用axios请求，响应拦截器功能
 * 2、请求拦截器 ——> 一般可以在请求头中携带公共的参数：token
 * 3、响应拦截器 ——> 可以简化服务器中返回的数据，处理http网络错误（状态码）
 */
import axios from "axios";

// 创建一个axios实例
const request = axios.create({
  baseURL: "http://localhost:3000/", // 基础路径(在端口号后)
  timeout: 10000, // 超时时间
});

// 请求拦截器
request.interceptors.request.use((config) => {
  // config:请求拦截器回调注入的对象（配置信息），有headers属性，可以通过这个属性设置请求头
  // 例如携带公共参数：token
  // 获取用户信息

  return config;
});

// 响应拦截器
request.interceptors.response.use(
  (res) => {
    // 成功的回调，一般会对服务器返回的数据进行处理
    return res.data;
  },
  (error) => {
    // 失败的回调,一般处理http网络错误
    let status = error.response.status;
    switch (status) {
      case 404:
        ElMessage({
          type: "error",
          message: "请求路径错误",
        });
        break;

      case 401:
        ElMessage({
          type: "error",
          message: "参数错误",
        });
        break;

      case 500 | 501 | 502 | 503 | 504:
        ElMessage({
          type: "error",
          message: "服务器错误",
        });
        break;
    }
    return Promise.reject(new Error(error.message || "网络错误"));
  }
);

// 对外暴露
export default request;
