import { apiClient } from "../api/api"

export const getSales =()=>{
    return apiClient.get('apisales')
}
export const createSales =(data)=>{
    return apiClient.post('apisales/', data)
}
export const updateSales =(data, id)=>{
    return apiClient.put(`apisales/${id}/`,data)
}
export const deleteSales =(id)=>{
    return apiClient.delete(`apisales/${id}/`)
}