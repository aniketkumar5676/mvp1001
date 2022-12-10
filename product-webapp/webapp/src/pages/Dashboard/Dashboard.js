import React, { useState,useEffect } from 'react'
import Payments from './Payments';
import UserInfo from './UserInfo';
import './Dashboard.css';
import Coupan from './Coupan';
import jwt_decode from "jwt-decode";
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import Footer from '../../components/Footer';
import { URL } from '../../store/Const';

export default function Dashboard() {
  
  const [payments,setPayments] = useState([])
  const [users, setUsers] = useState([])
  const [coupan,setCoupan]=useState([]);
  const [merchant,setmerchant] = useState(false)

  const [showUserInfo,setshowUserInfo] = useState(true)
  const [showPaymentInfo, setshowPaymentInfo] = useState(false)
  const [showcoupanInfo, setshowcoupanInfo] = useState(false)

 
  const [tab1,settab1] = useState("active")
  const [tab2, settab2] = useState("")
  const [tab3, settab3] = useState("")


  const options = {
    title: 'Warning',
    message: 'Not Authorised',
    buttons: [
      {
        label: 'Ok',
        onClick: () => {
        window.location = '/merchantlogin'
        }
      },
    ],
    closeOnEscape: true,
    closeOnClickOutside: true,
    keyCodeForClose: [8, 32],
    willUnmount: () => {},
    afterClose: () => {},
    onClickOutside: () => {window.location = '/merchantlogin'},
    onKeypress: () => {},
    onKeypressEscape: () => {},
    overlayClassName: "overlay-custom-class-name"
  };
  


  useEffect(() => {

    const token = localStorage.getItem("auth0").replace('Bearer ','');
    var decode = jwt_decode(token);
    getUserDetails(decode.sub)
    decode.role =='Merchant'? confirmAlert(options):setmerchant(false)

  },[])

  const getUserDetails = async(activeUser) =>{
  
    //Getting User Info
    const response = await fetch (URL.SET+`/user/byUserId/${activeUser}`,
    {
      method: 'GET',
      statusCode: 200,
      headers: {
        "origin": "*",
        "optionsSuccessStatus": 200,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS',
        'Authorization': localStorage.getItem('auth0')
      },
             
    }
    
    )
    const userData = await response.json()
    setUsers(userData)
  

        //getting Payment
        const response1 = await fetch (URL.SET+`/payment/custEmail/${userData.email_id}`,
        {
          method: 'GET',
          statusCode: 200,
          headers: {
            "origin": "*",
            "optionsSuccessStatus": 200,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS',
            'Authorization': localStorage.getItem('auth0')
          },
                 
        }
       
        )
    
        const paymentData = await response1.json()
        setPayments(paymentData) 


    
    const response2 = await fetch (URL.SET+`/gift/getGiftCard/${userData.email_id}`,
    {
      method: 'GET',
      statusCode: 200,
      headers: {
        "origin": "*",
        "optionsSuccessStatus": 200,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS',
        'Authorization': localStorage.getItem('auth0')
      },
             
    }
    )
    setCoupan (await response2.json());

  }

 
 const getUserInfo = ()=> {
  setshowUserInfo(true)
  setshowPaymentInfo(false)
  setshowcoupanInfo(false)

  settab1('active')
  settab2('')
  settab3('')
 
 }

 const paymentInfo = ()=> {
  setshowUserInfo(false)
  setshowPaymentInfo(true)
  setshowcoupanInfo(false)

  settab1('')
  settab2('active')
  settab3('')

 
 }

 const coupanInfo = ()=> {
  setshowUserInfo(false)
  setshowPaymentInfo(false)
  setshowcoupanInfo(true)

  settab1('')
  settab2('')
  settab3('active')
 }


  return (    
    <>
    <div style={{marginLeft:"10%"}} className="horizontal-tabs">
    {/* <Route path = "/dash" element={<Payments}><a >User Profile</a></Route> */}
    
    <a onClick={getUserInfo} className={tab1}>User Profile</a>
    <a onClick={paymentInfo} className={tab2} >Transaction History</a>
    <a onClick={coupanInfo} className={tab3}>Virtual Gift Cards</a>
    </div>

        { showUserInfo && <UserInfo user={users} merchant ={merchant}/>}  
        { showPaymentInfo && <Payments payments={payments}/>}
        { showcoupanInfo && <Coupan coupan={coupan}/>}
<Footer/>
      </>
  )
}
