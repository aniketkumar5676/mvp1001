import React from 'react'
import check from '../images/check.gif'
import autoTable from 'jspdf-autotable';
import './Payment.css'
import Pdf from '../../../service/Pdf/Pdf.js'
import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { URL } from '../../../store/Const';

export default function Payment() {

  const [payment, setPayment] = useState([])


  useEffect(()=>{
    var para = new URLSearchParams(window.location.search);
    var order_id = para.get("order");
    getReceipt(order_id);
  },[])


  const getReceipt = async(order_id) =>{

    const response = await fetch (URL.SET+`/payment/order/${order_id}`,
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


const paymentData = await response.json()
setPayment(paymentData)

}
   
    return (
        <div className="paycard">
            <div>
                <div style={{ "height": "300px", "width": "300px" }}>
                    <img src={check} />
                </div>
                <h1 style={{ marginTop:'-20%',color: 'Green',textAlign:'center' }}>Success</h1>
                  <span style={{fontSize:'15px'}} className="badge rounded-pill bg-opacity-50 bg-secondary text-dark mt-2 mb-4 ">Order Id : #{payment.orderId}</span>
                <p style={{textAlign:'center' }}>We have received your Payment</p><br></br>
                <span > <a onClick={() =>{Pdf(payment)}} className="btn btn-m btn-dark shadow-sm mx-2 px-lg-8"> Receipt </a>        
                 <Link to='/dashboard'> <a className="btn btn-m btn-dark shadow-sm mx-2 px-lg-8"> View Your Order </a> </Link> </span>
            </div>
        </div>
    )
}
