let routers = []
routers.push({
    path: '/test',
    name: 'test',
    component: r => require.ensure([], () => r(require('./docs/test.md')))
})
export default routers
