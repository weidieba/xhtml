// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import ConfigRouter from './router.config'
import demoBlock from './components/demo-block.vue'
import Xhtml from '../packages'
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Xhtml)
Vue.component('demo-block', demoBlock)
const router = new VueRouter({routes: ConfigRouter})
/* eslint-disable no-new */
new Vue({
    render (h) {
        return h(App)
    },
    router
}).$mount('#app')
