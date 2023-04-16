import { request } from "../../utils/request"

export const getUsers =async (params:any) => {
    const response  = await request({
        url: '/users',
        params: params
    })

    return response.data
}