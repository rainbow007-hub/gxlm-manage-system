import request from '../utils/request';

// 客服登录
export const staffLogin = (account, password) => {
    return request.post("/staff/login", null, {
        params: {
            account: account,
            password: password
        }
    })
}