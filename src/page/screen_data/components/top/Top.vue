<template>
    <div class="top">
        <div class="left">
            <span class="lbtn" @click="toHome">首页</span>
        </div>
        <div class="center">
            <div class="title">
                物业管理可视化大数据平台
            </div>
        </div>
        <div class="right">
            <span class="rbtn">统计报告</span>
            <span class="time">{{ time }}</span>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'



let time = ref('')
let timer = ref(0)
let $router = useRouter()


onMounted(() => {
    timer.value = setInterval(() => {
        time.value = getTime()
    }, 1000);
})

onBeforeUnmount(() => {
    clearInterval(timer.value)
})




// 获取当前时间的方法
function getTime() {
    return new Date().toLocaleString()
}
// 点击首页的回调
const toHome = (() => {
    $router.push('/center')
})











</script>

<style scoped lang="scss">
.top {
    display: flex;
    width: 100%;
    height: 40px;

    .left {
        flex: 1;
        background: url(../../../../assets/images/dataScreen-header-left-bg.png) no-repeat;
        background-size: cover;

        .lbtn {
            width: 150px;
            float: right;
            background: url(../../../../assets/images/dataScreen-header-btn-bg-l.png) no-repeat;
            background-size: 100% 100%;
            text-align: center;
            line-height: 40px;
            color: #29fcff;
            cursor: pointer;
            font-size: 24px;
        }
    }

    .center {
        flex: 2;

        .title {
            width: 100%;
            height: 74px;
            background: url(../../../../assets/images/dataScreen-header-center-bg.png) no-repeat;
            background-size: 100% 100%;
            text-align: center;
            line-height: 74px;
            color: #29fcff;
            font-size: 40px;
        }
    }

    .right {
        flex: 1;
        background: url(../../../../assets/images/dataScreen-header-left-bg.png) no-repeat;
        background-size: cover;

        .rbtn {
            width: 150px;
            float: left;
            background: url(../../../../assets/images/dataScreen-header-btn-bg-r.png) no-repeat;
            background-size: 100% 100%;
            text-align: center;
            line-height: 40px;
            color: #29fcff;
            font-size: 24px;
        }

        .time {
            float: right;
            color: #29fcff;
            margin-right: 20px;
            line-height: 40px;
            // 字体间距
            letter-spacing: 2px;
        }
    }
}
</style>