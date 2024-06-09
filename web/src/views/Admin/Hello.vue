<template>
    <el-button @click="getinfos">刷新数据</el-button>
    <UserTable></UserTable>
</template>

<script setup>
// 导入库
import { reactive, ref } from 'vue'
import axios from 'axios';
// 导入组件
import UserTable from './UserTable.vue';
// 导入store
import { useInfoStore } from "@/stores/info.js";
import { storeToRefs } from 'pinia';
const store = useInfoStore();
const { items } = storeToRefs(store)
// 导入公用函数
import getinfos from '@/utils/refresh.js'


getinfos();

</script>

<style></style>