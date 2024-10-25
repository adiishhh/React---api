import { apiClient } from "../api/api"



export const getEmployee =()=>{
    return apiClient.get('employees')
}
export const createEmployee =(data)=>{
    return apiClient.post('employees/', data)
}
export const updateEmployee =(data, id)=>{
    return apiClient.put(`employees/${id}/`,data)
}
export const deleteEmployee =(id)=>{
    return apiClient.delete(`employees/${id}/`)
}
