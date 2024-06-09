<style>
.biaoti {
    font-family: 微软雅黑;
    font-weight: bold;
    color: #255e95;
    text-align: center;
    letter-spacing: 0.1em;
}

.cd-header {

    text-align: center;
    position: relative;
    line-height: 42px;
}

.cd-main {
    border: 2px solid black;
    font-size: 14px;
}

.cd-main td {
    padding: 20px;
}

.cd-main th {
    padding: 8px;
}
</style>

<script setup>

import printJS from "print-js";
const props = defineProps({
    infos: {}
})

function handlePrint() {
    printJS({
        // 要打印的html的节点id
        printable: "printView",
        // 打印类型 html
        type: "html",
        // 继承样式
        targetStyle: '*',
        targetStyles: '*',
        scanStyles: true,
        // 默认800，设置1000是因为我窗口宽度是1000，而导致页面靠近左边，设置1000就正常居中了。
        // maxWidth: "700"
    })
    // console.log(2)
} 
</script>
<template>
    <el-button @click="handlePrint">打印</el-button>
    <div id="printView" style="width: 700px;">
        <div class="cd-header"><span class="biaoti" style="font-size: 30px;">链金通电子仓单</span>
        </div>
        <table width="100%" border="0" cellspacing="0" cellpadding="15" align="center">
            <tr>
                <td style="font-size: 12px;">电子仓单编号：</td>
                <td align="right" height="25" style="font-size: 12px;">签发日期：2024年8月24日</td>
            </tr>
        </table>
        <table border="1" class="cd-main">
            <tr>
                <th rowspan="3" style="writing-mode: vertical-rl;letter-spacing: 1em;">
                    存货人
                </th>
                <th>名称</th>
                <td colspan="3">江西XXX有限公司</td>
                <th rowspan="3" style="writing-mode: vertical-rl;letter-spacing: 1em;">
                    保管人
                </th>
                <th>名称</th>
                <td colspan="3">河北得到有限公司</td>
            </tr>
            <tr>
                <th>注册地址</th>
                <td colspan="3">江西省南昌市</td>
                <th>注册地址</th>
                <td colspan="3">河北省石家庄市</td>
            </tr>
            <tr>

                <th>联系电话</th>
                <td colspan="3">16683674323</td>
                <th>联系电话</th>
                <td colspan="3">16683674323</td>
            </tr>
            <tr>
                <td colspan="9" style="text-indent:2em;font-size:12px">
                    某某公司于某年某月某日接受某某公司关于某某商品的入库请求，商品符合国家标准。
                </td>
            </tr>
            <tr>
                <th rowspan="3" style="writing-mode: vertical-rl;letter-spacing: 1em;">货物信息</th>
                <th>商品名称</th>
                <td colspan="3">打印机</td>
                <th>商品类型</th>
                <td>办公设备</td>
                <th>商品品牌</th>
                <td>联想</td>
            </tr>
            <tr>
                <th>生产商</th>
                <td>马来西亚黑茶有限公司</td>
                <th>数量</th>
                <td>88888</td>
                <th>单位</th>
                <td>吨</td>
                <th>出厂价</th>
                <td>99.89</td>
            </tr>
            <tr>
                <th>详细描述</th>
                <td colspan="3">牛逼打印机</td>
                <th>区块链地址</th>
                <td colspan="3" style="max-width: 150px;word-break:break-all;">0x56acefb2781f6b1eb2161737d40b411c6b4b6445
                </td>
            </tr>
            <tr>
                <td colspan="9" style="text-indent:2em;font-size:12px">
                    货主信息以区块链地址记录为准，存货人和保管人一致保证以上货物信息正确无误，如出现货物信息与实际不符的情况，存货人和保管人将共同承担相应的法律责任。
                </td>
            </tr>
            <tr>
                <th rowspan="2" style="writing-mode: vertical-rl;letter-spacing: 1em;">仓库信息</th>
                <th>仓库名称</th>
                <td colspan="3">某某仓库</td>
                <th>仓库等级</th>
                <td>某某仓库</td>
                <th>联系方式</th>
                <td>某某仓库</td>
            </tr>
            <tr>
                <th>仓库地址</th>
                <td colspan="8">湖北省江西市</td>
            </tr>
            <tr>
                <td colspan="8" style="text-indent:2em;font-size:12px">
                    说明:存货人承诺货物真实有效，保管人对货物进行管理。本电子仓单是提货的唯一凭证，仅当仓单信息与区块链信息一致时才能进行提货，其它任何单据不得作为有效提货凭证。
                </td>
                <td style="padding: 3px;">
                    <img src="../../assets/images/qr.png" alt="" width="100%">
                </td>
            </tr>
        </table>
    </div>
</template>
