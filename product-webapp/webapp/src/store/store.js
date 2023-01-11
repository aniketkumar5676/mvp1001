import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../service/LoginSlice/UserSlice'
import JobReducer from '../service/JobSlice/JobSlice'

const store =configureStore({
    reducer:{
        user:userReducer,
        Job:JobReducer
    }
})

export default store;