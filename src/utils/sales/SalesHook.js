import { useMutation } from "@tanstack/react-query"
import { createSales, deleteSales, updateSales } from "./SalesApi"

export const useCreateSales = () =>{
    return useMutation({
        mutationFn:createSales
    })
}
export const useUpdateSales = () =>{
    return useMutation({
        mutationFn:({data,id}) => updateSales(data,id)
    })
}
export const useDeleteSales = () =>{
    return useMutation({
        mutationFn:deleteSales
    })
}