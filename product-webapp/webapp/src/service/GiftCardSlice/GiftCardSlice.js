import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { URL } from "../../store/Const";


export const STATUES= Object.freeze({


    IDLE:'idle',
    LOADING:'loading',
    ERROR:'ERROR'
    
    });
    
    const GiftCardSlice = createSlice({
      
          name:'giftcard',
           initialState:{
            giftCardData:[] ,
            addedGiftCard:[],
            status:'',
        },


        reducers:{
          add(state,action){
            state.addedGiftCard.splice(0, state.addedGiftCard.length);
            state.addedGiftCard.push(action.payload)
        },  

        },

        extraReducers:(builder)=>{
    
            builder
    
           .addCase(fetchGiftCard.pending,(state)=>{
            state.status=STATUES.LOADING
    
          })
          .addCase(fetchGiftCard.fulfilled,(state,action)=>{
            state.status=STATUES.IDLE
            state.giftCardData=action.payload
          })
    
          .addCase(fetchGiftCard.rejected,(state)=>{
            state.status=STATUES.ERROR
          })
    
             
        } 
    
    })

    export const {add} = GiftCardSlice.actions;
    export default GiftCardSlice.reducer;

    export const fetchGiftCard = createAsyncThunk('/getGiftCards', async (thunkAPI) => {
        try {
        
        const response = await fetch(URL.SET+'/gift/getGiftCards/',
            {
              method: 'GET',
              statusCode: 200,
              headers: {
                "origin": "*",
                "optionsSuccessStatus": 200,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS',
                'Authorization': localStorage.getItem('auth0')
              },
                     
            })
          
              return await response.json();
    
        } catch (error) {
          const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
            toast.error("Session Expired")
            return thunkAPI.rejectWithValue(message)
        }
      })
      
    
    
 