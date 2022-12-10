import React from 'react'
import error from '../images/error.gif'
import './Payment.css'

export default function Payment() {

   
    return (
        <div className="paycard">
            <div>
                <div style={{ "height": "300px", "width": "300px" }}>
                    <img src={error} />
                </div>
                <h1 style={{ marginTop:'-20%',color: 'Red',textAlign:'center' }}>Failed</h1>
                  <span style={{fontSize:'15px'}} className="badge rounded-pill bg-opacity-50 bg-secondary text-dark mt-2 mb-4 ">Transaction Id : #62GHF76</span>
                <p style={{textAlign:'center' }}>Your transaction is failed, <br/> Due to some Technical Reason<br/> Save the Transaction Id for Further Process</p><br></br>
                <span > <a className="btn btn-m btn-dark shadow-sm mx-2 px-lg-8"> Home </a>        
                </span>
            </div>
        </div>
    )
}
