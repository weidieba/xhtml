// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import ConfigRouter from './router.config'
import Xhtml from '../packages'
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Xhtml)
const router = new VueRouter(ConfigRouter)
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
})
