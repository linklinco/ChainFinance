<template>
    <el-table :data="items" stripe style="width: 100%;height:80vh">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" width="50" fixed="left" />
        <el-table-column label="用户名" prop="username" sortable />
        <el-table-column label="注册类型" prop="usertype" sortable />
        <el-table-column label="公司名称" prop="companyname" sortable />
        <el-table-column label="账户状态" prop="state" sortable />
        <el-table-column label="公司ID" prop="id" sortable />
        <el-table-column align="center" label="操作" fixed="right">
            <!-- <template #header>
            <el-input v-model="search" size="small" placeholder="Type to search" />
          </template> -->
            <template #default="scope">
                <el-button size="small" @click="handleDelete(scope.row.username)">
                    修改
                </el-button>
                <el-button size="small" type="danger" @click="handleNo(scope.row.username)">
                    删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup>
// 导入使用的库

import { reactive, ref } from 'vue'
import axios from 'axios';
import { storeToRefs } from 'pinia';
import { ElMessage } from 'element-plus'
import getinfos from '@/utils/refresh.js'

// 导入user store
import { useInfoStore } from "@/stores/info.js";


const store = useInfoStore();
const { items } = storeToRefs(store)

function handleDelete() {

}
function handleNo(username) {
    axios.post('/api/delectUser', {
        token: localStorage.getItem('token'),
        username: username
    }).then((res) => {
        if (res.data.status == 'ok') {
            ElMessage({
                message: '删除成功',
                type: 'success',
            })
        }
        getinfos();
    })
}

</script>