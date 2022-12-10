import React from 'react'
import Login from '../login/Login'
import Registration from '../Registration/Registration'
import merchant_front from './images/merchant_front.png'
import { useState } from 'react'
import './Login.css'
import { FadeIn } from 'react-slide-fade-in'


export default function MerchantFrontPage() {

    const [login,setLogin] = useState(true);
    const [register,setRegister] = useState(false);


  const changeState=()=>{
    setLogin(!login)
    setRegister(!register)
  }

return (
 
 <FadeIn>
<div className='bg'>

    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">

   
       
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src={merchant_front}
              className="img-fluid" alt="Sample image"/>
          </div>
       
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">

             <h1 className="mb-5" style={{color:'#113c5d',fontFamily:'poppins'}}>Welcome to Seller Panel</h1>
                {login && <Login changeState={changeState}></Login>} 
                {register && <Registration changeState={changeState}></Registration>}
          </div>
        </div>
      </div>
     
    </section>


    </div>

    </FadeIn>

  )
}
