import { apiClient } from "../api/api"

export const getPurchase =()=>{
    return apiClient.get('purchases')
}
export const createPurchase =(data)=>{
    return apiClient.post('purchases/', data)
}
export const updatePurchase =(data, id)=>{
    return apiClient.put(`purchases/${id}/`,data)
}
export const deletePurchase =(id)=>{
    return apiClient.delete(`purchases/${id}/`)
}
