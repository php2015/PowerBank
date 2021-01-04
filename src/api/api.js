import axios from '@/utils/request'
// 查询订单
export const getReturn = (params) => {
    return axios.request({
        url: `v1/app/order/getOrder/${params.openId}/${params.rentFlag}`,
        method: 'get'
    })
}
// 添加订单
export const orderadd = (data) => {
    return axios.request({
        url: 'v1/app/order/add',
        method: 'post',
        data
    })
}
// 上传图片
export const uploadImg = (data) => {
    return axios.request({
        url: 'v1/wxapp/file/upload',
        method: 'post',
        data
    })
}
// 错误信息提交
export const faultReport = (data) => {
    return axios.request({
        url: 'v1/api/exception/add',
        method: 'post',
        data
    })
}
// 查询客户
export const depositRefund = (params) => {
    return axios.request({
        url: `v1/app/customer/getCustomer/${params.openId}`,
        method: 'get'
    })
}

// 获取支付时的明文和签名
export const getPayAutograph = (params) => {
    return axios.request({
        url: 'v1/app/pay/getPayInfo',
        method: 'get',
        params
    })
}
// 申请退款
export const applyRefund = (params) => {
    return axios.request({
        url: `v1/app/pay/refund/${params.openId}`,
        method: 'post',
    })
}
