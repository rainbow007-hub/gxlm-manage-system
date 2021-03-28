import request from '../utils/request';

// 插入大学生信息
export const insertStudent = (data) => {
    return request.post("/student/insert", data)
}

// 查找所有大学生
export const listAllStudents = () => {
    return request.get("/student/selectAll")
}

// 通过Id查找学生信息:尚未简单测试
export const getStudentById = (studentId) => {
    return request.get("/student/selectById", {
        params: {
            studentId: studentId 
        }
    })
}

// 修改信誉姓名联系方式
export const updateAll = (data) => {
    return request.post("/student/updateAll",data)
}