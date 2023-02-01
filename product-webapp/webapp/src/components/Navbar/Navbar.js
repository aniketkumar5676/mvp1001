import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import jwt_decode from "jwt-decode";
import './Navbar.css'
import Offcanvas from 'react-bootstrap/Offcanvas';
import {URL} from '../../store/Const'


export default function Navbar() {

  const [activeUser, setActiveUser] = useState();
  const [activeUserId, setActiveUserId] = useState();
  const [role, setRole] = useState('');
  const [show, setShow] = useState(false);
  const [url, setUrl] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const[notification,setNotification]=useState([])
  const[unreadNoti,setunreadNoti]=useState([])


  useEffect(() => {

    const token = localStorage.getItem("auth0").replace('Bearer ', '');
    var decode = jwt_decode(token);
    const id =  decode.sub
    setActiveUserId(id);
    setActiveUser(decode.username)
    setRole(decode.role)
    if (decode.role == 'User') {
      setRole('jobseeker')
      setUrl('/userprofile')
      fetchNotification(id);
    }
    if (decode.role == 'Employee') {
      setRole('Employee')
      setUrl('/profile')
    }
  }, [])


  const logout = () => {

    localStorage.clear()
    window.location.href = '/'

  }

  async function fetchNotification(id){

    const unreadresponse = await fetch(URL.SET + `job/allNotificationLength/${id}`,
                {
                    method: 'GET',
                    statusCode: 200,
                    headers: {
                        "origin": "*",
                        "optionsSuccessStatus": 200,
                        'Authorization': localStorage.getItem('auth0')
                    },
                })
            if (unreadresponse.ok) {
              setunreadNoti(await unreadresponse.json())
            }

            if (!unreadresponse.ok) {
                alert("Something went wrong")
            }





    const response = await fetch(URL.SET + `job/allNotification/${id}`,
                {
                    method: 'GET',
                    statusCode: 200,
                    headers: {
                        "origin": "*",
                        "optionsSuccessStatus": 200,
                        'Authorization': localStorage.getItem('auth0')
                    },
                })
            if (response.ok) {
              setNotification(await response.json())
              console.log(notification)
            }

            if (!response.ok) {
                alert("Something went wrong")
            }
   
            

  }

  async function readAll(){

    const response = await fetch(URL.SET + `job/readallNotification/${activeUserId}`,
      {
        method: 'GET',
        statusCode: 200,
        headers: {
          "origin": "*",
          "optionsSuccessStatus": 200,
          'Authorization': localStorage.getItem('auth0')
        },
      })
    if (response.ok) {
      window.location='/jobseeker'
    }

    if (!response.ok) {
      alert("Something went wrong")
    }

  }

  return (

    <div>


      <nav style={{ backgroundColor: 'transparent', fontWeight: '500' }} className="navbar navbar-expand-lg px-0 py-3">
        <div className="container-xl">
          <a className="navbar-brand" href="#">
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/BOLT_Logo_RGB-1_%281%29.png" className="h-8" alt="..." />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav mx-lg-auto">
              <a className="nav-item nav-link" href={role} aria-current="page">Home</a>
              <a className="nav-item nav-link" href={url} >Profile</a>
              <a className="nav-item nav-link" href="/help" >Support</a>

            </div>
           {role=='jobseeker'? <>
           <a  onClick={handleShow} className="text-dark mx-3">
              <i style={{fontSize:'23px'}} className="bi bi-bell-fill"></i>
              <span style={{width:'18px', height:'18px',borderRight:'10'}} className="badge bg-danger badge-dot py-1 ">{unreadNoti.length}</span>
            </a>
            </>:<> </>}
           

            <div className="navbar-nav ms-lg-4">
              <a className="nav-item nav-link" href="#">Welcome,{activeUser}</a>
            </div>
            <div className="d-flex align-items-lg-center mt-3 mt-lg-0">
              <button onClick={logout} className="button is-danger is-light">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

     <Offcanvas style={{borderRadius:'20px',background:'linear-gradient(149deg, rgba(255,255,255,0.87) 0%, rgba(255,255,255,0.76) 100%)'}} className='me-4 mt-4 mb-4' show={show} onHide={handleClose} placement={'end'}>
     
        <Offcanvas.Header ><h3>Notifications</h3>
          <Offcanvas.Title><p style={{fontWeight:400,fontSize:'15px',cursor:'pointer'}} onClick={readAll}>Read All</p></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        {notification.map((noti)=>{
         return(

         <div className='container'> 
          <div className='card px-3 py-3 mb-3'>
            <div></div>
            <span className='text-muted'>Your application is being considered for a <b>{noti.jobTitle}</b>. Soon you will be contacted by Recruiter. </span>
            <p style={{fontWeight:400,fontSize:'12px'}} className='mt-2'>{noti.date}</p>
            </div>
         </div>

         )

        })}

        </Offcanvas.Body>
      </Offcanvas>

    </div>
  )
}
