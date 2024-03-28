<template>
    <div class="ranking">
        <div class="title">
            <p>报修种类排行</p>
            <img src="../../images/dataScreen-title.png" alt="">
        </div>
        <div class="content" ref="ranking"></div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
let ranking = ref()

onMounted(() => {
    let rankingChart = echarts.init(ranking.value)
    rankingChart.setOption({
        color: ['#efbb1a', '#d77169', '#c14f60', '#953f61', '#72355f',],
        grid: {
            bottom: 10
        },
        series: [
            {
                name: '漏斗图',
                type: 'funnel',
                x: '10%',
                y: 60,
                //x2: 80,
                y2: 60,
                width: '80%',
                // height: {totalHeight} - y - y2,
                min: 0,
                max: 1000,
                minSize: '0%',
                maxSize: '100%',
                sort: 'descending', // 'ascending', 'descending'
                gap: 10,
                data: [
                    { value: 182, name: '楼道电梯' },
                    { value: 554, name: '花坛绿化' },
                    { value: 335, name: '公共水电' },
                    { value: 455, name: '管道堵塞' },
                    { value: 654, name: '小区卫生' }
                ].sort(function (a, b) { return a.value - b.value }),
                roseType: true,
                label: {
                    normal: {
                        formatter: function (params) {
                            return params.name + ' ' + params.value + '起';
                        },
                        position: 'center'
                    }
                },
                itemStyle: {
                    normal: {
                        borderWidth: 0,
                        shadowBlur: 30,
                        shadowOffsetX: 0,
                        shadowOffsetY: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }

            }

        ]
    })

})
</script>

<style scoped lang="scss">
.ranking {
    width: 100%;
    height: 100%;
    background: url(../../../../assets/images/dataScreen-main-cb.png) no-repeat;
    background-size: 100% 100%;
    margin: 20px 0;

    .title {
        p {
            color: white;
            font-size: 18px;
            font-weight: 900;
        }

        img {
            margin: 20px 0;
        }
    }

    .content {
        width: 100%;
        height: 300px;
    }
}
</style>