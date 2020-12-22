import axios from '@/utils/request'
export const aa = (params) => {
    return axios.request({
        url: '',
        method: 'get',
        params
    })
}
export const orderadd = (data) => {
    return axios.request({
        url: '/v1/app/order/add',
        method: 'post',
        data
    })
}