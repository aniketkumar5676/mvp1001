import React from 'react'
import Navbar from '../../../components/Navbar/Navbar'
import { useState } from 'react';
import { useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { URL } from '../../../store/Const';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Profile() {

    const [activeUser, setActiveUser] = useState('');
    const [role, setRole] = useState('');

    const [activeUserId, setActiveUserId] = useState('');
    const [username, setusername] = useState('');
    const [email_id, setemailId] = useState('');
    const [alternativeEmailId, setAlternativeEmailId] = useState('');
    const [contact_no, setcontact_no] = useState('');
    const [alternativeContactNo, setalternativeContactNo] = useState('');
    const [address, setaddress] = useState('');

    const [empData,setEmpData]=useState([])

     
    const getUserDetails = async(id) =>{

      const requestOptions = {
        method: 'GET',
        statusCode: 200,
        headers: {
            "origin": "*",
            "optionsSuccessStatus": 200,
            'Authorization': localStorage.getItem('auth0')
                 },
        };

        fetch(URL.SET+`job/byUserId/${id}`, requestOptions)
        .then((res) => {
    
            if(res.ok)
            {
                return res.json()
            }
            if(!res.ok){
                toast.error('Something went Wrong')
            }
    
        })
        .then((res) => {
          console.log(res)
          setusername(res.username)
          setemailId(res.email_id)
          setAlternativeEmailId(res.alternativeEmailId)
          setcontact_no(res.contact_no)
          setalternativeContactNo(res.alternativeContactNo)
          setaddress(res.address)
          }).catch((err) => {
            return Promise.reject({ Error:'Something Went Wrong', err });
        })

    }


    useEffect(() => {
  
      const token = localStorage.getItem("auth0").replace('Bearer ', '');
      var decode = jwt_decode(token);
      setActiveUser(decode.username)
      setActiveUserId(decode.sub)
      setRole(decode.role)
      if (decode.role == 'User') {
        setRole('jobseeker')
      }
      getUserDetails(decode.sub);

    }, [])
  
  
    const update = async(e) =>{
      e.preventDefault()
      const requestOptions = {
        method: 'PUT',
        statusCode: 200,
        headers: {
            "origin": "*",
            "optionsSuccessStatus": 200,
            "Content-Type": "application/json",
           'Authorization': localStorage.getItem('auth0')
                 },
        body:JSON.stringify({"userId":activeUserId,username,email_id,alternativeEmailId,contact_no,alternativeContactNo,address})        
        };
      
        console.log({"userId":activeUserId,username,email_id,alternativeEmailId,contact_no,alternativeContactNo,address})

        fetch(URL.SET+`job/update`, requestOptions)
        .then((res) => {
    
            if(res.ok)
            {
                toast.success("Update Successful")
            }
            if(!res.ok){
                toast.error('Something went Wrong')
            }
    
        })
        .then((res) => {
          
          }).catch((err) => {
            return Promise.reject({ Error:'Something Went Wrong', err });
        })
    }

  return (
    <div>
        <Navbar></Navbar>
        <div className='container'>

    <main className="py-6 bg-surface-primary">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-7 mx-auto">
            
            <div className="card shadow border-0 mt-4 mb-5">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div>
                    <div className="d-flex align-items-center">
                      <a href="#" className="avatar avatar-lg bg-warning rounded-circle text-white">
                        <img alt="..." src={"https://avatars.dicebear.com/api/pixel-art-neutral/" + activeUser + ".svg"}/>
                      </a>
                      <div className="ms-4">
                        <span className="h4 d-block mb-0">{activeUser}</span>
                      </div>
                    </div>
                  </div>
                  <div className="ms-auto">
{/*                     <button type="button" className="btn btn-sm btn-neutral">Upload</button>
 */}                  </div>
                </div>
              </div>
            </div>
        
            <div className="mb-5">
              <h5 className="mb-0">Contact Information</h5>
            </div>
            <form className="mb-6">
              <div className="row mb-5">
                <div className="col-md-6">
                  <div className="">
                    <label className="form-label" for="user_id">User Id</label>
                    <input type="text" disabled className="form-control" id="user_id" value={activeUserId}/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="">
                    <label className="form-label" for="name">Name</label>
                    <input type="text" className="form-control" id="name" value={username} onChange={(e)=>setusername(e.target.value)}/>
                  </div>
                </div>
              </div>
              <div className="row g-5">
                <div className="col-md-6">
                  <div className="">
                    <label className="form-label" for="email">Email</label>
                    <input type="email" disabled className="form-control" id="email" value={email_id}/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="">
                    <label className="form-label" for="ae">Alternative Email</label>
                    <input type="email" className="form-control" id="ae"  value={alternativeEmailId} onChange={(e)=>setAlternativeEmailId(e.target.value)}/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="">
                    <label className="form-label" for="contact">Contact No</label>
                    <input type="number" className="form-control" id="contact" value={contact_no} onChange={(e)=>setcontact_no(e.target.value)}/>
                  </div>
                </div>
               <div className="col-md-6">
                  <div className="">
                    <label className="form-label" for="acn">Alternative Contact No</label>
                    <input type="number" className="form-control" id="acn" value={alternativeContactNo} onChange={(e)=>setalternativeContactNo(e.target.value)}/>
                  </div>
                </div>
                <div className="col-12">
                  <div className="">
                    <label className="form-label" for="address">Address</label>
                    <input type="text" className="form-control" id="address" value={address}  onChange={(e)=>setaddress(e.target.value)}/>
                  </div>
               </div>
                              
              </div>
              <div className="text-end mt-5">
               <button onClick={update} type="submit" className="button is-primary is-light">Save</button>
              </div>
            </form>
            <hr className="my-10" />

            <div className="row g-6">
     
              <div className="col-md-12">
                <div className="card shadow border-0">
                  <div className="card-body d-flex align-items-center">
                    <div>
                      <h5 className="text-danger mb-2">Deactivate account</h5>
                      <p className="text-sm text-muted">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                    </div>
                    <div className="ms-auto">
                      <button type="button" className="btn btn-sm btn-danger">Deactivate</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
        </div>
    </div>
  )
}
