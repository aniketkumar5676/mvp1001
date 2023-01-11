import React, { useState } from 'react'
import './Login.css'
import { MDBBtn,MDBTabsContent, MDBTabsPane } from 'mdb-react-ui-kit';
import { login,register } from '../../../service/LoginSlice/UserSlice';
import { useDispatch } from 'react-redux';
import Registration from '../registration/Registration';

export default function Login() {

  const dispatch =useDispatch();


  const [loginRegisterActive, setloginRegisterActive] = useState('login');
  const[userId,setUserId]=useState('')
  const[password,setPassword]=useState('')
  const[loginType,setLoginType]=useState('')

    


  const loginIt = (e)=> {
     e.preventDefault();
     dispatch(login({userId,password,loginType}));
  }



  const handleLoginRegisterClick = (value) => {
    if (value === loginRegisterActive) {
      return;
    }
    setloginRegisterActive(value);
  };


  return (

    <div style={{ width: '60%' }}>
     
      <MDBTabsContent>
        <MDBTabsPane show={loginRegisterActive === 'login'} >
          <form onSubmit={loginIt}>


          <select style={{ borderRadius: 20}} required className="form-select fselect" value={loginType} onChange={(e) => setLoginType(e.target.value)} >
              <option hidden value="">Select Your Role</option>
              <option value="User">User</option>
              <option value="Employee">Employee</option>
              <option value="Institute">Institute</option>
        </select>

           
            <div className="mb-1">
              <label className="form-label" for="formInputExample1"></label>
              <input style={{ borderRadius: 20 }} type="text" className="form-control fsign" id="formInputExample1" placeholder="Enter your Id" value={userId} onChange={(e) => setUserId(e.target.value)}/>
            </div>


            <div className="mb-5">
              <label className="form-label" for="formInputExample2"></label>
              <input style={{ borderRadius: 20 }} type="text" className="form-control fsign" id="formInputExample2" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>


            <input  className="form-control mb-4" 
             style={{borderRadius: 20, height: 55, backgroundColor: '#4461f2', fontFamily: 'roboto',color:'white',
              textTransform: 'unset', fontSize: '16px', boxShadow: '2px 19px 31px rgba(0, 0, 0, 0.2)'
            }} type='submit' value="Sign in" block>
             </input>

         
            
          </form>
          
          <div className='text-center'>
              <p>
                Not a member? <a  style={{cursor:'pointer'}} className='danger' onClick={() => handleLoginRegisterClick('register')}
                  active={loginRegisterActive === 'register'} >Register</a>
              </p>
            </div>
          </MDBTabsPane>


        <MDBTabsPane show={loginRegisterActive === 'register'}>
      
          <Registration handleLoginRegisterClick={handleLoginRegisterClick} loginRegisterActive={loginRegisterActive} />
        
        </MDBTabsPane>
      </MDBTabsContent>
    </div>

  )
}
