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
    <el-card style="width: 100%; margin-top: 20px">
      <template #header>
        <div class="card-header">
          <span>今日天气</span>
        </div>
      </template>
      <el-descriptions
        class="margin-top"
        :column="3"
        :size="size"
        border
        v-loading="weatherShow"
      >
        <template #extra>
          <el-button type="primary">查看天气预报</el-button>
        </template>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <LocationFilled />
              </el-icon>
              位置
            </div>
          </template>
          {{ weatherData.province }}-{{ weatherData.city }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <Sunrise />
              </el-icon>
              天气
            </div>
          </template>
          {{ weatherData.weather }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <Odometer />
              </el-icon>
              气温
            </div>
          </template>
          {{ weatherData.temperature }}°C
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <Rank />
              </el-icon>
              风向
            </div>
          </template>
          {{ weatherData.winddirection }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <WindPower />
              </el-icon>
              风力
            </div>
          </template>
          {{ weatherData.windpower }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <Clock />
              </el-icon>
              更新时间
            </div>
          </template>
          {{ weatherData.reporttime }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
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
import { reactive, onMounted, ref, computed } from "vue";
import { getNowTime } from "@/utils/utils.js";
import { ElNotification } from "element-plus";
import { ElMessage } from "element-plus";
import {
  Sunrise,
  Odometer,
  Clock,
  Rank,
  LocationFilled,
  WindPower,
} from "@element-plus/icons-vue";
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

const weatherData = ref({});

const weatherShow = ref(true);

const adcode = ref("");

const size = ref("default");

const iconStyle = computed(() => {
  const marginMap = {
    large: "8px",
    default: "6px",
    small: "4px",
  };
  return {
    marginRight: marginMap[size.value] || marginMap.default,
  };
});

onMounted(() => {
  hasDailySentence();
  getIpLocation();
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
 * @description:本地是否存储每日鸡汤
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

/**
 * @description: 调用高德天气api
 * @param {}
 * @return {}
 */
const getWeather = async () => {
  const res = await axios.get(
    "https://restapi.amap.com/v3/weather/weatherInfo",
    {
      params: {
        key: "b0263a5b4c8c29efb1c9e97b7c18d76f",
        city: adcode.value,
      },
    }
  );
  if (res.data.status == 1) {
    weatherData.value = res.data.lives[0];
    weatherShow.value = false;
  } else {
    ElMessage({
      message: "获取天气信息失败",
      type: "error",
    });
  }
};

/**
 * @description: 调用高德ip定位接口
 * @param {}
 * @return {}
 */
const getIpLocation = async () => {
  const res = await axios.get("https://restapi.amap.com/v3/ip", {
    params: {
      key: "b0263a5b4c8c29efb1c9e97b7c18d76f",
    },
  });
  if (res.data.status == 1) {
    adcode.value = res.data.adcode;
    getWeather();
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
  .cell-item {
    display: flex;
    align-items: center;
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
