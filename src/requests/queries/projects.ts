import { request } from "../../utils/request"

export const getProjects =async (params:any) => {
    const response = await request({
        url: '/projects',
        params: params
    })

    return response.data
}

export const getProject =async (id:number) => {
    const response = await request({
        url: '/projects/'+id,
    })

    return response.data
}