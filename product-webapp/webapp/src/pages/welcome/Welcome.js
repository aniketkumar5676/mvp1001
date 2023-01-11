
import React from 'react'
import { useEffect } from 'react'
import Login from './login/Login'
import './Welcome.css'
import { useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';



export default function Welcome() {

  const {activeUser,status,authorised} = useSelector((state)=>state.user)
  const navigate = useNavigate();


  useEffect(() => {
  


  },[]);

  if(authorised==true){

    const token = localStorage.getItem("auth0").replace('Bearer ','');
    var decode = jwt_decode(token);

    if (decode.role=="User"){
      
      navigate('/jobseeker')
    }
    if (decode.role=="Employee"){
      navigate('/employee')
    }
   
    if (decode.role=="Institute"){
      navigate('/institute')
    }
   
    
  }



 return (

 <div className='login_bg'>
 <div className="py-24">
    <div className="containerlogin ">
      <div className="row align-items-center" style= {{height:"813px"}}> 

      <div className="col-12 col-xl-6 ">
               
      <div style= {{marginRight:"5%"}} className="w-s-12/10 position-relative">
            <span className="d-none d-lg-block position-absolute top-0 start-0 transform translate-x-n32 translate-y-n16 w-2/3 h-2/3 bg-danger opacity-20 rounded-circle filter blur-50"></span>
            <span className="d-none d-xl-block position-absolute bottom-0 end-0 transform translate-x-16 translate-y-16 w-32 h-32 bg-danger opacity-40 rounded-circle filter blur-50"></span>
                 <img  style= {{width:"90%"}} src="https://i.imgur.com/ndQJf4y.png" className="overlap-10" />
          </div>

        </div>


        <div style= {{marginLeft:"5%"}} className="col-12 col-lg-5 mb-10" >

          <h2 className="ls-tight font-bolder display-4 ">
            We Help You<br></br>
          </h2>

          <h2 className="ls-tight font-lighter display-6 mb-5">
            To Find The Right Job.
          </h2>
          <Login/>
        </div>

      </div>
    </div>
  </div>
 </div>
  )
}
