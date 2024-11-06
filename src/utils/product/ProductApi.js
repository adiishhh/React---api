import { apiClient } from "../api/api"

export const getProduct =()=>{
    return apiClient.get('products')
}
export const createProduct =(data)=>{
    return apiClient.post('products/', data)
}
export const updateProduct =(data, id)=>{
    return apiClient.put(`products/${id}/`,data)
}
export const deleteProduct =(id)=>{
    return apiClient.delete(`products/${id}/`)
}
