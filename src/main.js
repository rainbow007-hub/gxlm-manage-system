import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
import axios from 'axios';

// 挂载到vue原型链上
Vue.prototype.axios = axios;

Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | 家教管理系统`;
    const token = localStorage.getItem('token');
    // token不存在表示还未登录
    if (!token && to.path !== '/login') {
        next('/login');
    } else {
        next();
    }
});

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');
