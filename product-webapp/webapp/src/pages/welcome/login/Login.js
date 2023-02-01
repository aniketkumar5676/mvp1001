import React, { useState } from 'react'
import './Login.css'
import { MDBBtn,MDBTabsContent, MDBTabsPane } from 'mdb-react-ui-kit';
import { login,register } from '../../../service/LoginSlice/UserSlice';
import { useDispatch } from 'react-redux';
import Registration from '../registration/Registration';

export default function Login({change}) {

  const dispatch =useDispatch();


  const [loginRegisterActive, setloginRegisterActive] = useState('login');
  const[userId,setUserId]=useState('')
  const[password,setPassword]=useState('')
  const[loginType,setLoginType]=useState('')


    


  const loginIt = (e)=> {
     e.preventDefault();
     console.log(loginType)
     dispatch(login({userId,password,loginType}));
  }



  const handleLoginRegisterClick = (value) => {
    if (value === loginRegisterActive) {
      return;
    }
    setloginRegisterActive(value);
  };


  return (

    <div >
    

      <MDBTabsContent>
        <MDBTabsPane show={loginRegisterActive === 'login'} >
          <form onSubmit={loginIt}>


      {/*     <select style={{ borderRadius: 20}} required className="form-select fselect" value={loginType} onChange={(e) => setLoginType(e.target.value)} >
              <option hidden value="">Select Your Role</option>
              <option value="User">User</option>
              <option value="Employee">Employee</option>
              <option value="Institute">Institute</option>
        </select>
 */}
           <span className='me-3'> <b>Select Role: </b></span>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value='User' onChange={(e) => setLoginType(e.target.value)} required/>
              <label className="form-check-label" for="inlineRadio1">User</label>
            </div>

            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value='Employee' onChange={(e) => setLoginType(e.target.value)} />
              <label className="form-check-label" for="inlineRadio2">Employee</label>
            </div>

            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value='Institute' onChange={(e) => setLoginType(e.target.value)} disabled />
              <label className="form-check-label" for="inlineRadio3">Institute</label>
            </div>
           
           <div style={{ width: '70%' }}> 
            <div className="mb-1">
              <label className="form-label" for="formInputExample1"></label>
              <input style={{ borderRadius: 20 }} type="text" className="form-control fsign" id="formInputExample1" placeholder="Enter your Id" value={userId} onChange={(e) => setUserId(e.target.value)}/>
            </div>


            <div className="mb-1">
              <label className="form-label" for="formInputExample2"></label>
              <input style={{ borderRadius: 20 }} type="text" className="form-control fsign" id="formInputExample2" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <div className="mb-3">
              <p style={{fontSize:'14px',cursor:'pointer'}} onClick={change} className="ms-3 mt-3"> Forget Password ?</p>
           </div>

            <input  className="form-control mb-4" 
             style={{borderRadius: 20, height: 55, backgroundColor: '#4461f2', fontFamily: 'roboto',color:'white',
              textTransform: 'unset', fontSize: '16px', boxShadow: '2px 19px 31px rgba(0, 0, 0, 0.2)'
            }} type='submit' value="Sign in" block>
             </input>

             </div>
            
          </form>
          
          <div className='text-start'>
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
