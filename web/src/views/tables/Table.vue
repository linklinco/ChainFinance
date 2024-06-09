<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <el-row :gutter="20">
                    <el-col :span="3" :offset="20">
                        <el-button type="primary">添加货物</el-button>
                    </el-col>

                </el-row>

            </el-header>
            <el-main>
                <el-table :data="filterTableData" style="width: 100%">
                    <el-table-column label="货物编码" prop="hwbm" />
                    <el-table-column label="货物名" prop="hwmc" />
                    <el-table-column label="货物类型" prop="hwlx" />
                    <el-table-column label="货物品牌" prop="hwpp" />
                    <el-table-column label="生成商" prop="scs" />
                    <el-table-column label="单价" prop="dj" />
                    <el-table-column label="总数" prop="zs" />
                    <el-table-column align="right">
                        <template #header>
                            <el-input v-model="search" size="small" placeholder="Type to search" />
                        </template>
                        <template #default="scope">
                            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
                                Edit
                            </el-button>
                            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
                                Delete
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>


                <el-pagination :page-size="20" :pager-count="11" layout="prev, pager, next" :total="1000" />
            </el-main>
        </el-container>
    </div>
</template>

<script setup>

import { computed, ref } from 'vue'


const search = ref('')
const filterTableData = computed(() =>
    tableData.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase())
    )
)
const handleEdit = (index, row) => {
    console.log(index, row)
}
const handleDelete = (index, row) => {
    console.log(index, row)
}

