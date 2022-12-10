import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { URL } from "../../store/Const";

export const STATUES= Object.freeze({

    IDLE:'idle',
    LOADING:'loading',
    ERROR:'ERROR'
    
    });
    
     
 const UserSlice = createSlice({
    name:'user',
       initialState:{
        activeUser:'',
        status:'',
        authorised:'',
        message:{},
    },
 
    reducers:{

      logoutUser(state,action){
        state.activeUser=""; 
        
    },  
  },
    
    
   extraReducers:(builder)=>{
        builder

      .addCase(login.pending,(state)=>{
        state.status=STATUES.LOADING

      })
      .addCase(login.fulfilled,(state,action)=>{
        state.status=STATUES.IDLE
        if(action.payload=="")
        {
          state.authorised=false
        }else{
          state.authorised=true
        }
        state.activeUser=action.payload
      })

      .addCase(login.rejected,(state)=>{
        state.status=STATUES.ERROR
      })

     .addCase(register.pending,(state)=>{
        state.status=STATUES.LOADING

      })
      .addCase(register.fulfilled,(state,action)=>{
        state.status=STATUES.IDLE
        state.message=action.payload
     
      })

      .addCase(register.rejected,(state)=>{
        state.status=STATUES.ERROR
      })

    } 

})


export const {logoutUser} = UserSlice.actions;

export default UserSlice.reducer;

export const login = createAsyncThunk('/login', async (user,thunkAPI) => {
    try {
      
        const response = await fetch(URL.SET+'/login',
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
        localStorage.setItem("auth0","Bearer " + data)
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
  



  export const register = createAsyncThunk('/register', async (user,thunkAPI) => {

    try {
        const response = await fetch(URL.SET+'/user/addUser',
        {
          method: 'POST',
          statusCode: 200,
          headers:{
            'Content-Type':'application/json',
            "origin": "*",
            "optionsSuccessStatus": 200,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS',
            },
          body: JSON.stringify(user)
        })
        const message =await response.text();


        if(response.ok)
        { toast.success(message)
        
        }
        if(!response.ok){
          toast.info(message)
        }
        
      return message;

    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  })