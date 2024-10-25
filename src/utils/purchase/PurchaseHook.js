import { useMutation } from "@tanstack/react-query"
import { createPurchase, deletePurchase, updatePurchase } from "./PurchaseApi"

export const useCreatePurchase = () =>{
    return useMutation({
        mutationFn:createPurchase
    })
}
export const useUpdatePurchase = () =>{
    return useMutation({
        mutationFn:({data,id}) => updatePurchase(data,id)
    })
}
export const useDeletePurchase = () =>{
    return useMutation({
        mutationFn:deletePurchase
    })
}