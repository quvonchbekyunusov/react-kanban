import { request } from '../../utils/request'

export const getTasks = async (params: any) => {
    const response = await request({
        url: '/tasks',
        params: params,
    })

    return response.data
}

export const getTask = async (id: number) => {
    const response = await request({
        url: '/tasks/' + id,
    })

    return response.data
}
