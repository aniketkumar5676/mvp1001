import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import jwt_decode from "jwt-decode";
import './Navbar.css'

export default function Navbar() {

  const[activeUser,setActiveUser]=useState();
  const[role,setRole]=useState('');

  useEffect(()=>{

    const token = localStorage.getItem("auth0").replace('Bearer ','');
    var decode = jwt_decode(token);
    setActiveUser(decode.username)
    setRole(decode.role)
    if(decode.role=='User'){
      setRole('jobseeker')
    }

  },[])


  const logout = ()=>{

    localStorage.clear()
    window.location.href='/'
       
   }


  return (

    <div>


 <nav style={{backgroundColor:'transparent',fontWeight:'500'}} className="navbar navbar-expand-lg px-0 py-3">
  <div className="container-xl">
    <a className="navbar-brand" href="#">
      <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/BOLT_Logo_RGB-1_%281%29.png" className="h-8" alt="..."/>
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarCollapse">
      <div className="navbar-nav mx-lg-auto">
        <a className="nav-item nav-link" href={role} aria-current="page">Home</a>
        <a  className="nav-item nav-link"  href="/help" >Support</a>
       
     </div>

      <div className="navbar-nav ms-lg-4">
        <a className="nav-item nav-link" href="#">Welcome, {activeUser}</a>
      </div>
      <div className="d-flex align-items-lg-center mt-3 mt-lg-0">
        <button onClick={logout} className="button is-danger is-light">
          Logout
        </button>
      </div>
    </div>
  </div>
</nav>
    </div>
  )
}
