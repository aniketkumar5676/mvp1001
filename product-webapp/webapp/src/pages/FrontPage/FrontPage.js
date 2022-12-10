import React from 'react'
import Login from '../login/Login'
import Registration from '../Registration/Registration'
import { useState } from 'react'
import './Login.css'


export default function FrontPage() {

    const [login,setLogin] = useState(true);
    const [register,setRegister] = useState(false);


  const changeState=()=>{
    setLogin(!login)
    setRegister(!register)
  }

return (
 
<div className='login_bg'>

    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">

        <h3 style={{textAlign:'center',color:'black'}}><b style={{color:'#18a795',fontSize:'5vh'}}>This Festive Season,</b> treat your loved onces with<br></br> <b style={{color:'#fd7583',fontSize:'4.5vh'}}>Digital Gifts Cards</b> </h3>

    
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src="https://i.imgur.com/PuSj7S2.png"
              className="img-fluid" alt="Sample image"/>
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">

                {login && <Login changeState={changeState}></Login>} 
                {register && <Registration changeState={changeState}></Registration>}
          </div>
        </div>
      </div>
      
    </section>


    </div>



  )
}
