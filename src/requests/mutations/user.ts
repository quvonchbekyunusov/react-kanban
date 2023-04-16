import { request } from "../../utils/request"

  export const signup = async(data: any) => {
        const response = await request({
            url: "users",
            data: data,
            method: 'POST',
        })
        return response.data
    }