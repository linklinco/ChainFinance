import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue"
import Login from "@/views/Login.vue"
const routes = [
    {
        path: '/',
        component: Home,
        children: [
            {
                path: 'admin',
                component: () => import('../views/Admin/Hello.vue'),
                // children: [

                // ]
            }, {
                path: 'userAdmin',
                component: () => import('../views/Admin/UserAdmin.vue')
            }, {
                path: 'account',
                component: () => import('../views/Account.vue')
            }
        ]
    }, {
        path: '/logistic',
        component: Home,
        children: [{
            path: 'warehouse',
            name: 'warehouse',
            component: () => import('../views/Logistic/Warehouse.vue')
        }, {
            path: 'entry',
            component: () => import('../views/Logistic/Entry.vue')
        }, {
            path: 'outbound',
            component: () => import('../views/Logistic/Outbound.vue')
        }, {
            path: 'genReceipt',
            component: () => import('../views/Logistic/GenReceipt.vue')
        }, {
            path: 'tranReceipt',
            component: () => import('../views/Logistic/TranReceipt.vue')
        }, {
            path: 'wmanage',
            component: () => import('../views/Logistic/Wmanage.vue')
        }
        ]
    }, {
        path: '/bank',
        component: Home,
        children: [{
            path: 'showreceipt',
            component: () => import('../views/Bank/ShowReceipt.vue')
        }, {
            path: 'freeze',
            component: () => import('../views/Bank/Freeze.vue')
        }, {
            path: 'thaw',
            component: () => import('../views/Bank/Thaw.vue')
        }, {
            path: 'passwarehouse',
            component: () => import('../views/Bank/PassWarehouse.vue')
        }, {
            path: 'loans',
            component: () => import('../views/Bank/Loans.vue')
        }, {
            path: 'afterloan',
            component: () => import('../views/Bank/AfterLoan.vue')
        }]
    }, {
        path: '/demander',
        component: Home,
        children: [
            {
                path: 'goods',
                component: () => import('../views/Demander/Goods.vue')
            }, {
                path: 'entry',
                component: () => import('../views/Demander/Entry.vue')
            }, {
                path: 'outbound',
                component: () => import('../views/Demander/Outbound.vue')
            }, {
                path: 'receipt',
                component: () => import('../views/Demander/Receipt.vue')
            }, {
                path: 'change',
                component: () => import('../views/Demander/Change.vue')
            }, {
                path: 'getloan',
                component: () => import('../views/Demander/GetLoan.vue')
            }, {
                path: 'Repay',
                component: () => import('../views/Demander/Repay.vue')
            }

        ]
    },
    {
        path: '/login',
        component: Login
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

// 为路由对象添加路由导航守卫
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {  //  如果用户访问的是登录页面 直接放行
        return next();
    }

    let token = window.localStorage.getItem('token');  //  从LocalStorage中得到token
    // console.log(token)
    // const tokenStartTime = window.localStorage.getItem('tokenStartTime');  //   获取存储token的开始时间

    // const timeOver = 2 * 3600 * 1000;  // 定义2个小时过期，让用户重新登录一下
    // let date = new Date().getTime();  //  当前时间
    // if (date - tokenStartTime > timeOver) {  //  如果大于说明是token过期了
    //     token = null;
    //     window.localStorage.removeItem("token");
    //     window.localStorage.removeItem("tokenStartTime");
    // }

    // 如果没有token值 那么就跳转到'/login
    if (!token) {
        if (to.path == '/login') {
            return next();
        }
        // Message({
        //     message: '登录状态过期，请重新登录',
        //     type: 'warning'
        // });
        return next('/login');
    }

    // 如果有token则放行
    next();
})

export default router;