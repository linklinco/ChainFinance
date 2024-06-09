<template>
    <el-button @click="handleGet">获取数据</el-button>
    <!-- <el-button @click="showAddDialog = true">添加货物</el-button> -->
    <el-dialog v-model="showAddDialog" center width="800">
        <Receipt :infos="info"></Receipt>
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
import { useUsersStore } from "@/stores/demander.js";
import { storeToRefs } from 'pinia';


const store = useUsersStore();
const { goods } = storeToRefs(store)

const showAddDialog = ref(false);

const info = reactive({

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

    axios.get("/api/getGoodByid", {
        params: {
            goodsID
        }
    }).then((res) => {
        let data = res.data[0];
        info.desc = data.desc;
        info.goods_brand = data.goods_brand;
        info.goods_name = data.goods_name;
        info.goods_type = data.goods_type;
        info.hash = data.hash;
        info.manufacturer = data.manufacturer;
        info.total_quantity = data.total_quantity;
        info.unit = data.unit;
        info.unit_price = data.unit_price;
        info.id = data.warehouse_receipt_id;
        axios.get("/api/getDataByHash", {
            params: {
                addr: info.hash
            }
        }).then((res) => {
            info.data = res.data.data
        })
    })
    axios.get("/api/getCompanyByid", {
        params: {
            goodsID
        }
    }).then((res) => {
        info.Aname = res.data.companyname;
        info.Aaddr = res.data.companyhome;
        info.Aphone = res.data.phone;
    })
    axios.get("/api/getLogisticByid", {
        params: {
            goodsID
        }
    }).then((res) => {
        info.Bname = res.data.companyname;
        info.Baddr = res.data.companyhome;
        info.Bphone = res.data.phone;
    })
    axios.get("/api/getWarehouseByid", {
        params: {
            goodsID
        }
    }).then((res) => {
        info.wname = res.data.warehouse_name;
        info.wtype = res.data.level;
        info.wphone = res.data.contact_person;
        info.waddr = res.data.warehouse_address;
    })
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