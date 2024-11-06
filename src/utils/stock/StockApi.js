import { apiClient } from "../api/api"

export const getStock =()=>{
    return apiClient.get('stocks')
}
export const createStock =(data)=>{
    return apiClient.post('stocks/', data)
}
export const updateStock =(data, id)=>{
    return apiClient.put(`stocks/${id}/`,data)
}
export const deleteStock =(id)=>{
    return apiClient.delete(`stocks/${id}/`)
}
