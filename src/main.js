import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/scss/index.scss'
import lazyPlugin from 'vue3-lazy'
import loadingDirective from '@/components/base/loading/directive'
import noResultDirective from '@/components/base/no-result/directive'

const app = createApp(App)
app.use(store).use(router).directive('loading', loadingDirective).directive('no-result', noResultDirective)
app.use(lazyPlugin, {
    loading: require('@/assets/images/default.png')
})
app.mount('#app')
