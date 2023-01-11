import React, { useState } from 'react'
import { MDBBtn} from 'mdb-react-ui-kit';
import { register } from '../../../service/LoginSlice/UserSlice';
import { useDispatch } from 'react-redux';


export default function Registration({handleLoginRegisterClick,loginRegisterActive}) {

  const dispatch =useDispatch();

  const[userId,setUserId]=useState('')
  const[password,setPassword]=useState('')
  const[username,setUsername]=useState('')
  const[emailId,setemailId]=useState('')
  const[contact_no,setcontact_no]=useState('')
  const[address,setaddress]=useState('')
  const[role,setrole]=useState('')


  const RegisterIt = (e)=> {
    e.preventDefault();
       dispatch(register({userId,username,password,emailId,contact_no,address,role}));
 }



  return (
    <div>
    <form onSubmit={RegisterIt} >
        <select style={{ borderRadius: 20}} required className="form-select fselect" value={role} onChange={(e) => setrole(e.target.value)} >
              <option hidden value="">Select Your Role</option>
              <option value="User">User</option>
              <option value="Employee">Employee</option>
              <option value="Institute">Institute</option>
        </select>

            <div className="mb-1">
              <label className="form-label" for="formInputExample3"></label>
              <input style={{ borderRadius: 15 }} type="text" className="form-control freg" id="formInputExample3" placeholder={role + " ID "} 
              value={userId} onChange={(e) => setUserId(e.target.value)}/>
            </div>


            <div>
              <label className="form-label" for="formInputExample4"></label>
              <input style={{ borderRadius: 15 }} type="text" className="form-control freg" id="formInputExample4" placeholder={"Enter "+role + " Name "}
              value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>


            <div >
              <label className="form-label" for="formInputExample5"></label>
              <input style={{ borderRadius: 15 }} type="password" className="form-control freg" id="formInputExample5" placeholder="Enter Password" 
              value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>


            <div >
              <label className="form-label" for="formInputExample6"></label>
              <input style={{ borderRadius: 15 }} type="text" className="form-control freg" id="formInputExample6" placeholder={"Enter "+role + " Address "} 
              value={address} onChange={(e) => setaddress(e.target.value)}/>
            </div>

            <div>
              <label className="form-label" for="formInputExample7"></label>
              <input style={{ borderRadius: 15 }} type="email" className="form-control freg" id="formInputExample7" placeholder={"Enter "+role + " Email "} 
              value={emailId} onChange={(e) => setemailId(e.target.value)}/>
            </div>

            <div className='mb-4' >
              <label className="form-label" for="formInputExample8"></label>
              <input style={{ borderRadius: 15 }} type="text" className="form-control freg" id="formInputExample8" placeholder={"Enter "+role + " Contact No "} 
              value={contact_no} onChange={(e) => setcontact_no(e.target.value)}/>
            </div>


            <input  className="form-control mb-4" 
             style={{borderRadius: 20, height: 55, backgroundColor: '#4461f2', fontFamily: 'roboto',color:'white',
              textTransform: 'unset', fontSize: '16px', boxShadow: '2px 19px 31px rgba(0, 0, 0, 0.2)'
            }} type='submit' value="Submit" block>
             </input>

            <div className='text-center'>
              <p>
                Already a member? <a style={{cursor:'pointer'}} className='danger' onClick={() => handleLoginRegisterClick('login')}
                  active={loginRegisterActive === 'login'} >Sign In</a>
              </p>
            </div>

          </form>
    </div>
  )
}
