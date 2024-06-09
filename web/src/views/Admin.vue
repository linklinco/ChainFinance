<template>
    <el-menu default-active="2" class="el-menu-vertical-demo">
        <el-sub-menu index="1">
            <template #title>
                <el-icon>
                    <location />
                </el-icon>
                <span>用户管理</span>
            </template>
            <el-menu-item index="1-1">
                <router-link to="admin">用户审批</router-link>
            </el-menu-item>
            <el-menu-item index="1-2">
                <router-link to="userAdmin">账号管理</router-link>
            </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="2">
            <el-icon>
                <setting />
            </el-icon>
            <template #title>区块链监控</template>
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