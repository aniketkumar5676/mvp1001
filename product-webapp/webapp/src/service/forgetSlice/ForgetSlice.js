import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { URL } from "../../store/Const";

export const STATUES= Object.freeze({

    IDLE:'idle',
    LOADING:'loading',
    ERROR:'ERROR'
    
    });
    
     
 const ForgetSlice = createSlice({
    name:'forget',
       initialState:{
        status:'',
        authorised:'',
    },
 
     
    
   extraReducers:(builder)=>{
        builder

      .addCase(forgetPassword.pending,(state)=>{
        state.status=STATUES.LOADING

      })
      .addCase(forgetPassword.fulfilled,(state,action)=>{
        state.status=STATUES.IDLE
        if(action.payload=="")
        {          
          state.authorised=false
        }else{
          state.authorised=true
        }
      })

      .addCase(forgetPassword.rejected,(state)=>{
        state.status=STATUES.ERROR
      })

  
    } 

})


export default ForgetSlice.reducer;

export const forgetPassword = createAsyncThunk('api/checkUser', async (user,thunkAPI) => {
    try {
        const response = await fetch(URL.SET+'api/checkUser',
        {
          method: 'POST',
          statusCode: 200,
          headers:{
          'Content-Type':'application/json',
            },
          body: JSON.stringify(user)
        })
      const data= await response.text();
 
      if(response.ok){
        return data;
      }
      if(!response.ok){
        toast.error("Invalid Credentials")
        return "";
      }

    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  })
  




