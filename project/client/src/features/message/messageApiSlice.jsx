import apiSlice from '../../app/apiSlice'
const messageApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getCountNewMsg: build.query({
            query: () => ({
                url: '/api/message'
            }),
            providesTags:["msg"],
            invalidatesTags: ["Get","Send","Message"],
        }),
        getSend: build.query({
            query: () => ({
                url: '/api/message/send'
            }),
            providesTags: ["Send"]
        }),
        getGet: build.query({
            query: () => ({
                url: '/api/message/get'
            }),
            providesTags: ["Get"],
            invalidatesTags: ["delete"]
        }),

        updateShow: build.mutation({
            query: (_id) => ({
                url: '/api/message',
                method: "PUT",
                body: {_id}
            }),
            invalidatesTags: ["Get","Send","msg"],
        }),
    
        createNewMsg: build.mutation({
            query: (message) => ({
                url: `/api/message`,
                method: "POST",
                body: message
            }),
            providesTags: ["Message"],
            invalidatesTags:["msg","Get","Send"]

        }),
        deleteMsg: build.mutation({
            query: (_id) => ({
                url: `/api/message/${_id}`,
                method: "DELETE"
            }),
            providesTags: ["delete"],
            invalidatesTags:["msg","Get","Send"]

        }),

    })
})

export const { useCreateNewMsgMutation,useGetCountNewMsgQuery,useGetGetQuery,useGetSendQuery,useUpdateShowMutation ,useDeleteMsgMutation} = messageApiSlice