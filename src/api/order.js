import request from '../utils/request';

// 更新订单的完成时间
export const setFinishTimeByOrderId = (orderId,finishTime) => {
    return request.post("/order/finishTime", null, {
        params:{
            orderId:orderId,
            finishTime:finishTime
        }
    })
}

// 新建订单
export const insertOrder = (data) => {
    return request.post("/order/insert", data)
}

// 查询全部订单
export const listAllOrders = () => {
    return request.get("/order/selectAll")
}

// 查询所有未被接单的订单
export const listAllNoUseOrders = () => {
    return request.get("/order/selectAllNoUseOrder")
}

// 通过Id查询订单
export const getOrderById = (orderId) => {
    return request.get("/order/selectById", {
        params:{
            orderId:orderId
        }
    })
}

// 客服接单
export const staffTake = (orderId) => {
    return request.post("/order/staffTake", null, {
        params:{
            orderId:orderId
        }
    })
}

// 学生接单
export const studentTake = (orderId,studentId) => {
    return request.post("/order/studentTake", null, {
        params:{
            orderId:orderId,
            studentId:studentId
        }
    })
}

// 修改订单全部信息
export const updateAll = (order) => {
    return request.post('/order/updateAll',order);
}

// 修改订单状态
export const updateState = (orderId,state) => {
    return request.post("/order/updateState", null, {
        params:{
            orderId:orderId,
            state:state
        }
    })
}
