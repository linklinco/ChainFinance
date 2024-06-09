<template>
    <el-button @click="handleGet">获取数据</el-button>
    <el-button @click="showAddDialog = true">添加货物</el-button>
    <el-dialog v-model="showAddDialog" center title="货物登记表" width="600">
        <el-form :model="form" label-width="100px" label-position="left" style="max-width: 600px">
            <el-form-item label="货物名称">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="货物类型">
                <el-input v-model="form.type" />
            </el-form-item>
            <el-form-item label="生产商">
                <el-input v-model="form.maker" />
            </el-form-item>
            <el-form-item label="品牌">
                <el-input v-model="form.brand" />
            </el-form-item>
            <el-form-item label="单价">
                <el-input v-model="form.price" />
            </el-form-item>
            <el-form-item label="总数">
                <el-input v-model="form.total" />
            </el-form-item>
            <el-form-item label="单位">
                <el-select v-model="form.util" placeholder="请选择货物单位">
                    <el-option label="个" value="个" />
                    <el-option label="吨" value="吨" />
                    <el-option label="升" value="升" />
                    <el-option label="箱" value="箱" />
                    <el-option label="公斤" value="公斤" />
                    <el-option label="标准托" value="标准托" />
                    <el-option label="集装箱" value="集装箱" />
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

    <el-table :data="goods" stripe style="width: 100%;height:80vh">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" width="50" fixed="left" />
        <el-table-column label="货物名称" prop="goods_name" sortable />
        <el-table-column label="货物类型" prop="goods_type" sortable />
        <el-table-column label="总数" prop="total_quantity" sortable />
        <el-table-column label="货物状态" prop="status" sortable />
        <el-table-column align="center" label="操作" fixed="right">
            <!-- <template #header>
            <el-input v-model="search" size="small" placeholder="Type to search" />
          </template> -->
            <template #default="scope">
                <el-button size="small" @click="handleShow(scope.row.goods_id)">
                    详情
                </el-button>
                <el-button size="small" type="danger" :disabled="scope.row.status != '登记成功'"
                    @click="handleDelect(scope.row.goods_id)">
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
import { useUsersStore } from "@/stores/demander.js";
import { storeToRefs } from 'pinia';
const store = useUsersStore();
const { goods } = storeToRefs(store)

const showAddDialog = ref(false);
const form = reactive({
    name: '',
    maker: '',
    brand: '',
    price: '',
    total: '',
    type: '',
    util: '',
    desc: '',
})

function handleGet() {
    const token = localStorage.getItem('token');
    axios.post('/api/goods/get', {
        token: token
    }).then((response) => {
        console.log(response.data)
        goods.value = []
        response.data.forEach(e => {
            // e.usertype = usertypes[e.usertype]
            goods.value.push(e)
        })
    })
}
// 货物登记
function handleAdd() {
    axios.post('/api/goods/add', {
        token: localStorage.getItem('token'),
        goods_name: form.name,
        goods_type: form.type,
        goods_brand: form.brand,
        manufacturer: form.maker,
        util: form.util,
        unit_price: parseInt(form.price),
        total_quantity: parseInt(form.total),
        desc: form.desc
    }).then((res => {
        console.log(res)
        handleGet()
        showAddDialog.value = false;
    }))
}

function handleShow(goodsID) {

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