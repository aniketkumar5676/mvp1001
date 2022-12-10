import React, { useState, useEffect } from 'react'
import Merchant from './Merchant'
import UploadInfo from './UploadInfo'
import jwt_decode from "jwt-decode";
import MerchantPanel from './MerchantPanel';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './merch.css'
import { URL } from '../../store/Const';


function MerchantDashboard() {

  const [merchantgiftCard, setMerchantgiftCard] = useState([])
  const [merchantsales, setMerchantsales] = useState([])

  const [showMerchantDash, setshowMerchantDash] = useState(true)
  const [showMerchantInfo, setshowMerchantInfo] = useState(false)
  const [showUploadInfo, setshowUploadInfo] = useState(false)
  const navigate=useNavigate();

  const [tab0, settab0] = useState("active")
  const [tab1, settab1] = useState("")
  const [tab2, settab2] = useState("")

  useEffect(() => {

    const token = localStorage.getItem("auth0");
    if(token==null)
    {
     window.location='/merchantlogin'

    }else{
      const token = localStorage.getItem("auth0").replace('Bearer ', '');
      var decode = jwt_decode(token);

      if(decode.role=='Merchant')
      {
        getMerchantDetails(decode.sub)
  
      }else{
         toast.error("You are not Authorised")
         navigate("/")
      }
    }

   
  }, [])

  async function getMerchantDetails(id) {

    //Getting Gift Cards uploaded Info
    const response = await fetch(URL.SET+`/gift/getCardByMerchantid/${id}`,
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
    if(response.ok){
      const merchantData = await response.json()
      setMerchantgiftCard(merchantData)
    }
    if(!response.ok){
      toast.error("You are not Authorised")

    }



    const salesResponse = await fetch(URL.SET+`/payment/sales/${id}`,
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

    })
   
    if(salesResponse.ok){
      const merchantData = await salesResponse.json()
      setMerchantsales(merchantData)
    }
    if(!salesResponse.ok){
      toast.error("You are not Authorised")
    }


  }

  const getMerchantDash = () => {
    setshowMerchantDash(true)
    setshowMerchantInfo(false)
    setshowUploadInfo(false)

    settab0('active')
    settab1('')
    settab2('')

  }

  const getMerchantInfo = () => {

    setshowMerchantDash(false)
    setshowMerchantInfo(true)
    setshowUploadInfo(false)

    settab0('')
    settab1('active')
    settab2('')
  }

  const uploadInfo = () => {

    setshowMerchantDash(false)
    setshowMerchantInfo(false)
    setshowUploadInfo(true)

    settab0('')
    settab1('')
    settab2('active')

  }



  return (
    <div className='merchBg'>
      <div style={{ marginLeft: "10%" }} className="horizontal-tabs">

        <a onClick={getMerchantDash} className={tab0}>Dashboard</a>
        <a onClick={getMerchantInfo} className={tab1}>Create Gift Card</a>
        <a onClick={uploadInfo} className={tab2} >GiftCard Upload History</a>

      </div>


      {showMerchantDash && <MerchantPanel merchantgiftCard={merchantgiftCard} merchantsales={merchantsales}/>}
      {showMerchantInfo && <Merchant />}
      {showUploadInfo && <UploadInfo merchant={merchantgiftCard} />}

    </div>
  )

}

export default MerchantDashboard