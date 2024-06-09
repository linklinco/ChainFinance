<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px">
                <Logo></Logo>
                <el-menu default-active="2" class="el-menu-vertical-demo">
                    <el-sub-menu index="1">
                        <template #title>
                            <el-icon>
                                <location />
                            </el-icon>
                            <span>货物管理</span>
                        </template>
                        <el-menu-item index="1-1">我的货物</el-menu-item>
                        <el-menu-item index="1-2">入库申请</el-menu-item>
                        <el-menu-item index="1-2">出库申请</el-menu-item>
                    </el-sub-menu>
                    <el-sub-menu index="2">
                        <template #title>
                            <el-icon><icon-menu /></el-icon><span>仓单管理</span></template>
                        <el-menu-item index="2-1">我的仓单</el-menu-item>
                    </el-sub-menu>
                    <el-menu-item index="3">
                        <template #title>
                            <el-icon>
                                <document />
                            </el-icon>
                            <span>融资管理</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="4">

                        <template #title>
                            <el-icon>
                                <setting />
                            </el-icon>
                            <span>个人设置</span>
                        </template>
                    </el-menu-item>
                </el-menu>

            </el-aside>
            <el-container>
                <el-header>
                    <!-- <div class="header">

                    </div> -->
                </el-header>
                <el-main>
                    <Table></Table>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script setup>
import Logo from './Logo.vue';
import Table from './tables/Table.vue';

import {
    Check,
    Delete,
    Edit,
    Message,
    Search,
    Star,
} from '@element-plus/icons-vue';
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'

const isCollapse = ref(true)
const router = useRouter();
function go(path) {
    router.push(path);
}

import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'


let isLogin = localStorage.getItem("token");

// console.log(isLogin);


</script>

<style>
.header {
    height: 80px;
    border: solid 3px black;
    box-sizing: border-box;
}
</style>