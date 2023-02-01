import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../service/LoginSlice/UserSlice'
import JobReducer from '../service/JobSlice/JobSlice'
import ForgetReducer from "../service/forgetSlice/ForgetSlice";

const store =configureStore({
    reducer:{
        user:userReducer,
        Job:JobReducer,
        forget:ForgetReducer
    }
})

export default store;