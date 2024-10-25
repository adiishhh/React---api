import { apiClient } from "../api/api"

export const getVendor = () => {
    return apiClient.get('vendors')
}
export const createVendor = (data) =>{
    return apiClient.post('vendors/', data)
}
export const updateVendor = (data,id) =>{
    return apiClient.put(`vendors/${id}/`, data)
}
export const deleteVendor = (id) =>{
    return apiClient.delete(`vendors/${id}/`)
}