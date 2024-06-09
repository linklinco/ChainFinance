<template>
    <el-card style="min-width: 600px">
        <template #header>
            <div class="card-header">
                <span>用户个人信息</span>
            </div>
        </template>
        <div>
            <el-text class="mx-1">用户名</el-text>：
            <el-text class="mx-1" type="primary">{{ store.name }}</el-text>
        </div>
        <div>
            <el-text class="mx-1">公司名</el-text>：
            <el-text class="mx-1" type="primary">{{ store.companyname }}</el-text>
        </div>
        <div>
            <el-text class="mx-1">公司地址</el-text>：
            <el-text class="mx-1" type="primary">{{ store.addr }}</el-text>
        </div>
        <div>
            <el-text class="mx-1">公司类型</el-text>：
            <el-text class="mx-1" type="primary">{{ store.type }}</el-text>
        </div>
        <div>
            <el-text class="mx-1">公司联系人</el-text>：
            <el-text class="mx-1" type="primary">{{ store.man }}</el-text>
        </div>
        <div>
            <el-text class="mx-1">公司邮箱</el-text>：
            <el-text class="mx-1" type="primary">{{ store.email }}</el-text>
        </div>
        <div>
            <el-text class="mx-1">公司联系方式</el-text>：
            <el-text class="mx-1" type="primary">{{ store.phone }}</el-text>
        </div>
        <div>
            <el-text class="mx-1">区块链hash</el-text>：
            <el-text class="mx-1" type="primary" style="user-select:text">{{ store.hash }}</el-text>
        </div>
        <template #footer>
            <el-button type="primary">修改个人信息</el-button>
        </template>
    </el-card>
</template>

<script setup>
import { reactive, ref } from 'vue'
import axios, { Axios } from 'axios';

// 导入store
import { useInfoStore } from "@/stores/info.js";
import { storeToRefs } from 'pinia';

const store = useInfoStore();
console.log(store.name)


</script>