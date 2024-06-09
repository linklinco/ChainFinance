<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <Header></Header>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <div v-if="type === '融资企业'">
                        <Demander></Demander>
                    </div>
                    <div v-else-if="type === '物流企业'">
                        <Logistic></Logistic>
                    </div>
                    <div v-else-if="type === '金融企业'">
                        <Bank></Bank>
                    </div>
                    <div v-else-if="type === '管理员'">
                        <Admin></Admin>
                    </div>
                    <div v-else>
                        未登录，<RouterLink to="/login">点击登录</RouterLink>
                    </div>
                </el-aside>
                <el-main>
                    <RouterView></RouterView>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script setup>
import Admin from './Admin.vue'
import Bank from './Bank.vue'
import Demander from './Demander.vue'
import Logistic from './Logistic.vue'


import { useInfoStore } from '../stores/info'
const user = useInfoStore();
const type = user.type;

// import { useRouter } from 'vue-router'
// import { ref, reactive } from 'vue'

import Header from '../components/Header.vue'


// const router = useRouter();
// function go(path) {
//     router.push(path);
// }

// let isLogin = localStorage.getItem("token");


</script>

<style></style>