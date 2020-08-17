let routers = []
routers.push({
    path: '/test',
    name: 'test',
    component: r => require.ensure([], () => r(require('./components/HelloWorld.vue')))
})
export default routers
