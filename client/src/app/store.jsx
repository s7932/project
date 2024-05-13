import {configureStore} from "@reduxjs/toolkit"
import apiSlice from "./apiSlice"
import authSliceReducer from "../features/auth/authSlice"
const store = configureStore({
reducer:{
    auth: authSliceReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
},
middleware: (getDefaultMiddleware) =>getDefaultMiddleware().concat(apiSlice.middleware),
devTools:false
})
export default store


