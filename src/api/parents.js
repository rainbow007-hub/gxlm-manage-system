import request from '../utils/request';

// 插入家长信息
export const insertParent = (data) => {
    return request.post("/parent/insert", data)
}

// 查找所有家长
export const listAllParents = () => {
    return request.get("/parent/selectAll")
}

// 通过Id查找学生信息:尚未简单测试
export const getParentById = (parentsId) => {
    return request.get("/parent/selectById", {
        params: {
            parentsId: parentsId 
        }
    })
}

// 修改信誉姓名联系方式
export const updateAll = (data) => {
    return request.post("/parent/update",data)
}