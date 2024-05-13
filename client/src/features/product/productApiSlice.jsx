import apiSlice from '../../app/apiSlice'
const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getProducts: build.query({
            query: () => ({
                url: '/api/product'
            }),
            providesTags: ["Product"]
        }),
        getCount: build.query({
            query: (_idProduct) => ({
                url: `/api/product/count/${_idProduct}`
            }),
            providesTags: ["Count"]
        }),
        buyProduct: build.mutation({
            query: (idProduct) => ({
                url: '/api/product/buy',
                method: "PUT",
                body: idProduct
            }),
            invalidatesTags: ["basket", "Count", "totalSum"]
        }),
        cancelProduct: build.mutation({
            query: (idProduct) => ({
                url: '/api/product/cancel',
                method: "PUT",
                body: idProduct
            }),
            invalidatesTags: ["basket", "totalSum"],

        }),
        deleteProduct: build.mutation({
            query: (_id) => ({
                url: `/api/product/${_id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Product"],

        }),
        decreaseProduct: build.mutation({
            query: (idProduct) => ({
                url: '/api/product/decrease',
                method: "PUT",
                body: idProduct
            }),
            invalidatesTags: ["basket", "Count", "totalSum"],

        }),
        addProduct: build.mutation({
            query: (product) => ({
                url: `/api/product`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ["Product"],

        }),
        updateProduct: build.mutation({
            query: (product) => ({
                url: `/api/product`,
                method: "PUT",
                body: product
            }),
            invalidatesTags: ["Product"],

        }),
    })
})

export const { useGetProductsQuery,
                useBuyProductMutation,
                useCancelProductMutation,
                useDecreaseProductMutation,
                useGetCountQuery,
                useDeleteProductMutation,
                useAddProductMutation,
                useUpdateProductMutation } = productApiSlice