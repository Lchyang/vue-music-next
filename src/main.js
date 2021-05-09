import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/scss/index.scss'
import lazyPlugin from 'vue3-lazy'

const app = createApp(App)
app.use(store).use(router)
app.use(lazyPlugin, {
    loading: require('@/assets/images/default.png')
})
app.mount('#app')
