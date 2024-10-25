import { useMutation } from "@tanstack/react-query"
import { createVendor, deleteVendor, updateVendor } from "./VendorApi"

export const useCreateVendor = () =>{
    return useMutation({
        mutationFn:createVendor
    })
}
export const useUpdateVendor = () =>{
    return useMutation({
        mutationFn:({data,id}) => updateVendor(data,id)
    })
}
export const useDeleteVendor = () =>{
    return useMutation({
        mutationFn:deleteVendor
    })
}