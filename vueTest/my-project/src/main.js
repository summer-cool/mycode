// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from "vue-router";
import VueResource from 'vue-resource'
//开启debug模式
Vue.config.debug = true;
Vue.use(VueResource);
Vue.use(VueRouter);
import newCompent from 'components/newCompent'
import twoCompent from 'components/twoCompent'
// 创建一个路由器实例
// 并且配置路由规则
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/first',
      component: newCompent
    },
    {
      path: '/second',
      component: twoCompent
    }
  ]
})
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<App/>',
    router: router,
    render: h => h(App),
    components:{
        App
    }
})