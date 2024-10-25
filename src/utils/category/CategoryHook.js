import { useMutation } from "@tanstack/react-query";
import { createCategory, deleteCategory, updateCategory } from "./CategoryApi";

export const useCreateCategory = () =>{
    return useMutation({
        mutationFn:createCategory
    })
}
export const useUpdateCategory = () => {
    return useMutation({
        mutationFn: ({ data, id }) => updateCategory(data, id)
    });
};
export const useDeleteCategory = () =>{
    return useMutation({
        mutationFn:deleteCategory
    })
}