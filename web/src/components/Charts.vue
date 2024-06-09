<template>
    <div id="main"></div>
    <button @click="handleAdd">添加</button>
</template>

<script setup>

import { onMounted, ref, watch } from 'vue';
import * as echarts from 'echarts';

const xdata = ref(["fe"])
const ydata = ref([43])

function handleAdd() {
    xdata.value.push("x轴")
    ydata.value.push(4)
}
let myChart;
let option = {
    xAxis: {
        type: 'category',
        data: xdata.value
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: ydata.value,
            type: 'line'
        }
    ]
};

function change() {
    myChart.setOption(option);
}

watch(xdata, (newValue, oldVale) => {
    console.log(xdata);
    change();
}, { deep: true })


onMounted(() => {
    let chartDom = document.getElementById('main');;
    myChart = echarts.init(chartDom);
    myChart.setOption(option);

})

</script>

<style>
#main {
    width: 600px;
    height: 400px;
}
</style>