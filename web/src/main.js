import { createApp } from 'vue'
import './reset.css'
import App from './App.vue'

// 整体导入elementplus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 导入elementicons
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 导入pinia
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'

// 导入 vue-router
import router from './router/index'


const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersist)

app.use(pinia);
app.use(router);
app.use(ElementPlus)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')
