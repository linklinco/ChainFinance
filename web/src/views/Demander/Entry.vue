<template>
    <el-button @click="handleGet">获取数据</el-button>
    <!-- <el-button @click="showAddDialog = true">添加货物</el-button> -->
    <el-dialog v-model="showAddDialog" center title="入库申请表" width="600">
        <el-form label-position="top" label-width="auto">
            <el-form-item label="请选择物流企业:">
                <el-select-v2 v-model="value" style="width: 600px" filterable remote :remote-method="remoteMethod"
                    :options="options" :loading="loading" placeholder="请输入物流企业名称" />
            </el-form-item>
            <el-form-item label="请选择仓库:">
                <el-select-v2 v-model="form.warehouseid" style="width: 600px" filterable remote
                    :remote-method="getwarehouse" :options="wareoptions" :loading="wloading" placeholder="请输入仓库名称" />
            </el-form-item>
            <el-form-item label="请选择入库时间:">
                <el-date-picker v-model="form.time" type="date" placeholder="请输入入库时间" format="YYYY/MM/DD"
                    value-format="YYYY-MM-DD" />
            </el-form-item>
            <el-form-item>
                <div class="button-center" style="width: 600px">
                    <el-button type="primary" @click="handleAdd">提交</el-button>
                    <el-button @click="showAddDialog = false">取消</el-button>
                </div>
            </el-form-item>
        </el-form>
    </el-dialog>

    <el-table :data="store.getTotal" stripe style="width: 100%;height:80vh">
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
                    :disabled="scope.row.status == '申请入库中' || scope.row.status == '待入库'">
                    申请入库
                </el-button>
                <el-button size="small" type="danger" @click="handleDelect(scope.row.goods_id)"
                    :disabled="scope.row.status == '申请入库中' || scope.row.status == '待入库'">
                    取消
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios';

// 导入store
import { useUsersStore } from "@/stores/demander.js";
import { storeToRefs } from 'pinia';
const store = useUsersStore();
const { goods } = storeToRefs(store)

const showAddDialog = ref(false);
const form = reactive({
    goodsid: '',
    warehouseid: '',
    time: ''
})

const value = ref('')
const options = ref([])
const loading = ref(false)
const remoteMethod = (query) => {
    if (query !== '') {
        loading.value = true
        axios.get('/api/getAllLogistic').then((data) => {
            options.value = data.data.map(item => {
                return { value: `${item.username}`, label: `${item.companyname}` }
            })
            loading.value = false
        })

    } else {
        options.value = []
    }
}
const wareoptions = ref([])
const wloading = ref(false)

const getwarehouse = (query) => {
    if (query !== '') {
        loading.value = true
        axios.get('/api/getwarehouse', {
            params: {
                username: value.value
            }
        }).then((data) => {
            wareoptions.value = data.data.map(item => {
                return { value: `${item.warehouse_id}`, label: `${item.warehouse_name}` }
            })
            wloading.value = false
        })
    } else {
        wareoptions.value = []
    }
}

function handleGet() {
    const token = localStorage.getItem('token');
    axios.post('/api/goods/get', {
        token: token
    }).then((response) => {
        goods.value = []
        response.data.forEach(e => {
            // e.usertype = usertypes[e.usertype]
            goods.value.push(e)
        })
    })
}
// 提交入库申请
function handleAdd() {
    axios.post('/api/goods/entry', {
        goodsid: form.goodsid,
        warehouse: parseInt(form.warehouseid),
        entrytime: form.time
    }).then((res => {
        console.log(res)
        handleGet()
    }))
    showAddDialog.value = false
}

function handleShow(goodsID) {
    form.goodsid = goodsID;
    showAddDialog.value = true;
}
function handleDelect(goodsID) {
    axios.post('/api/goods/del', {
        token: localStorage.getItem('token'),
        goods_id: goodsID,
        status: "删除"
    }).then((res) => {
        console.log(res)
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