import axios from '@/utils/request'
// 查询最后一笔订单
export const getLastOrder = (params) => {
    return axios.request({
        url: `charge/v1/app/order/getFinalOrder/${params.openId}`,
        method: 'get'
    })
}
// 查询订单
export const getReturn = (params) => {
    return axios.request({
        url: `charge/v1/app/order/getOrder/${params.openId}/${params.rentFlag}`,
        method: 'get'
    })
}
// 添加订单
export const orderadd = (data) => {
    return axios.request({
        url: 'charge/v1/app/order/addOrder',
        method: 'post',
        data
    })
}
// // 添加订单
// export const orderadd = (data) => {
//     return axios.request({
//         url: 'v1/app/order/add',
//         method: 'post',
//         data
//     })
// }
// 上传图片
export const uploadImg = (data) => {
    return axios.request({
        url: 'charge/v1/wxapp/file/upload',
        method: 'post',
        data
    })
}
// 错误信息提交
export const faultReport = (data) => {
    return axios.request({
        url: 'charge/v1/api/exception/add',
        method: 'post',
        data
    })
}
// 查询客户
export const depositRefund = (params) => {
    return axios.request({
        url: `charge/v1/app/customer/getCustomer/${params.openId}`,
        method: 'get'
    })
}
// 查询客户
export const updateOrderAndCusStatus = (data) => {
    return axios.request({
        url: "charge/v1/app/order/updateOrderAndCusStatus",
        data: { openId: data },
        method: 'put'
    })
}
// 查询协议价格
export const getPrice = (params) => {
    return axios.request({
        url: `charge//v1/app/price/${params}`,
        method: 'get'
    })
}
// 查询客户
export const singleQuery = (params) => {
    return axios.request({
        url: `charge/v1/app/pay/singleQuery/${params.orderId}`,
        method: 'get'
    })
}

// 获取支付时的明文和签名
export const getPayAutograph = (params) => {
    return axios.request({
        url: 'charge/v1/app/pay/getPayInfoV2',
        method: 'get',
        params
    })
}
/* // 获取支付时的明文和签名
export const getPayAutograph = (params) => {
    return axios.request({
        url: 'v1/app/pay/getPayInfo',
        method: 'get',
        params
    })
} */
// 申请退款
export const applyRefund = (params) => {
    return axios.request({
        url: `charge/v1/app/pay/refund/${params.openId}`,
        method: 'post',
    })
}
// 支付租金
export const payRent = (data) => {
    return axios.request({
        url: 'http://epay1.zj96596.com.cn/paygate/main',
        method: 'post',
        data
    })
}