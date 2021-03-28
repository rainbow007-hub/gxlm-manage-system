import axios from 'axios';
import { Message } from 'element-ui';
import Router from '../router/index'

// 创建axios实例
const service = axios.create({
    /** 
     * 需要将项目部署到服务器时，在执行npm run build命令前，需要将改行取消注释,
     * 以让页面以正确的前缀请求后端服务器。
    */
    // baseURL:"https://47.107.117.59:3000",
    timeout: 5000,
    responseType: "json",
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    }
});

// 设置请求拦截器
service.interceptors.request.use(
    config => {
        // 如果localStorage中储存有token则给token添加前缀并指定Authorization头信息，否则不增加Authorization头信息
        // 注意：staff进行登录操作时，如果传递的Authorization头信息无效将无法进行正常的登录
        const token = localStorage.getItem('token')
        if(token){
            config.headers.Authorization ='Bearer ' + token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 设置响应拦截器
service.interceptors.response.use(
    response => {
        // 根据服务器返回数据的不同状态码进行处理
        switch (response.data.status){
            // 状态码为200：直接返回后端响应的数据
            case 200: {
                return Promise.resolve(response.data);
            }
            case 500: {
                switch(response.data.message){
                    /**
                     * token无效或过期
                     * 在需要通过token获取后端数据的页面中，由于token过期等，将跳转到登录页面进行重新登录
                     */
                    case 'token无效': {
                        Message.error('密码无效或过期');
                        Router.push('/login');
                        break;
                    }
                }
            }
        }
        return Promise.reject(response.data);
    },
    error => {
        // token失效
        if(error.response.status == 403){
            Message.error('密码无效或过期');
            Router.push('/login');
            return;
        }
        return Promise.reject(error);
    }
);

export default service;
