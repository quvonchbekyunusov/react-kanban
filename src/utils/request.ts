import axios from "axios"

const API_URL = "http://localhost:3001/"

const client = axios.create({ baseURL: API_URL })
export const request = ({ ...options }) => {
//   let auth = localStorage.getItem("accessToken")
//     ? `Bearer ${localStorage.getItem("accessToken")}`
//     : ""
//   client.defaults.headers.common.Authorization = auth
  client.defaults.headers.common.Accept = "multipart/form-data"

  const onSuccess = (response: any) => {
    return response
  }
  const onError = (error: any) => {
    return Promise.reject(error)
  }
  return client(options).then(onSuccess).catch(onError)
}