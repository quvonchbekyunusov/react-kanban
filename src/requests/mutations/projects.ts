import { request } from '../../utils/request'

export const createProject = async (data: any) => {
    const response = await request({
        url: 'projects',
        data: data,
        method: 'POST',
    })
    return response.data
}

export const deleteProject = async (id: number) => {
    const response = await request({
        url: 'projects/' + id,
        method: 'DELETE',
    })
    return response.data
}
export const editProject = async (data: any) => {
    const response = await request({
        url: 'projects/' + data.id,
        method: 'PUT',
        data: data,
    })
    return response.data
}
