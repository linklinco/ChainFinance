<template>
    <el-menu default-active="2" class="el-menu-vertical-demo">
        <el-sub-menu index="1">
            <template #title>
                <el-icon>
                    <location />
                </el-icon>
                <span>仓单管理</span>
            </template>
            <el-menu-item index="1-1">
                <router-link to="/bank/showreceipt">在押仓单</router-link>
            </el-menu-item>
            <el-menu-item index="1-2">
                <router-link to="/bank/freeze">冻结仓单</router-link>
            </el-menu-item>
            <el-menu-item index="1-3">
                <router-link to="/bank/thaw">解冻仓单</router-link>
            </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
            <template #title>
                <el-icon>
                    <location />
                </el-icon>
                <span>物流方管理</span>
            </template>
            <el-menu-item index="2-1">
                <router-link to="/bank/passwarehouse">监管仓管理</router-link>
            </el-menu-item>
            <el-menu-item index="2-2">监管额度管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
            <template #title>
                <el-icon>
                    <location />
                </el-icon>
                <span>融资管理</span>
            </template>
            <el-menu-item index="3-1">
                <router-link to="/bank/loans">融资审批</router-link>
            </el-menu-item>
            <el-menu-item index="3-2">
                <router-link to="/bank/afterloan">贷后管理</router-link>
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