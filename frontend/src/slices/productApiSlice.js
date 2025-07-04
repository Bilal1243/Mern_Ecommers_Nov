import {apiSlice} from './apiSlice'

const productApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        createProduct : builder.mutation({
            query : (data)=>({
                url : '/api/product',
                method : 'POST',
                body : data
            })
        })
    })
})


export const {
    useCreateProductMutation
} = productApiSlice