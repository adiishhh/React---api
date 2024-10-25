import { apiClient } from "../api/api"

export const getCategory =()=>{
    return apiClient.get('categories')
}
export const createCategory = (data) =>{
    return apiClient.post('categories/', data)
}
export const updateCategory = (data,id) =>{
    return apiClient.put(`categories/${id}/`, data)
}
export const deleteCategory = (id) =>{
    return apiClient.delete(`categories/${id}/`)
}