const tableData = [{ "hwbm": "YZA894", "hwmc": "7D打印机", "hwpp": "PrintPro", "hwlx": "7D打印设备", "scs": "PrintTech", "cd": "中国", "dw": "台", "dj": "1147", "zs": "59", "ms": "这款7D打印机能够打印出精确的三维模型和零件" }, { "hwbm": "YZA893", "hwmc": "6D打印机", "hwpp": "PrintPro", "hwlx": "6D打印设备", "scs": "PrintTech", "cd": "中国", "dw": "台", "dj": "1136", "zs": "48", "ms": "这款6D打印机能够打印出精确的三维模型和零件" }, { "hwbm": "YZA892", "hwmc": "5D打印机", "hwpp": "PrintPro", "hwlx": "5D打印设备", "scs": "PrintTech", "cd": "中国", "dw": "台", "dj": "1125", "zs": "37", "ms": "这款5D打印机能够打印出精确的三维模型和零件" }, { "hwbm": "YZA891", "hwmc": "4D打印机", "hwpp": "PrintPro", "hwlx": "4D打印设备", "scs": "PrintTech", "cd": "中国", "dw": "台", "dj": "1114", "zs": "26", "ms": "这款4D打印机能够打印出精确的三维模型和零件" }, { "hwbm": "YZA890", "hwmc": "3D打印机", "hwpp": "PrintPro", "hwlx": "3D打印设备", "scs": "PrintTech", "cd": "中国", "dw": "台", "dj": "1103", "zs": "15", "ms": "这款3D打印机能够打印出精确的三维模型和零件" }, { "hwbm": "XYZ461", "hwmc": "无线耳机", "hwpp": "SoundPro", "hwlx": "音频设备", "scs": "AudioTech", "cd": "美国", "dw": "副", "dj": "1150", "zs": "62", "ms": "这款无线耳机采用最新的蓝牙技术，具有出色的音质" }, { "hwbm": "XYZ460", "hwmc": "无线耳机", "hwpp": "SoundPro", "hwlx": "音频设备", "scs": "AudioTech", "cd": "美国", "dw": "副", "dj": "1139", "zs": "51", "ms": "这款无线耳机采用最新的蓝牙技术，具有出色的音质" }, { "hwbm": "XYZ459", "hwmc": "无线耳机", "hwpp": "SoundPro", "hwlx": "音频设备", "scs": "AudioTech", "cd": "美国", "dw": "副", "dj": "1128", "zs": "40", "ms": "这款无线耳机采用最新的蓝牙技术，具有出色的音质" }, { "hwbm": "XYZ458", "hwmc": "无线耳机", "hwpp": "SoundPro", "hwlx": "音频设备", "scs": "AudioTech", "cd": "美国", "dw": "副", "dj": "1117", "zs": "29", "ms": "这款无线耳机采用最新的蓝牙技术，具有出色的音质" }, { "hwbm": "XYZ457", "hwmc": "无线耳机", "hwpp": "SoundPro", "hwlx": "音频设备", "scs": "AudioTech", "cd": "美国", "dw": "副", "dj": "1106", "zs": "18", "ms": "这款无线耳机采用最新的蓝牙技术，具有出色的音质" }, { "hwbm": "XYZ456", "hwmc": "无线耳机", "hwpp": "SoundPro", "hwlx": "音频设备", "scs": "AudioTech", "cd": "美国", "dw": "副", "dj": "1095", "zs": "100", "ms": "这款无线耳机采用最新的蓝牙技术，具有出色的音质" }, { "hwbm": "VWX571", "hwmc": "手持游戏机", "hwpp": "GameMaster", "hwlx": "游戏设备", "scs": "GameTech", "cd": "日本", "dw": "个", "dj": "1146", "zs": "58", "ms": "这款手持游戏机可随时随地畅玩游戏" }, { "hwbm": "VWX570", "hwmc": "手持游戏机", "hwpp": "GameMaster", "hwlx": "游戏设备", "scs": "GameTech", "cd": "日本", "dw": "个", "dj": "1135", "zs": "47", "ms": "这款手持游戏机可随时随地畅玩游戏" }, { "hwbm": "VWX569", "hwmc": "手持游戏机", "hwpp": "GameMaster", "hwlx": "游戏设备", "scs": "GameTech", "cd": "日本", "dw": "个", "dj": "1124", "zs": "36", "ms": "这款手持游戏机可随时随地畅玩游戏" }, { "hwbm": "VWX568", "hwmc": "手持游戏机", "hwpp": "GameMaster", "hwlx": "游戏设备", "scs": "GameTech", "cd": "日本", "dw": "个", "dj": "1113", "zs": "25", "ms": "这款手持游戏机可随时随地畅玩游戏" }, { "hwbm": "VWX567", "hwmc": "手持游戏机", "hwpp": "GameMaster", "hwlx": "游戏设备", "scs": "GameTech", "cd": "日本", "dw": "个", "dj": "1102", "zs": "50", "ms": "这款手持游戏机可随时随地畅玩游戏" }, { "hwbm": "STU238", "hwmc": "无线音箱", "hwpp": "SoundPro", "hwlx": "音频设备", "scs": "AudioTech", "cd": "美国", "dw": "台", "dj": "1145", "zs": "57", "ms": "这款无线音箱具有清晰的音质和便携式设计" }, { "hwbm": "STU237", "hwmc": "无线音箱", "hwpp": "SoundPro", "hwlx": "音频设备", "scs": "AudioTech", "cd": "美国", "dw": "台", "dj": "1134", "zs": "46", "ms": "这款无线音箱具有清晰的音质和便携式设计" }, { "hwbm": "STU236", "hwmc": "无线音箱", "hwpp": "SoundPro", "hwlx": "音频设备", "scs": "AudioTech", "cd": "美国", "dw": "台", "dj": "1123", "zs": "35", "ms": "这款无线音箱具有清晰的音质和便携式设计" }, { "hwbm": "STU235", "hwmc": "无线音箱", "hwpp": "SoundPro", "hwlx": "音频设备", "scs": "AudioTech", "cd": "美国", "dw": "台", "dj": "1112", "zs": "24", "ms": "这款无线音箱具有清晰的音质和便携式设计" }, { "hwbm": "STU234", "hwmc": "无线音箱", "hwpp": "SoundPro", "hwlx": "音频设备", "scs": "AudioTech", "cd": "美国", "dw": "台", "dj": "1101", "zs": "60", "ms": "这款无线音箱具有清晰的音质和便携式设计" }, { "hwbm": "PQR905", "hwmc": "游戏机", "hwpp": "GameMaster", "hwlx": "游戏设备", "scs": "GameTech", "cd": "韩国", "dw": "台", "dj": "1144", "zs": "56", "ms": "这款游戏机带来沉浸式的游戏体验和多人游戏功能" }, { "hwbm": "PQR904", "hwmc": "游戏机", "hwpp": "GameMaster", "hwlx": "游戏设备", "scs": "GameTech", "cd": "韩国", "dw": "台", "dj": "1133", "zs": "45", "ms": "这款游戏机带来沉浸式的游戏体验和多人游戏功能" }, { "hwbm": "PQR903", "hwmc": "游戏机", "hwpp": "GameMaster", "hwlx": "游戏设备", "scs": "GameTech", "cd": "韩国", "dw": "台", "dj": "1122", "zs": "34", "ms": "这款游戏机带来沉浸式的游戏体验和多人游戏功能" }, { "hwbm": "PQR902", "hwmc": "游戏机", "hwpp": "GameMaster", "hwlx": "游戏设备", "scs": "GameTech", "cd": "韩国", "dw": "台", "dj": "1111", "zs": "23", "ms": "这款游戏机带来沉浸式的游戏体验和多人游戏功能" }, { "hwbm": "PQR901", "hwmc": "游戏机", "hwpp": "GameMaster", "hwlx": "游戏设备", "scs": "GameTech", "cd": "韩国", "dw": "台", "dj": "1100", "zs": "10", "ms": "这款游戏机带来沉浸式的游戏体验和多人游戏功能" }, { "hwbm": "MNO682", "hwmc": "数码相机", "hwpp": "SnapShot", "hwlx": "摄影设备", "scs": "PixelCo", "cd": "加拿大", "dw": "台", "dj": "1143", "zs": "55", "ms": "这款数码相机拍摄高清照片和精彩视频" }, { "hwbm": "MNO681", "hwmc": "数码相机", "hwpp": "SnapShot", "hwlx": "摄影设备", "scs": "PixelCo", "cd": "加拿大", "dw": "台", "dj": "1132", "zs": "44", "ms": "这款数码相机拍摄高清照片和精彩视频" }, { "hwbm": "MNO680", "hwmc": "数码相机", "hwpp": "SnapShot", "hwlx": "摄影设备", "scs": "PixelCo", "cd": "加拿大", "dw": "台", "dj": "1121", "zs": "33", "ms": "这款数码相机拍摄高清照片和精彩视频" }, { "hwbm": "MNO679", "hwmc": "数码相机", "hwpp": "SnapShot", "hwlx": "摄影设备", "scs": "PixelCo", "cd": "加拿大", "dw": "台", "dj": "1110", "zs": "22", "ms": "这款数码相机拍摄高清照片和精彩视频" }, { "hwbm": "MNO678", "hwmc": "数码相机", "hwpp": "SnapShot", "hwlx": "摄影设备", "scs": "PixelCo", "cd": "加拿大", "dw": "台", "dj": "1099", "zs": "40", "ms": "这款数码相机拍摄高清照片和精彩视频" }, { "hwbm": "JKL349", "hwmc": "8K电视", "hwpp": "VisionPro", "hwlx": "家电", "scs": "VisionTech", "cd": "德国", "dw": "台", "dj": "1142", "zs": "54", "ms": "这款8K电视提供细腻的图像和沉浸式的观影体验" }, { "hwbm": "JKL348", "hwmc": "7K电视", "hwpp": "VisionPro", "hwlx": "家电", "scs": "VisionTech", "cd": "德国", "dw": "台", "dj": "1131", "zs": "43", "ms": "这款7K电视提供细腻的图像和沉浸式的观影体验" }, { "hwbm": "JKL347", "hwmc": "6K电视", "hwpp": "VisionPro", "hwlx": "家电", "scs": "VisionTech", "cd": "德国", "dw": "台", "dj": "1120", "zs": "32", "ms": "这款6K电视提供细腻的图像和沉浸式的观影体验" }, { "hwbm": "JKL346", "hwmc": "5K电视", "hwpp": "VisionPro", "hwlx": "家电", "scs": "VisionTech", "cd": "德国", "dw": "台", "dj": "1109", "zs": "21", "ms": "这款5K电视提供细腻的图像和沉浸式的观影体验" }, { "hwbm": "JKL345", "hwmc": "4K电视", "hwpp": "VisionPro", "hwlx": "家电", "scs": "VisionTech", "cd": "德国", "dw": "台", "dj": "1098", "zs": "20", "ms": "这款4K电视提供细腻的图像和沉浸式的观影体验" }, { "hwbm": "GHI016", "hwmc": "智能手环", "hwpp": "FitTech", "hwlx": "电子设备", "scs": "FitCo", "cd": "日本", "dw": "个", "dj": "1141", "zs": "53", "ms": "这款智能手环记录你的健身数据和睡眠质量" }, { "hwbm": "GHI015", "hwmc": "智能手环", "hwpp": "FitTech", "hwlx": "电子设备", "scs": "FitCo", "cd": "日本", "dw": "个", "dj": "1130", "zs": "42", "ms": "这款智能手环记录你的健身数据和睡眠质量" }, { "hwbm": "GHI014", "hwmc": "智能手环", "hwpp": "FitTech", "hwlx": "电子设备", "scs": "FitCo", "cd": "日本", "dw": "个", "dj": "1119", "zs": "31", "ms": "这款智能手环记录你的健身数据和睡眠质量" }, { "hwbm": "GHI013", "hwmc": "智能手环", "hwpp": "FitTech", "hwlx": "电子设备", "scs": "FitCo", "cd": "日本", "dw": "个", "dj": "1108", "zs": "20", "ms": "这款智能手环记录你的健身数据和睡眠质量" }, { "hwbm": "GHI012", "hwmc": "智能手环", "hwpp": "FitTech", "hwlx": "电子设备", "scs": "FitCo", "cd": "日本", "dw": "个", "dj": "1097", "zs": "80", "ms": "这款智能手环记录你的健身数据和睡眠质量" }, { "hwbm": "DEF794", "hwmc": "平板电脑", "hwpp": "TabTech", "hwlx": "电子设备", "scs": "TechGlobe", "cd": "韩国", "dw": "台", "dj": "1151", "zs": "63", "ms": "这款平板电脑配备了强大的处理器和高分辨率显示屏" }, { "hwbm": "DEF793", "hwmc": "平板电脑", "hwpp": "TabTech", "hwlx": "电子设备", "scs": "TechGlobe", "cd": "韩国", "dw": "台", "dj": "1140", "zs": "52", "ms": "这款平板电脑配备了强大的处理器和高分辨率显示屏" }, { "hwbm": "DEF792", "hwmc": "平板电脑", "hwpp": "TabTech", "hwlx": "电子设备", "scs": "TechGlobe", "cd": "韩国", "dw": "台", "dj": "1129", "zs": "41", "ms": "这款平板电脑配备了强大的处理器和高分辨率显示屏" }, { "hwbm": "DEF791", "hwmc": "平板电脑", "hwpp": "TabTech", "hwlx": "电子设备", "scs": "TechGlobe", "cd": "韩国", "dw": "台", "dj": "1118", "zs": "30", "ms": "这款平板电脑配备了强大的处理器和高分辨率显示屏" }, { "hwbm": "DEF790", "hwmc": "平板电脑", "hwpp": "TabTech", "hwlx": "电子设备", "scs": "TechGlobe", "cd": "韩国", "dw": "台", "dj": "1107", "zs": "19", "ms": "这款平板电脑配备了强大的处理器和高分辨率显示屏" }, { "hwbm": "DEF789", "hwmc": "平板电脑", "hwpp": "TabTech", "hwlx": "电子设备", "scs": "TechGlobe", "cd": "韩国", "dw": "台", "dj": "1096", "zs": "30", "ms": "这款平板电脑配备了强大的处理器和高分辨率显示屏" }, { "hwbm": "ABC128", "hwmc": "智能手表", "hwpp": "TechMaster", "hwlx": "电子设备", "scs": "TechCo", "cd": "中国", "dw": "件", "dj": "1149", "zs": "61", "ms": "这款智能手表配备了先进的健康监测功能和智能通知提醒" }, { "hwbm": "ABC127", "hwmc": "智能手表", "hwpp": "TechMaster", "hwlx": "电子设备", "scs": "TechCo", "cd": "中国", "dw": "件", "dj": "1138", "zs": "50", "ms": "这款智能手表配备了先进的健康监测功能和智能通知提醒" }, { "hwbm": "ABC126", "hwmc": "智能手表", "hwpp": "TechMaster", "hwlx": "电子设备", "scs": "TechCo", "cd": "中国", "dw": "件", "dj": "1127", "zs": "39", "ms": "这款智能手表配备了先进的健康监测功能和智能通知提醒" }, { "hwbm": "ABC125", "hwmc": "智能手表", "hwpp": "TechMaster", "hwlx": "电子设备", "scs": "TechCo", "cd": "中国", "dw": "件", "dj": "1116", "zs": "28", "ms": "这款智能手表配备了先进的健康监测功能和智能通知提醒" }, { "hwbm": "ABC124", "hwmc": "智能手表", "hwpp": "TechMaster", "hwlx": "电子设备", "scs": "TechCo", "cd": "中国", "dw": "件", "dj": "1105", "zs": "17", "ms": "这款智能手表配备了先进的健康监测功能和智能通知提醒" }, { "hwbm": "ABC123", "hwmc": "智能手表", "hwpp": "TechMaster", "hwlx": "电子设备", "scs": "TechCo", "cd": "中国", "dw": "件", "dj": "1094", "zs": "50", "ms": "这款智能手表配备了先进的健康监测功能和智能通知提醒" }]



</script>