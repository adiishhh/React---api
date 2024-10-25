import { apiClient } from "../api/api"


export const getCustomer =()=>{
    return apiClient.get('customers')
}

export const createCustomer = (data) =>{
    return apiClient.post('customers/', data)
}
export const updateCustomer = (data,id) =>{
    return apiClient.put(`customers/${id}/`, data)
}
export const deleteCustomer = (id) =>{
    return apiClient.delete(`customers/${id}/`)
}