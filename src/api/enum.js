import request from '../utils/request';

var token = localStorage.getItem('token');

// 获取区域枚举值列表
export const getAreaList = () => {
    return request.get('/enum/getAreaList',{
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
}

// 获取科目枚举值列表
export const getCourseList = () => {
    return request.get('/enum/getClassList',{
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

// 获取年级枚举值列表
export const getGradeList = () => {
    return request.get('/enum/getGradeList',{
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}