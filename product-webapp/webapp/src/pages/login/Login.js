import React from 'react'
import { FadeIn } from  'react-slide-fade-in'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { login, STATUES } from '../../service/LoginSlice/UserSlice';
import { useSelector } from 'react-redux';
import ReactLoading from 'react-loading';
import { MDBInput } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function Login({changeState}) {

  const navigate = useNavigate();
  const dispatch =useDispatch();
  const {activeUser,status,authorised} = useSelector((state)=>state.user)

  const [userId, setuserId] = useState('');
  const [password, setpassword] = useState('');



  const options = {
    title: 'Warning',
    message: 'You are using Merchant Account , Use Merchant Login Page to access Merchant Panel',
    buttons: [
      {
        label: 'Ok',
        onClick: () => {
        window.location = '/merchantlogin'
        }
      },
    ],
    closeOnEscape: true,
    closeOnClickOutside: true,
    keyCodeForClose: [8, 32],
    willUnmount: () => {},
    afterClose: () => {},
    onClickOutside: () => {},
    onKeypress: () => {},
    onKeypressEscape: () => {},
    overlayClassName: "overlay-custom-class-name"
  };
  


  useEffect(() => {

  }, [activeUser])

  if(authorised==true){
    const token = localStorage.getItem("auth0").replace('Bearer ','');
    var decode = jwt_decode(token);

    if (decode.role=="user"){
      navigate('/giftstore')
    }
   
    if(decode.role=='Merchant')
    {
      localStorage.clear();
      confirmAlert(options);
    
    }
  }


  const submit=(e)=>{
    e.preventDefault()
    dispatch(login({userId,password}))
    
  }

  if (status==STATUES.LOADING) {
    return <ReactLoading type={'cylon'} color={'red'} height={100} width={100} />
  }


  return (

    <FadeIn>   
      
          <form onSubmit={submit} >
          <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
            <h2 style={{color:'#1e3a51',fontFamily:'poppins'}}  className="text-center mb-4 me-3">Sign In</h2>
           
          </div>
          <br></br>
          <MDBInput style={{marginBottom:'5%'}} required size='lg' pattern ="^[a-z\d\.]{5,}$" label='Enter User Id' id='typeUser_Id' type='text' value={userId} onChange={(e) => setuserId(e.target.value)} />
         
          <MDBInput size='lg'  label='Password' required id='typePassword' type='password'  value={password} onChange={(e) => setpassword(e.target.value)}/>


         <div className="text-center text-lg-start mt-4 pt-2">
            <button className="btn btn-primary btn-lg" type ="submit"
              style={{"paddingLeft":"2.5rem","paddingRight":"2.5rem",marginBottom:'2%'}}>Login</button>
            
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}} className="mb-5">
            <p  onClick={changeState} className="small fw-bold mt-2 pt-1 ">Don't have an account? <a 
                className="link-danger">Register</a></p>
            <a href='/merchantlogin' className="small fw-bold ">Login as Merchant Account ?</a>
            </div>
          </div>
        </form>
   </FadeIn>
  )
}
