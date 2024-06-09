<template>
    <el-button @click="handleGet">获取数据</el-button>
    <!-- <el-button @click="showAddDialog = true">添加货物</el-button> -->
    <el-dialog v-model="showAddDialog" center width="800">
        <el-form label-position="top" label-width="auto">
            <el-form-item label="待转移仓单:">
                <el-text class="mx-1" type="primary">{{ info.hash }}</el-text>
            </el-form-item>
            <el-form-item label="请输入要转给的用户:">
                <el-input v-model="info.to" style="width: 240px" placeholder="请输入要转给的用户账户" />
            </el-form-item>
            <el-form-item>
                <div class="button-center" style="width: 600px">
                    <el-button type="primary" @click="handleAdd">提交</el-button>
                    <el-button @click="showAddDialog = false">取消</el-button>
                </div>
            </el-form-item>
        </el-form>
    </el-dialog>

    <el-table :data="store.genCD" stripe style="width: 100%;height:80vh">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" width="50" fixed="left" />
        <el-table-column label="货物名称" prop="goods_name" sortable />
        <el-table-column label="货物类型" prop="goods_type" sortable />
        <el-table-column label="单位" prop="unit" sortable />
        <el-table-column label="总数" prop="total_quantity" sortable />
        <el-table-column label="货物状态" prop="status" sortable />
        <el-table-column align="center" label="操作" fixed="right">
            <!-- <template #header>
            <el-input v-model="search" size="small" placeholder="Type to search" />
          </template> -->
            <template #default="scope">
                <el-button size="small" @click="handleShow(scope.row.goods_id)"
                    :disabled="scope.row.status == '申请出库中' || scope.row.status == '待出库'">
                    详情
                </el-button>
                <el-button v-if="scope.row.status == '已生成仓单'" size="small" type="primary"
                    @click="handleShow(scope.row.goods_id)">转移仓单</el-button>
                <el-button v-else size="small" type="primary" @click="handleGen(scope.row.goods_id)"
                    :disabled="scope.row.status == '待生成仓单'">
                    生成仓单
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup>
import { reactive, ref } from 'vue'
import axios, { Axios } from 'axios';

// 导入store
import { useUsersStore } from "@/stores/demander.js";
import { storeToRefs } from 'pinia';
const store = useUsersStore();
const { goods } = storeToRefs(store)

import { useInfoStore } from "@/stores/info.js";

const userInfo = useInfoStore();

const showAddDialog = ref(false);

const info = reactive({
    addr: '',
    to: ''
})


function handleGet() {
    axios.post('/api/goods/get', {
        token: localStorage.getItem('token')
    }).then((response) => {
        goods.value = []
        response.data.forEach(e => {
            // e.usertype = usertypes[e.usertype]
            goods.value.push(e)
        })
    })
}
// 提交转移仓单申请
function handleAdd() {
    info.addr = userInfo.hash

    // 仓单信息
    axios.post('/api/goods/tran', {
        token: localStorage.getItem('token'),
        addr: info.addr,
        hash: info.hash,
        to: info.to,

    }).then((response) => {
        console.log(response.data)
    })

    showAddDialog.value = false
}

function handleShow(goodsID) {
    // 这里是货物的hash
    axios.get("/api/getAddrByid", {
        params: {
            goodsID
        }
    }).then((res) => {
        info.hash = res.data.hash
    })

    showAddDialog.value = true;

}
function handleGen(goodsID) {

}

</script>

<style>
.button-center {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
}
</style>