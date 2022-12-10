import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useRazorpay from "react-razorpay";
import { useNavigate } from 'react-router-dom';
import {useState,useEffect} from 'react'
import jwt_decode from "jwt-decode";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { add } from '../../service/GiftCardSlice/GiftCardSlice';
import Tooltip from '@mui/material/Tooltip';
import { URL } from '../../store/Const';

export default function ProductDescription() {

  const navigate=useNavigate();
  var { addedGiftCard } = useSelector((state) => state.giftcard)

  const [users, setUsers] = useState([])



  if (JSON.stringify(addedGiftCard).length > 2) {
    localStorage.setItem("item", JSON.stringify(addedGiftCard[0]))
  }

  const addedGift = JSON.parse(localStorage.getItem("item"))
  const Razorpay = useRazorpay();

  const dispatch =useDispatch();

  useEffect(()=>{

    const token = localStorage.getItem("auth0").replace('Bearer ','');
    var decode = jwt_decode(token);
    getUserDetails(decode.sub)

  },[])

  const getUserDetails = async(activeUser) =>{
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
                            
                    })


  const userData = await response.json()
  setUsers(userData)
}



  const onSuccess = async (order_id) => {
    const headers = {
      "origin": "*",
      "optionsSuccessStatus": 204,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS',
      'Authorization': localStorage.getItem('auth0')
    }

    try {

    const response = await fetch(URL.SET+'/payment/onSuccess',
      {
        method: 'POST',
        statusCode: 200,
        headers: headers,
        body: JSON.stringify({
          "customerName": users.username,
          "email": users.email_id,
          "phoneNumber": users.contact_no,
          "giftCardName": addedGift.giftCardName,
          "giftCardId": addedGift.giftCardId,
          "merchantName": addedGift.merchantName,
          "amount": addedGift.giftCardPrice,
          "orderId": order_id,
          "description": "Payment Successful",
          "merchantId":addedGift.merchantId
        })
      })

      if(response.ok) 
       {
        var para = new URLSearchParams();
        para.append("order", order_id);
        navigate("/payment/success?" + para.toString())
       }

    }catch (err) {
      console.log(err)
    }
      
  }


  const onFailure = async (data, desc) => {
    const headers = {
      "origin": "*",
      "optionsSuccessStatus": 204,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS',
      'Authorization': localStorage.getItem('auth0')
    }

    await fetch(URL.SET+'/payment/onFailure',
      {
        method: 'POST',
        statusCode: 200,
        headers: headers,
        body: JSON.stringify({
          "customerName": users.username,
          "email": users.email_id,
          "phoneNumber": users.contact_no,
          "giftCardName": addedGift.giftCardName,
          "giftCardId": addedGift.giftCardId,
          "merchantName": addedGift.merchantName,
          "amount": addedGift.giftCardPrice,
          "orderId": data,
          "description": desc,
           "merchantId":addedGift.merchantId
        })
      })

  }


  const paymentHandler = async (e) => {

     e.preventDefault();
      const options = {
        key: "rzp_test_JOgomCQllVwQla", // Enter the Key ID generated from the Dashboard
        amount: addedGift.giftCardPrice * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: addedGift.giftCardName + "E Gift Card",
        description: addedGift.giftCardName + " Bank Offer 5% Cashback on Kotak Netbanking",
        image: "https://i.imgur.com/SzyefuY.png",
  
        handler: function (response) {
  
          onSuccess(response.razorpay_payment_id)
          console.log(response)
  
          // alert(response.razorpay_payment_id);
          //  console.log(response)
        },
        prefill: {
          name: users.username,
          email: users.email_id,
          contact: users.contact_no,
        },
        notes: {
          address: "Kotak Corporate Office",
        },
        theme: {
          color: "#169509",
        },
      };
  
      const rzp1 = new Razorpay(options);
  
      rzp1.on("payment.failed", function (response) {
        onFailure(response.error.metadata.payment_id, response.error.description)
        console.log(response)
      });
  
      rzp1.open();  

     }
         
  
  return (
    <div className="py-24">
      <div style={{ display: "flex" }} className="container max-w-screen-xl">
        <div className="row align-items-center">
          <div className="col-12 col-lg-5 mb-10 mb-lg-0">

            <div className="w-x-12/10 position-relative">

              <span className="d-none d-lg-block position-absolute top-0 start-0 transform translate-x-n32 translate-y-n16 w-2/3 h-2/3 bg-warning opacity-20 rounded-circle filter blur-50"></span>
              <span className="d-none d-xl-block position-absolute bottom-0 end-0 transform translate-x-16 translate-y-16 w-32 h-32 bg-warning opacity-60 rounded-circle filter blur-50"></span>

              <img alt="..." src={addedGift.image} className="shadow-4 rounded-4 position-relative overlap-10 " />
            </div>


          </div>


          <div className="col-12 col-lg-6 ms-lg-auto">

            <h2 className="ls-tight font-bolder display-3 mb-2">
              {addedGift && addedGift.giftCardName} E-Gift Cards</h2><h2 className="ls-tight font-bolder display-5 mb-5" >(Instant Vouchers)</h2>
            <p className="lead mb-5">
              <h2 style={{ fontFamily: 'poppins' }} className="ls-tight font-bolder display-5 mb-5 "><i  className="bi bi-currency-rupee"></i>
                {addedGift.giftCardPrice}</h2>
              <h5>🏷️ OFFERS</h5>
              🔹Bank Offer 5% Cashback on <b>Kotak Netbanking</b> <br></br>
              🔹Special Price Get extra <b>10% off</b>
            </p>
            <Tooltip title="Click to Buy" arrow>
            <a onClick={paymentHandler} className="btn btn-lg btn-success shadow-sm mx-2 px-lg-8" >
              Click to Buy
            </a>
            </Tooltip>
           
          </div>
        </div>
      </div>

      <div style={{ marginLeft: '15%', marginTop: '5%', marginRight: '10%' }}>
        <h2 style={{ fontFamily: 'poppins' }} className="ls-tight font-bolder display-5 mb-5 ">
          Description</h2>

        <p style={{ fontFamily: 'poppins', fontSize: '20px' }} className="mb-5">
          Gift your loved ones {addedGift && addedGift.giftCardName} E-Gift Cards for various celebratory occasions in life and let them experience instant shopping gratification. With so many gift-giving occasions in a year, it’s understandable that you feel stressed about being able to select the right gift each time. The best part is, you don’t have to select the actual item. Whatever be the occasion, {addedGift && addedGift.giftCardName} has something perfect for everyone. So, don’t take on the stress of ‘will they like it or won’t they’; leave the choice up to your gift recipient! Take a few seconds out of your busy life to purchase an {addedGift && addedGift.giftCardName} E-Gift Card, and watch your gift recipient’s happiness overflow in less than 5 minutes. Your gift recipient can then log on to {addedGift && addedGift.giftCardName}, and use your E-Gift Card to purchase whatever they desire. Go on, make someone’s life complete today! Amazon E-Gift Cards make the best gifts for any gifting occasion, from birthdays to anniversaries to festive celebrations.
        </p>
      </div>
    </div>

  )
}
