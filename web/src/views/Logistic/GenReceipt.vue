<script setup>

// import Receipt from "../../components/Receipt.vue";
import Receipt from "./Receipt.vue";

const info = {
    company: "江西XXXfdrf有限公司",
}

import { reactive, ref } from 'vue'
import axios from 'axios';

// 导入store
import { useUsersStore } from "@/stores/logistic.js";
import { storeToRefs } from 'pinia';

const store = useUsersStore();
const { goods } = storeToRefs(store)

const showAddDialog = ref(false);
const form = reactive({
    name: '',
    addr: '',
    total: '',
    type: '',
    link: '',
    desc: '',
})

handleGet();
// 获取用户名下所有仓库的入库申请
function handleGet() {
    const token = localStorage.getItem('token');
    axios.post('/api/warehouse/getgoods', {
        token: token
    }).then((response) => {
        console.log("数据已刷新")
        goods.value = []
        response.data.forEach(e => {
            // e.usertype = usertypes[e.usertype]
            goods.value.push(e)
        })
    })
}

function handleShow(id) {
    showAddDialog.value = true;

}
function handleYes(id) {
    axios.post('/api/warehouse/gen', {
        token: localStorage.getItem('token'),
        goods_id: id,
        status: "生成仓单"
    }).then((res) => {
        console.log(res)
        handleGet()
    })
}
function handleYesEntry(id) {
    // axios.post('/api/warehouse/entry', {
    //     token: localStorage.getItem('token'),
    //     goods_id: id,
    //     status: "已出库"
    // }).then((res) => {
    //     console.log(res)
    //     handleGet()
    // })
}

</script>
<template>
    <el-dialog v-model="showAddDialog" width="800">
        <Receipt :infos="info"></Receipt>
    </el-dialog>

    <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
            <el-button type="primary" @click="handleGet">刷新数据</el-button>
            <el-button @click="showAddDialog = true">添加仓库</el-button>
        </el-form-item>
    </el-form>
    <el-table :data="store.getGen" stripe style="width: 100%;height:80vh">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" width="50" fixed="left" />
        <el-table-column label="申请公司" prop="companyname" sortable />
        <el-table-column label="货物名称" prop="goods_name" sortable />
        <el-table-column label="仓库" prop="warehouse_name" sortable />
        <el-table-column label="预约出库时间" prop="entry_time" sortable />
        <el-table-column label="状态" prop="status" sortable />
        <el-table-column align="center" label="操作" fixed="right">
            <!-- <template #header>
            <el-input v-model="search" size="small" placeholder="Type to search" />
          </template> -->
            <template #default="scope">
                <el-button size="small" @click="handleShow(scope.row.warehouse_id)">
                    预览仓单
                </el-button>

                <el-button v-if="scope.row.status == '待出库'" size="small" type="primary"
                    @click="handleYesEntry(scope.row.goods_id)">
                    已入库
                </el-button>
                <el-button v-else size="small" type="primary" @click="handleYes(scope.row.goods_id)">
                    生成仓单
                </el-button>
                <!-- <el-button v-if="scope.row.status == '待出库'" size="small" type="danger"
                    @click="handleNo(scope.row.goods_id)">
                    取消出库
                </el-button>
                <el-button v-else size="small" type="danger" @click="handleNo(scope.row.goods_id)">
                    拒绝
                </el-button> -->
            </template>
        </el-table-column>
    </el-table>


    <!--     
    <Receipt :infos="info"></Receipt> -->
</template>
