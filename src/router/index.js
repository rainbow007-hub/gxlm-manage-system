import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/order'
        },
        {
            path: '/',
            component: () => import('../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/order',
                    component: () => import('../components/page/OrderTable.vue'),
                    meta: { title: '订单管理' }
                },
                {
                    path: '/student',
                    component: () => import('../components/page/StudentTable.vue'),
                    meta: { title: '学生管理' }
                },
                {
                    path: '/parent',
                    component: () => import('../components/page/ParentTable.vue'),
                    meta: { title: '家长管理' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import('../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
