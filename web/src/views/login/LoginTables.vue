<template>
    <h1 class="welcome">链金通供应链质押融资平台</h1>
    <el-tabs class="form" stretch v-model="tabNow">
        <el-tab-pane class="" label="User" :name="0">
            <template #label>
                用户登录
            </template>

            <el-form :model="form" label-width="100%" label-position="top">
                <el-form-item label="用户名">
                    <el-input v-model="form.username" />
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password" />
                </el-form-item>
                <el-radio-group v-model="form.usertype" class="ml-4">
                    角色类型：
                    <el-radio value="融资企业" size="large">融资企业</el-radio>
                    <el-radio value="物流企业" size="large">物流企业</el-radio>
                    <el-radio value="金融企业" size="large">金融企业</el-radio>
                    <el-radio value="管理员" size="large">管理员</el-radio>
                </el-radio-group>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" size="large" style="width: 45%;">登录</el-button>
                    <el-button size="large" style="width: 45%;">重置</el-button>
                </el-form-item>
            </el-form>

        </el-tab-pane>
        <el-tab-pane label="Config" :name="1">
            <template #label>
                用户注册
            </template>

            <el-form :model="signForm" label-width="auto">
                <el-form-item label="用户名">
                    <el-input v-model="signForm.username" />
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="signForm.password" />
                </el-form-item>
                <!-- <el-form-item label="确认密码">
                    <el-input /> -->
                <!-- </el-form-item> -->
                <el-form-item label="公司名称">
                    <el-input v-model="signForm.companyname" />
                </el-form-item>
                <el-form-item label="信用代码">
                    <el-input v-model="signForm.companyID" />
                </el-form-item>
                <el-form-item label="企业地址">
                    <el-input v-model="signForm.where" />
                </el-form-item>
                <el-form-item label="联系人">
                    <el-input v-model="signForm.man" />
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="signForm.phone" />
                </el-form-item>
                <el-form-item label="联系邮箱">
                    <el-input v-model="signForm.email" />
                </el-form-item>

                <el-radio-group v-model="signForm.usertype" class="ml-4" label="注册角色类型：">
                    <el-radio value="融资企业" size="large">融资企业</el-radio>
                    <el-radio value="物流企业" size="large">物流企业</el-radio>
                    <el-radio value="金融企业" size="large">金融企业</el-radio>
                </el-radio-group>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit" size="large" style="width: 45%;">注册</el-button>
                    <el-button size="large" style="width: 45%;">重置</el-button>
                </el-form-item>
            </el-form>

        </el-tab-pane>
    </el-tabs>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { useRouter } from 'vue-router'
import { useInfoStore } from '@/stores/info.js'
import { ElMessage } from 'element-plus'

import axios from 'axios';

const router = useRouter();
const userStore = useInfoStore();

function go(path) {
    router.push(path);
}
const tabNow = ref(0);

// watch(tabNow, (newData, oldData) => {
//     console.log(newData);
// })

const form = reactive({
    username: '',
    password: '',
    usertype: '',
})

const signForm = reactive({
    username: '',
    password: '',
    companyname: '',
    companyID: '',
    where: '',
    man: '',
    phone: '',
    email: '',
    usertype: ''
})

function onSubmit() {
    if (tabNow.value === 0) {
        axios.post('/api/login', {
            "username": form.username,
            "password": form.password,
            "usertype": form.usertype
        }).then((res) => {


            console.log(res);
            if (res.data.status === 'ok') {
                localStorage.setItem("token", res.data.data.token);
                ElMessage({
                    message: '登录成功',
                    type: 'success',
                })
                userStore.companyname = res.data.data.user.companyname
                userStore.hash = res.data.data.user.hash
                userStore.addr = res.data.data.user.companyhome
                userStore.man = res.data.data.user.man
                userStore.phone = res.data.data.user.phone
                userStore.email = res.data.data.user.email
                userStore.name = form.username
                userStore.type = form.usertype
                go('/')
            } else {
                ElMessage.error('登录失败，用户名或密码错误')
            }
        })
    } else {
        axios.post('/api/register', {
            "username": signForm.username,
            "password": signForm.password,
            "companyname": signForm.companyname,
            "companyID": signForm.companyID,
            "where": signForm.where,
            "man": signForm.man,
            "phone": signForm.phone,
            "email": signForm.email,
            "usertype": signForm.usertype
        }).then((res) => {
            if (res.data.status === 'ok') {
                ElMessage({
                    message: '注册成功,请等待管理员审批',
                    type: 'success',
                })
                tabNow.value = 0;
            }
        })
    }



    // axios.get('/api/login', {
    //     params: {
    //         ID: 12345
    //     }
    // })
    //     .then(function (response) {
    //         console.log(response);
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
    //     .finally(function () {
    //         // 总是会执行
    //     });

    // if (tabNow.value === 0) {
    //     console.log(form);
    // } else {
    //     console.log(signForm);
    // }
    // localStorage.setItem("isLogin", "ture");
    // go('/')

}

</script>

<style>
.welcome {
    text-align: center;
    font-size: 28px;
    color: rgb(39, 52, 131);
    margin: 30px;
}

.form {
    margin-top: 32px;
    padding: 0 60px;
}
</style>