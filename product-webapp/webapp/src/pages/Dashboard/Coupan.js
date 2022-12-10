import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import './CoupanStyle.css'
import 'react-toastify/dist/ReactToastify.css';

export default function Coupan({coupan}) {



  const copyIt = (value)=>{
  
    navigator.clipboard
      .writeText(value)
      .then(() => {
        toast.success("successfully copied");
      })
      .catch(() => {
        toast("something went wrong");
      });
  }

  return (
<>

{ coupan.length != 0 ? 
          <>
    <div style={{marginLeft:'5%',marginRight:'5%'}} className="content-main">
      <div className="content-main">
        <div className="coupan-grid ">
        {coupan.map((data)=>{
          return (

            <div style={{backgroundColor:'#fff5cc'}} className='card coupan_card'>
            <div className="main">
              <div className="co-img">
                <img src="https://i.imgur.com/SzyefuY.png" alt="" />
              </div>
              <div className="vertical"></div>
              <div className="coupan_card_content">
                <h2>{data.giftCardName}</h2>
                <h1>Rs: {data.amount}<span></span></h1>
                <p>Virtual Gift Card</p>
              </div>
            </div>
            <div className="copy-button">
              <input type="text" readonly value={data.issuedGiftCardNo} />
              <button onClick={() =>{copyIt(data.issuedGiftCardNo)}} className="copybtn">COPY</button>
            </div>
         </div>
         )
        })}
         
        </div>
      </div>
    </div>
    </>:<> <p style={{marginLeft:"40%",marginRight:"40%",marginTop:"10%",fontSize:"1.8vw"}}> No Coupan Issued 🙁</p></>
           }
    </>
  )
}
