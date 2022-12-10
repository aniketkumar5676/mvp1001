import React from 'react'
import { FadeIn } from  'react-slide-fade-in'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import ReactLoading from 'react-loading';
import { register, STATUES } from '../../../service/LoginSlice/UserSlice';
import { MDBInput } from 'mdb-react-ui-kit';
import Form from 'react-bootstrap/Form';


export default function Registration({changeState}) {

  const dispatch =useDispatch();
  const {message,status} = useSelector((state)=>state.user)

  const [userId, setuserId] = useState('');
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [emailId, setemailId] = useState('');
  const [contact_no, setcontact_no] = useState('');
  const [merchant_no, setmerchant_no] = useState('');
  const [role, setrole] = useState('Merchant');


  const submits=(e)=>{
    e.preventDefault()
    dispatch(register({userId,username,password,emailId,contact_no,role,"gstNo":merchant_no}))
  }


  if (status==STATUES.LOADING) {
    return <ReactLoading type={'cylon'} color={'red'} height={100} width={100} />

  }

  

  return (
    <>
  
    <FadeIn>
   
    <form onSubmit={submits} >
    <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
    <h3 style={{color:'#1e3a51',fontFamily:'poppins'}}  className="text-center mb-4 me-3">Register with us</h3>
     
    </div>

  
    <br></br>   

    
    <MDBInput style={{marginBottom:'2%'}} label='Merchant Id' id='userId' type='text'required value={userId} pattern ="^[a-z\d\.]{5,}$" onChange={(e) => setuserId(e.target.value)} size='lg' />
    <p style={{fontSize:'12px',color:"#afafaf",fontStyle:"italic"}}>Merchant Id must be 5 characters ,All are in small caps and no special charactes are allowed</p>
    <MDBInput style={{marginBottom:'2%'}} label='Merchant Name' id='userName' type='text'required value={username} onChange={(e) => setusername(e.target.value)} size='lg' />
    <MDBInput style={{marginBottom:'2%'}} label='Password' id='Password' required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" type='password' value={password} onChange={(e) => setpassword(e.target.value)} size='lg' />
    <p style={{fontSize:'12px',color:"#afafaf",fontStyle:"italic"}}>Password must be 8 characters including 1 uppercase letter, 1 lowercase letter and numeric characters</p>
    <MDBInput style={{marginBottom:'2%'}} label='Email Address' id='EmailAddress' type='email' required value={emailId} onChange={(e) => setemailId(e.target.value)} size='lg' />
    <MDBInput style={{marginBottom:'2%'}} label='Contact No' id='contact_no' required pattern='[0-9]+'  type='text' value={contact_no} onChange={(e) => setcontact_no(e.target.value)} size='lg' />

  
   <MDBInput style={{marginBottom:'2%'}} label='GST NO' id='Merchant' required type='text' pattern="^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){16}$" value={merchant_no} onChange={(e) => setmerchant_no(e.target.value)} size='lg' />

   <div className="text-center text-lg-start mt-4 pt-2">
   <button className="btn btn-primary btn-lg" type ="submit"
    style={{"paddingLeft":"2.5rem","paddingRight":"2.5rem",marginBottom:'2%'}}>Sign Up</button>
     
        <p onClick={changeState} className="small fw-bold mt-2 pt-1 mb-3">Already have an account? 
        <a className="link-danger">Login</a></p>
    </div>

  </form>
  </FadeIn>
  </>
  )
}
