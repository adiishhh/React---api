import { useMutation } from "@tanstack/react-query"
import { createEmployee, deleteEmployee, updateEmployee } from "./EmployeeApi"



export const useCreateEmployee = () =>{
    return useMutation({
        mutationFn:createEmployee
    })
}
export const useUpdateEmployee = () =>{
    return useMutation({
        mutationFn:({data,id}) => updateEmployee(data,id)
    })
}
export const useDeleteEmployee = () =>{
    return useMutation({
        mutationFn:deleteEmployee
    })
}