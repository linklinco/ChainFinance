<template>
    <el-button @click="handleGet">获取数据</el-button>
    <!-- <el-button @click="showAddDialog = true">添加货物</el-button> -->
    <el-dialog v-model="showAddDialog" center width="800">

    </el-dialog>

    <el-table :data="store.genGen" stripe style="width: 100%;height:80vh">
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
                    @click="handleShow(scope.row.goods_id)">查看仓单</el-button>
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
import Receipt from '../Logistic/Receipt.vue';


// 导入store
import { useBankStore } from "@/stores/bank.js";
import { storeToRefs } from 'pinia';


const store = useBankStore();
const { goods } = storeToRefs(store)

const showAddDialog = ref(false);


function handleGet() {
    axios.post('/api/apply/get', {
        token: localStorage.getItem('token')
    }).then((response) => {
        applys.value = []
        response.data.forEach(e => {
            // e.usertype = usertypes[e.usertype]
            applys.value.push(e)
        })
    })
}
// 提交出库申请
function handleAdd() {
    console.log(form.goodsid);
    axios.post('/api/goods/out', {
        token: localStorage.getItem('token'),
        entrytime: form.time,
        status: "申请出库中",
        goodsid: form.goodsid
    }).then((res => {
        console.log(res)
    }))
    handleGet()
    showAddDialog.value = false
}

function handleShow(goodsID) {
    // form.goodsid = goodsID;

    showAddDialog.value = true;

}
function handleGen(goodsID) {
    axios.post('/api/goods/gen', {
        token: localStorage.getItem('token'),
        goodsid: goodsID
    }).then((response) => {
        console.log(response);
        handleGet()
    })
}

</script>

<style>
.button-center {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
}
</style>