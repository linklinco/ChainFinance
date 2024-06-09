import { defineStore } from 'pinia'

import axios from 'axios';

// 第一个参数是应用程序中 store 的唯一 id
export const useInfoStore = defineStore('users', {
    // 其它配置项
    state: () => {
        return {
            name: "",
            companyname: "",
            hash: '',
            addr: "",
            email: "",
            man: "",
            phone: "",
            type: -1,
            items: [],
            currentPage: 1,
            pageSize: 10,
        };
    },
    getters: {
        getTotal: (state) => {
            return state.items.length;
        },
        getRegister: (state) => {
            return state.items.filter(item => {
                return item.state == '注册'
            })
        },
        getShows: (state) => {
            return state.getRegister.slice((state.currentPage - 1) * state.pageSize, state.currentPage * state.pageSize);
        }
    },
    actions: {
        remove(username) {
            axios.post('/api/delectUser', {
                token: localStorage.getItem('token'),
                username
            })
            this.items = this.items.filter(item => {
                return item.username !== username
            })
        },
        pass(username) {
            axios.post('/api/changeUsers', {
                token: localStorage.getItem('token'),
                state: "正常",
                username
            })
            this.items.forEach(e => {
                if (e.username === username) {
                    e.state = "正常"
                }
            })
        }
    },
    persist: {
        enabled: true,
    }
})