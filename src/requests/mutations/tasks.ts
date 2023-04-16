import { request } from '../../utils/request'

export const createTask = async (data: any) => {
    const response = await request({
        url: 'tasks',
        data: data,
        method: 'POST',
    })
    return response.data
}

export const deleteTask = async (id: number) => {
    const response = await request({
        url: 'tasks/' + id,
        method: 'DELETE',
    })
    return response.data
}
export const editTask = async (data: any) => {
    const response = await request({
        url: 'tasks/' + data.id,
        method: 'PUT',
        data: data,
    })
    return response.data
}
