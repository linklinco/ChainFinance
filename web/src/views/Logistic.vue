<template>
    <el-menu default-active="2" class="el-menu-vertical-demo">
        <el-sub-menu index="1">
            <template #title>
                <el-icon>
                    <location />
                </el-icon>
                <span>仓库管理</span>
            </template>
            <el-menu-item index="1-1">
                <RouterLink to="/logistic/warehouse">仓库信息管理</RouterLink>
            </el-menu-item>
            <el-menu-item index="1-2">
                <RouterLink to="/logistic/entry">入库管理</RouterLink>
            </el-menu-item>
            <el-menu-item index="1-3">
                <RouterLink to="/logistic/outbound">出库管理</RouterLink>
            </el-menu-item>
            <el-menu-item index="1-4">
                <RouterLink to="/logistic/wmanage">库内管理</RouterLink>
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
                <RouterLink to="/logistic/genReceipt">仓单生成</RouterLink>
            </el-menu-item>
            <!-- <el-menu-item index="2-2">
                <RouterLink to="/logistic/tranReceipt">仓单转移</RouterLink>
            </el-menu-item> -->
        </el-sub-menu>
        <el-sub-menu index="3">
            <template #title>
                <el-icon>
                    <location />
                </el-icon>
                <span>融资管理</span>
            </template>
            <el-menu-item index="3-1">监管仓申请</el-menu-item>
            <el-menu-item index="3-2">货物冻结解冻</el-menu-item>
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