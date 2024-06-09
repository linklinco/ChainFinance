<template>
    <el-menu default-active="2" class="el-menu-vertical-demo">
        <el-sub-menu index="1">
            <template #title>
                <el-icon>
                    <location />
                </el-icon>
                <span>货物管理</span>
            </template>
            <el-menu-item index="1-1">
                <router-link to="/demander/goods">货物登记</router-link>
            </el-menu-item>
            <el-menu-item index="1-2">
                <router-link to="/demander/entry">入库申请</router-link>
            </el-menu-item>
            <el-menu-item index="1-3">
                <router-link to="/demander/outbound">出库申请</router-link>
            </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
            <template #title>
                <el-icon>
                    <location />
                </el-icon>
                <span>仓单管理</span>
            </template>
            <el-menu-item index="2-1">
                <router-link to="/demander/receipt">我的仓单</router-link>
            </el-menu-item>
            <el-menu-item index="2-2">
                <router-link to="/demander/change">仓单交易</router-link>
            </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
            <template #title>
                <el-icon>
                    <location />
                </el-icon>
                <span>融资管理</span>
            </template>
            <el-menu-item index="3-1">
                <router-link to="/demander/getloan">融资申请</router-link>
            </el-menu-item>
            <el-menu-item index="3-2">
                <router-link to="/demander/Repay">融资还款</router-link>
            </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="4">
            <el-icon>
                <setting />
            </el-icon>
            <template #title>
                <router-link to="/account">用户信息管理</router-link>
            </template>
        </el-menu-item>
    </el-menu>
</template>

<script setup>
import { ref } from 'vue'
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'


</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: calc(100vh - 60px);
}

.flex-grow {
    flex-grow: 1;
}
</style>