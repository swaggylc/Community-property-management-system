<template>
  <div class="home-container">
    <div class="home-content">
      <img :src="avatarImg" alt="" />
      <div class="home-text">
        <p>
          Hi,欢迎你：{{ userStore.userInfo ? userStore.userInfo.username : "" }}
        </p>
        <span :title="encourageObj">{{ encourageObj }}</span>
      </div>
    </div>
    <div class="home-carousel">
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in swiperArr" :key="item.id">
          <img :src="item.img" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import useUserStore from "@/store/userInfo.js";
import avatarImg from "@/assets/images/avatar.jpg";
import swiperOne from "@/assets/images/swiper_one.jpg";
import swiperTwo from "@/assets/images/swiper_two.jpg";
import swiperThree from "@/assets/images/swiper_three.jpg";
import { reactive, onMounted, ref } from "vue";
import { getNowTime } from "@/utils/utils.js";
import { ElNotification } from "element-plus";
let userStore = useUserStore();

let encourageObj = ref("");

let swiperArr = [
  {
    id: 1,
    img: swiperOne,
  },
  {
    id: 2,
    img: swiperTwo,
  },
  {
    id: 3,
    img: swiperThree,
  },
];

onMounted(() => {
  hasDailySentence();
});

/**
 * @description: 获取每日鸡汤的方法
 * @return {}
 */
const getSoup = () => {
  axios.get("https://api.aag.moe/api/sjyy?type=json").then((res) => {
    encourageObj.value = res.data.text;
    userStore.dailySentence = res.data.text;
  });
    ElNotification({
    title: getNowTime(),
    message: "欢迎来到xx小区物业管理系统",
    type: "success",
  });
};
/**
 * @description:
 * @param {}
 * @return {}
 */
const hasDailySentence = () => {
  if (userStore.dailySentence) {
    encourageObj.value = userStore.dailySentence;
  } else {
    getSoup();
  }
};
</script>

<style lang="scss" scoped>
.home-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .home-content {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 12px;
    width: 100%;
    height: 220px;
    border: 1px solid #ccc;
    border-radius: 4px;
    &:hover {
      // 阴影效果
      box-shadow: 0 0 10px #ccc;
      border-radius: 4px;
    }
    img {
      width: 180px;
      height: 180px;
      border-radius: 50%;
      border: 1px solid #ccc;
      margin-left: 50px;
      margin-right: 60px;
    }
    .home-text {
      height: 180px;
      p {
        font-size: 32px;
        color: #333;
        font-weight: 600;
      }
      span {
        font-size: 18px;
        color: #666;
        max-height: 72px;
        width: 100%; /* 设置容器宽度 */
        overflow: hidden; /* 隐藏溢出部分 */
        text-overflow: ellipsis; /* 使用省略号显示溢出文本 */
        display: -webkit-box; /* 使用-webkit-box布局 */
        -webkit-box-orient: vertical; /* 垂直方向布局 */
        -webkit-line-clamp: 3; /* 显示三行文本 */
      }
    }
  }
  .home-carousel {
    width: 100%;
    height: 480px;
    margin-top: 20px;
    ::v-deep(.el-carousel) {
      .el-carousel__container {
        height: 480px;
        .el-carousel__item {
          display: flex;
          color: #475669;
          opacity: 0.75;
          line-height: 300px;
          margin: 0;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
