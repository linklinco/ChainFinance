import { defineStore } from 'pinia'
import axios from 'axios';

// 第一个参数是应用程序中 store 的唯一 id
export const useBankStore = defineStore('bank', {
    // 其它配置项
    state: () => {
        return {
            warehouse: [],
            goods: [],
            applys: []
        };
    },
    getters: {
        getTotal: (state) => {
            return state.goods.filter(item => {
                return (item.status == '申请入库中' || item.status == '待入库')
            })
        },
        getOut: (state) => {
            return state.goods.filter(item => {
                return (item.status == '申请出库中' || item.status == '待出库')
            })
        },
        getGoods: (state) => {
            return state.goods.filter(item => {
                return (item.status == '已入库')
            })
        },
        getGen: (state) => {
            return state.goods.filter(item => {
                return (item.status == '待生成仓单' || item.status == '已生成仓单')
            })
        },
    },
    actions: {
        remove(username) {

        }
    },
    persist: {
        enabled: true,
    }
})