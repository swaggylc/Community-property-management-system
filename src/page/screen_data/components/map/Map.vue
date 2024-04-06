<template>
    <div class="map" ref="map"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import chinaJson from './china.json'    // 引入地图数据
let map = ref()
//@ts-ignore
echarts.registerMap('china', chinaJson) // 注册地图
onMounted(() => {
    let mapChart = echarts.init(map.value)
    mapChart.setOption({
        geo: [{
            map: 'china',
            layoutCenter: ['50%', '60%'],
            // 如果宽高比大于 1 则宽度为 100，如果小于 1 则高度为 100，保证了不超过 100x100 的区域
            layoutSize: 900,
            label: {
                show: true,
                color: '#fff',
                fontSize: 12,
                fontWeight: 'bold'
            },
            itemStyle: {
                areaColor: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: '#02347a' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#052145' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                },
                borderColor: '#52bde9',
                borderWidth: 1
            },
            emphasis: {
                focus: 'self',
                itemStyle: {
                    areaColor: '#52bde9',
                    borderColor: '#fff',
                    borderWidth: 1
                }
            }
        }],

    })
})


</script>

<style scoped lang="scss">
.map {
    width: 100%;
    height: 100%;
}
</style>