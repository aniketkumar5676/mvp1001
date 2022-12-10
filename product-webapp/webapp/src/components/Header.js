import React, { useEffect, useState } from 'react'
import { Link,Outlet, useNavigate } from 'react-router-dom';
import logo from './images/logo.png'
import { useDispatch } from 'react-redux';
import { logoutUser } from '../service/LoginSlice/UserSlice';
import jwt_decode from "jwt-decode";


export default function Header() {

  const navigate = useNavigate();
  const dispatch =useDispatch();

  const [user,setUser] = useState('')
  const [merchant,setmerchant] = useState('')



  useEffect(()=>{
    const token = localStorage.getItem("auth0").replace('Bearer ','');
    var decode = jwt_decode(token);
    setUser(decode.sub)
    decode.role =='Merchant'? setmerchant(decode.role):setmerchant('')
       
  },[])


   const logout = ()=>{

    localStorage.clear()

    if(merchant=='Merchant')
    {
      window.location.href='/merchantlogin'
    }else{
      window.location.href='/'
    }
   
   }


  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-red bg-light px-0 py-3">
  <div  className="container-xl">

    <a className="navbar-brand" >
      <img src={logo} className="h-10" alt="..."/>
    </a>

    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    
    <div className="collapse navbar-collapse" id="navbarCollapse">
      
      <div className="navbar-nav mx-lg-auto">
        
       {merchant =='Merchant' ? <></>:<>
       <Link to='/giftstore' style={{color:"black",fontSize:'18px'}}  className="nav-item nav-link " href="#" aria-current="page"><b>Home</b></Link>
       <Link to='/dashboard' style={{color:"black",fontSize:'18px'}}  className="nav-item nav-link"><b>Dashboard</b></Link>
       <Link to='/help' style={{color:"black",fontSize:'18px'}}  className="nav-item nav-link" href="#"><b>Help</b></Link>
        </>} 
        
      </div>
    
      <div className="navbar-nav ms-lg-4">
       <a  style={{color:"black",fontSize:'17px'}}  className="nav-item nav-link" >Hi  {user} </a>
      </div>
 
      <div className="d-flex align-items-lg-center mt-3 mt-lg-0">
             
              <div className="dropdown">
                <button
                  className="btn btn-light "
                  type="button"
                  id="dropdownMenuButton"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                 <i style={{color:"black",fontSize:'22px'}}  className="bi bi-gear-fill"></i>
                </button>
                <ul className="dropdown-menu" >
                  <li><a onClick={logout} className="dropdown-item" >Logout</a></li>
                 </ul>
              </div>
      </div>
    </div>
  </div>
</nav>

<Outlet/>
</>
 )
}
