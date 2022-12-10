import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import { toast } from 'react-toastify';
import { URL } from '../../store/Const';


const Updateuser = ({ user }) => {


  const [users, setUsers] = useState([])
  const [username, setUserName] = useState(user.username);
  const [email_id, setEmailId] = useState("");
  const [contact_no, setContactNo] = useState(user.contact_no);
  const [address, setAddress] = useState(user.address);
  const [city, setCity] = useState(user.city);
  const [country, setCountry] = useState(user.country);
  const [zip, setZip] = useState(user.zip);

  const navigate=useNavigate();

  function updateUser(e) {
     e.preventDefault()

    let item = {username, "email_id":user.email_id, contact_no, address, city, country, zip }

    const token = localStorage.getItem("auth0").replace('Bearer ','');
    if(token==null){
      toast.error("Authentication not Found")
      navigate('/')
    }
    var decode = jwt_decode(token);
     fetch(URL.SET+`/user/update/${decode.sub}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('auth0')

      },
      body: JSON.stringify(item)
    }).then((result) => {
        if(result.ok){
          toast.success("Updated Successfully")
        }else{
          toast.error("Something Went Wrong")
        }
        result.json().then((resp) => {
        console.warn(resp)
      
      })
    })

  }

  return (
    // <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
    <div  style={{ border: "5px"  ,marginTop:"3%" ,marginLeft:"20%",marginRight:"30%"}}>
      <div className="mb-5 align-items-center justify-content-center text-center">
        <h5 className="mb-0">Update your Information</h5>
      </div>
      <form className="mb-3" onSubmit={updateUser}>
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="">
              <label className="form-label" for="first_name">User Id</label>
              <input type="text" disabled className="form-control" id="first_name" value={user.userId} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="">
              <label className="form-label" for="last_name">User Name</label>
              <input type="text" required className="form-control" id="last_name" value={username} onChange={(e) => { setUserName(e.target.value) }} />
            </div>
          </div>
        </div>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="">
              <label className="form-label" for="email">Email</label>
              <input type="email" disabled className="form-control" id="email" value={user.email_id} onChange={(e) => { setEmailId(e.target.value) }} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="">
              <label className="form-label" for="phone_number">Contact</label>
              <input type="tel" className="form-control" id="phone_number" value={contact_no} onChange={(e) => { setContactNo(e.target.value) }} />
            </div>
          </div>
          <div className="col-12">
            <div className="">
              <label className="form-label" for="address">Address</label>
              <input type="text" className="form-control" id="address" value={address} onChange={(e) => { setAddress(e.target.value) }} />
            </div>
          </div>
          <div className="col-md-4">
            <div className="">
              <label className="form-label" for="city">City</label>
              <input type="text" className="form-control" id="city" value={city} onChange={(e) => { setCity(e.target.value) }} />
            </div>
          </div>
          <div className="col-md-4">
            <div className="">
              <label className="form-label" for="country">Country</label>
              <select className="form-select" id="country" aria-label="Default select example" value={country} onChange={(e) => { setCountry(e.target.value) }}>
                <option value="India">India</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Spain">Spain</option>
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="">
              <label className="form-label" for="zip">ZIP</label>
              <input type="tel" className="form-control" id="zip" value={zip} onChange={(e) => { setZip(e.target.value) }} />
            </div>
          </div>
        
        </div>
        <div className="text-center mt-5">
          <a href="/dashboard" type="button" className="btn btn-md btn-neutral me-3">Cancel</a>
          <button type="submit" className="btn btn-md btn-primary me-3  " >Save</button>
        </div>
      </form>


    </div>
    // </div>
  )
}

export default Updateuser