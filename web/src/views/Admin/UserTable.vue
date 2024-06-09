<template>
    <el-dialog v-model="showAllinfos" title="用户详细信息" width="900">
        <el-descriptions class="margin-top" :title="showInfos.companyname" :column="3" border>
            <!-- <template #extra>
          <el-button type="primary">Operation</el-button>
        </template> -->
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon>
                            <user />
                        </el-icon>
                        公司名
                    </div>
                </template>
                {{ showInfos.companyname }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon>
                            <iphone />
                        </el-icon>
                        统一信用编码
                    </div>
                </template>
                {{ showInfos.companyID }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon>
                            <location />
                        </el-icon>
                        联系人
                    </div>
                </template>
                {{ showInfos.man }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon>
                            <location />
                        </el-icon>
                        电子邮箱
                    </div>
                </template>
                {{ showInfos.email }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon>
                            <location />
                        </el-icon>
                        用户名
                    </div>
                </template>
                {{ showInfos.username }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon>
                            <location />
                        </el-icon>
                        用户状态
                    </div>
                </template>
                {{ showInfos.state }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon>
                            <tickets />
                        </el-icon>
                        企业类型
                    </div>
                </template>
                <el-tag size="small">{{ showInfos.usertype }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                        <el-icon>
                            <office-building />
                        </el-icon>
                        企业位置
                    </div>
                </template>
                {{ showInfos.companyhome }}
            </el-descriptions-item>
        </el-descriptions>

        <el-row :gutter="20" style="margin-top:20px;">
            <el-col :span="6">
                <div class="grid-content ep-bg-purple" />
            </el-col>
            <el-col :span="6">
                <el-button size="small" type="danger" @click="handleNo(showInfos.username)">
                    拒绝注册
                </el-button>
            </el-col>

            <el-col :span="6">
                <el-button size="small" type="success" @click="handleYes(showInfos.username)">
                    同意注册
                </el-button>
            </el-col>
            <el-col :span="6">
                <div class="grid-content ep-bg-purple" />
            </el-col>
        </el-row>
    </el-dialog>

    <el-table :data="store.getShows" stripe style="width: 100%;height:80vh">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" width="50" fixed="left" />
        <el-table-column label="公司名称" prop="companyname" sortable />
        <el-table-column label="联系人" prop="man" sortable />
        <el-table-column label="公司地址" prop="companyhome" sortable />
        <el-table-column label="注册类型" prop="usertype" sortable />
        <el-table-column align="center" label="操作" fixed="right">
            <!-- <template #header>
            <el-input v-model="search" size="small" placeholder="Type to search" />
          </template> -->
            <template #default="scope">
                <el-button size="small" @click="handleDelete(scope.$index, scope.row)">
                    查看详情
                </el-button>
                <el-button size="small" type="danger" @click="handleNo(scope.row.username)">
                    拒绝注册
                </el-button>
                <el-button size="small" type="success" @click="handleYes(scope.row.username)">
                    同意注册
                </el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-pagination background layout="total,sizes,prev, pager, next" v-model:current-page="currentPage"
        v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 50]" :total="store.getRegister.length"
        @current-change="handleCurrentChange" style="display: flex; justify-content: flex-end; margin-top: 16px;" />
</template>

<script setup>
import { useInfoStore } from "@/stores/info.js";
import { storeToRefs } from 'pinia';
const store = useInfoStore();
const { currentPage, pageSize } = storeToRefs(store)
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus'



const showAllinfos = ref(false);
const showInfos = reactive({
    "companyID": "91300123456790",
    'companyhome': "上海市浦东新区",
    'companyname': "厦门象屿股份有限公司",
    'email': "info@tianyuangroup.com",
    'id': null,
    'man': "王女士",
    'password': "pw2",
    'phone': "9876543210",
    'state': null,
    'username': "user2",
    'usertype': "融资企业",
})

const handleCurrentChange = (val) => {
    console.log(`current page: ${val}`)
}

const handleSelectionChange = (val) => {
    multipleSelection.value = val
}

const handleDelete = (index, row) => {
    for (let i in showInfos) {
        showInfos[i] = row[i]
    }
    showAllinfos.value = true
}
const handleYes = (username) => {
    store.pass(username)
    ElMessage({
        message: '审批通过',
        type: 'success',
    })
    showAllinfos.value = false
}
const handleNo = (username) => {
    store.remove(username);
    ElMessage({
        message: '拒绝成功',
        type: 'success',
    })
    showAllinfos.value = false
}

</script>