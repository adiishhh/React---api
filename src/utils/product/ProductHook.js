import { useMutation } from "@tanstack/react-query"
import { createProduct, deleteProduct, updateProduct } from "./ProductApi"

export const useCreateProduct = () =>{
    return useMutation({
        mutationFn:createProduct
    })
}
export const useUpdateProduct = () =>{
    return useMutation({
        mutationFn:({data,id}) => updateProduct(data,id)
    })
}
export const useDeleteProduct = () =>{
    return useMutation({
        mutationFn:deleteProduct
    })
}