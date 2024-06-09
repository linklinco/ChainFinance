<template>
    <el-button @click="handleGet">刷新数据</el-button>
    <el-button @click="showAddDialog = true">添加仓库</el-button>
    <el-dialog v-model="showAddDialog" center title="仓库登记表" width="600">
        <el-form :model="form" label-width="100px" label-position="left" style="max-width: 600px">
            <el-form-item label="仓库名称">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="仓库地址">
                <el-input v-model="form.addr" />
            </el-form-item>
            <el-form-item label="库存容量">
                <el-input v-model="form.total" />
            </el-form-item>
            <el-form-item label="联系方式">
                <el-input v-model="form.link" />
            </el-form-item>
            <el-form-item label="仓库类型">
                <el-select v-model="form.type" placeholder="请选择仓库防火等级">
                    <el-option label="甲类仓" value="甲类仓" />
                    <el-option label="乙一类" value="乙一类" />
                    <el-option label="乙二类" value="乙二类" />
                    <el-option label="丙一类" value="丙一类" />
                    <el-option label="丙二类" value="丙二类" />
                    <el-option label="丁类仓" value="丁类仓" />
                    <el-option label="戊类仓" value="戊类仓" />
                </el-select>
            </el-form-item>
            <el-form-item label="备注信息">
                <el-input v-model="form.desc" type="textarea" />
            </el-form-item>
            <el-form-item>
                <div class="button-center">
                    <el-button type="primary" @click="handleAdd">创建</el-button>
                    <el-button @click="showAddDialog = false">取消</el-button>
                </div>
            </el-form-item>
        </el-form>
    </el-dialog>

    <el-table :data="warehouse" stripe style="width: 100%;height:80vh">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" width="50" fixed="left" />
        <el-table-column label="仓库编号" prop="warehouse_id" sortable />
        <el-table-column label="仓库名称" prop="warehouse_name" sortable />
        <el-table-column label="仓库类型" prop="level" sortable />
        <el-table-column label="仓库地址" prop="warehouse_address" sortable />
        <el-table-column label="可用面积" prop="storage_capacity" sortable />
        <el-table-column align="center" label="操作" fixed="right">
            <!-- <template #header>
            <el-input v-model="search" size="small" placeholder="Type to search" />
          </template> -->
            <template #default="scope">
                <el-button size="small" @click="handleShow(scope.row.warehouse_id)">
                    详情
                </el-button>
                <el-button size="small" type="danger" @click="handleDelect(scope.row.warehouse_id)">
                    删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios';

// 导入store
import { useUsersStore } from "@/stores/logistic.js";
import { storeToRefs } from 'pinia';
const store = useUsersStore();
const { warehouse } = storeToRefs(store)

const showAddDialog = ref(false);
const form = reactive({
    name: '',
    addr: '',
    total: '',
    type: '',
    link: '',
    desc: '',
})

// 获取用户名下所有仓库
function handleGet() {
    const token = localStorage.getItem('token');
    axios.post('/api/warehouse/get', {
        token: token
    }).then((response) => {
        warehouse.value = []
        response.data.forEach(e => {
            // e.usertype = usertypes[e.usertype]
            warehouse.value.push(e)
        })
    })
}
// 添加新的仓库
function handleAdd() {
    console.log(form)
    axios.post('/api/warehouse/add', {
        token: localStorage.getItem('token'),
        name: form.name,
        addr: form.addr,
        total: parseInt(form.total),
        person: form.link,
        desc: form.desc,
        passware: "普通仓",
        level: form.type
    }).then((res) => {
        console.log(res)
        showAddDialog.value = false
        handleGet()
    })
}

function handleShow(id) {

}
function handleDelect(id) {
    axios.post('/api/warehouse/del', {
        token: localStorage.getItem('token'),
        warehouse_id: id,
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