import apiSlice from '../../app/apiSlice'
const userApiSlice = apiSlice.injectEndpoints({
        endpoints: (build) => ({
            getUsers: build.query({
                query:()=>({
                    url: '/api/user'
                }),
                providesTags:["Users"]
            }),
            getUserById: build.query({
                query:(_id)=>({
                    url: `/api/user/${_id}`
                })
            }),
            getBasket: build.query({
                query:()=>({
                    url: '/api/user/api/getBasket'
                }),
                providesTags:["basket"]
            }),
            getSumOfCard: build.query({
                query:()=>({
                    url: '/api/user/api/getSumOfCard'
                }),
                invalidatesTags:["basket"],
                providesTags:["totalSum"]
            }),
            deleteUser: build.mutation({
                query:(_id)=>({
                    url: '/api/user',
                    method: "DELETE",
                    body:_id
                }),
                invalidatesTags:["Users"]
            }),
            createUser: build.mutation({
                query: (newUser) => ({
                    url: "/api/user",
                    method: "POST",
                    body: newUser
                }),
                invalidatesTags: ["Users"]
            }),
            completionPurchase: build.mutation({
                query: () => ({
                    url: "/api/user/complete",
                    method: "PUT"
                }),
                invalidatesTags: ["Users","basket","totalSum"]
            }),
        }),
    })


export const {useGetUsersQuery,useGetBasketQuery,useDeleteUserMutation,useCreateUserMutation,useGetSumOfCardQuery,useGetUserByIdQuery,useCompletionPurchaseMutation} = userApiSlice

