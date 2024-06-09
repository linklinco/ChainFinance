import { defineStore } from 'pinia'
import axios from 'axios';

// 第一个参数是应用程序中 store 的唯一 id
export const useUsersStore = defineStore('demander', {
    // 其它配置项
    state: () => {
        return {
            goods: [],
            user: {}
        };
    },
    getters: {
        getTotal: (state) => {
            return state.goods.filter(item => {
                return (item.status == '登记成功' || item.status == '申请入库中' || item.status == '待入库' || item.status == '拒绝入库')
            })
        },
        getOut: (state) => {
            return state.goods.filter(item => {
                return (item.status == '已入库' || item.status == '申请出库中')
            })
        },
        genGen: (state) => {
            return state.goods.filter(item => {
                return (item.status == '已入库' || item.status == '待生成仓单' || item.status == '已生成仓单')
            })
        }, genCD: (state) => {
            return state.goods.filter(item => {
                return (item.status == '已生成仓单')
            })
        },
        actions: {
            getAddr(username) {

            }
        },
        persist: {
            enabled: true,
        }
    }
})