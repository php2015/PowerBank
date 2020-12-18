import axios from '@/utils/request'
export const aa = (params) => {
    return axios.request({
        url: '',
        method: 'get',
        params
    })
}