import React from "react"
import Pdf from '../../service/Pdf/Pdf.js'


const Payments = ({ payments }) => {

  return (
    <>
 
    { payments.length != 0 ? 
          <>

      <div className="event">
        <div className="table-responsive">
          <table className="table table-hover table-nowrap">
            <thead className="table-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone Number</th>
                <th scope="col">GiftCard Name</th>
                <th scope="col">GiftCard Id</th>
                <th scope="col">Merchant Name</th>
                <th scope="col">Amount</th>
                <th scope="col">OrderId</th>
                <th scope="col">Transaction Date</th>
                <th scope="col">Status</th>
                <th scope="col">Receipt</th>
                <th></th>
              </tr>
            </thead>

            <tbody>


              {payments.map((payment) => {
                return (

                  <tr>
                    <td data-label="Job Title">
                      <img alt="..." src="https://i.imgur.com/tqb8reZ.png" style={{width:"35%",height:"35%"}} className="avatar avatar-md rounded-circle me-2" />
                      <a className="text-heading font-semibold" href="#">
                        {payment.customerName}
                      </a>
                    </td>
                    <td data-label="Email">
                    <a className="text-current" >{payment.email}</a>
                    
                    </td>
                    <td data-label="Phone">
                      <a className="text-current">{payment.phoneNumber}</a>
                    </td>


                    <td data-label="">
                      <a className="text-current">{payment.giftCardName}</a>
                    </td>

                    <td data-label="">
                      <a className="text-current">{payment.giftCardId}</a>
                    </td>

                    <td data-label="">
                      <a className="text-current">{payment.merchantName}</a>
                    </td>
                     

                    <td data-label="Lead Score">
                      <a className="text-current">{payment.amount}</a>
                    </td>

                    <td data-label="Company">
                      <span className="text-current">{payment.orderId}</span>
                    </td>

                
                    <td data-label="">
                      <a className="text-current" >{payment.date}</a>
                    </td>

                   
                    {(payment.status =="Success") ? <td data-label="">
                      <h3 className="text-current" ><i className="bi bi-check-circle" style={{color:'green'}}></i></h3>
                    </td>: <td data-label="">
                      <h3  className="text-current" ><i className="bi bi-x-circle" style={{color:'red'}}></i></h3>
                    </td>}

                     
                     {(payment.status =="Success") ? <td data-label="">
                      <button onClick={() =>{Pdf(payment)}} className="btn btn-sm btn-secondary shadow-sm px-lg-2">Receipt</button>
                     </td>:<></>}
                                      
                  </tr>

                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      </>:<> <p style={{marginLeft:"40%",marginRight:"40%",marginTop:"10%",fontSize:"1.8vw"}}> No Payment is Made 🙁</p></>
           }
    </>
  )
}

export default Payments