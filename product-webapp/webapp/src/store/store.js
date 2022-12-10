import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../service/LoginSlice/UserSlice'
import giftCardReducer from '../service/GiftCardSlice/GiftCardSlice'

const store =configureStore({
    reducer:{
        user:userReducer,
        giftcard:giftCardReducer
    }
})

export default store;