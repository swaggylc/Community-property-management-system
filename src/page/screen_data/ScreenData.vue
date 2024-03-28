<template>
  <div class="container">
    <!-- 展示内容区域 -->
    <div class="screen" ref="screen">
      <div class="top">
        <!-- 引入子组件 -->
        <Top></Top>
      </div>
      <div class="bottom">
        <div class="left">
          <!-- 引入子组件 -->
          <visitorNow class="visitor-now"></visitorNow>
          <sexRatio class="sex-ratio"></sexRatio>
          <visitorNumber class="visitor-number"></visitorNumber>
        </div>
        <div class="center">
          <!-- 引入子组件 -->
          <Map class="map"></Map>
        </div>
        <div class="right">
          <!-- 引入子组件 -->
          <Ranking class="ranking"></Ranking>
          <AgeRatio class="age-ratio"></AgeRatio>
          <VisitorRatio class="visitor-ratio"></VisitorRatio>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
// 引入子组件
import Top from "./components/top/Top.vue";
import Map from "./components/map/Map.vue";
import AgeRatio from "./components/age_ratio/AgeRatio.vue";
import VisitorRatio from "./components/visitor_ratio/VisitorRatio.vue";
import Ranking from "./components/ranking/Ranking.vue";
import visitorNumber from "./components/visitor_number/visitorNumber.vue";
import visitorNow from "./components/visitor_now/visitorNow.vue";
import sexRatio from "./components/sex_ratio/sexRatio.vue";
// 获取展示区域的dom
let screen = ref();

onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`;
});

// 定义大屏缩放的比例
function getScale(w = 2560, h = 1440) {
  const ww = window.innerWidth / w;
  const hh = window.innerHeight / h;
  return ww > hh ? hh : ww;
}

// 监听视口的变化
window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`;
};
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url(../../assets/images/bg.png) no-repeat;
  background-size: cover;

  .screen {
    position: fixed;
    width: 2560px;
    height: 1440px;
    left: 50%;
    top: 50%;
    transform-origin: left top;

    .top {
      width: 100%;
      height: 40px;
    }

    .bottom {
      display: flex;

      .left {
        display: flex;
        flex-direction: column;
        flex: 1;
        height: 1224px;

        .visitor-now {
          flex: 1;
        }

        .sex-ratio {
          flex: 1;
        }

        .age-ratio {
          flex: 1;
        }
      }

      .center {
        flex: 2;
        display: flex;
        flex-direction: column;
        height: 1080px;
        margin-top: 30px;
        align-items: center;

        .map {
          flex: 4;
        }

        .map-bottom {
          flex: 1;
        }
      }

      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        height: 1224px;

        .ranking {
          flex: 1;
        }

        .visitor-number {
          flex: 1;
        }

        .visitor-ratio {
          flex: 1;
        }
      }
    }
  }
}
</style>
