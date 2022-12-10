import React, { useEffect } from 'react'
import Calendar from 'moedim';


export default function MerchantPanel({ merchantgiftCard, merchantsales }) {

  var amount = 0;


  return (

      <div style={{ marginLeft: '10%', marginRight: '10%' }} className="row g-6 mb-6 mt-20">
        <div className="col-xl-3 col-sm-6 col-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <span className="h6 font-semibold text-muted text-sm d-block mb-2">Total Estimated Revenue</span>
                  <span className="h3 font-bold mb-0"><i className="bi bi-currency-rupee"></i> {
                    merchantsales.map((data) => {

                      data.status == 'Success' ? amount = amount + data.amount : <></>;

                    })
                  }
                    {amount}
                  </span>
                </div>
                <div className="col-auto">
                  <div className="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                    <i className="bi bi-credit-card"></i>
                  </div>
                </div>
              </div>
              <div className="mt-2 mb-0 text-sm">
                <span className="text-nowrap text-s text-muted">Since last month</span>
              </div>
            </div>
          </div>
        </div>


        <div className="col-xl-3 col-sm-6 col-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <span className="h6 font-semibold text-muted text-sm d-block mb-2">No of GiftCard Published</span>
                  <span className="h3 font-bold mb-0">{merchantgiftCard.length} Cards</span>
                </div>
                <div className="col-auto">
                  <div className="icon icon-shape bg-primary text-white text-lg rounded-circle">
                    <i className="bi bi-people"></i>
                  </div>
                </div>
              </div>
              <div className="mt-2 mb-0 text-sm">
                <span className="text-nowrap text-xs text-muted">Updated Now</span>
              </div>
            </div>
          </div>
        </div>


        <div className="col-xl-3 col-sm-6 col-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <span className="h6 font-semibold text-muted text-sm d-block mb-2">Total Sales </span>
                  <span className="h3 font-bold mb-0">{merchantsales.length} Sales</span>
                </div>
                <div className="col-auto">
                  <div className="icon icon-shape bg-info text-white text-lg rounded-circle">
                    <i className="bi bi-clock-history"></i>
                  </div>
                </div>
              </div>
              <div className="mt-2 mb-0 text-sm">
                <span className="text-nowrap text-xs text-muted">**Updated Now</span>
              </div>
            </div>
          </div>
        </div>



        <div className="col-xl-3 col-sm-6 col-12">
          <div className="card">
            <div className="card-body">
              <Calendar style={{}} />
            </div>
          </div>
        </div>


        <div style={{ marginTop: "-6%" }} className="col-xl-9 col-sm-6 col-12">

          <div className="card">
            <h4 className="ms-5 mt-4">Sales History</h4>
            <div className="card-body">

              <div className="table-responsive">
                <table className="table table-hover table-nowrap">
                  <thead className="table-light">
                    <tr style={{ fontFamily: 'poppins' }}>
                      <th scope="col"><b>Order Id</b></th>
                      <th scope="col"><b>Customer Email</b></th>
                      <th scope="col"><b>Date</b></th>
                      <th scope="col"><b>Gift Card Id</b></th>
                      <th scope="col"><b>Amount</b></th>
                      <th scope="col"><b>Status</b></th>

                    </tr>
                  </thead>
                  <tbody>

                    {merchantsales.map((data) => {

                      return (

                        <tr>
                          <td data-label="Order Id">
                            <a className="text-heading font-semibold" href="#">
                              {data.orderId}
                            </a>
                          </td>
                          <td data-label="Customer Email">
                            <span>{data.email}</span>
                          </td>
                          <td data-label="Date">
                            <a className="text-current" >{data.date}</a>
                          </td>
                          <td data-label="Gift Card Id">
                            <a className="text-current" href="tel:401-505-6800">{data.giftCardId}</a>
                          </td>
                          <td data-label="Amount">
                            <a className="text-current" href="#">Rs: {data.amount}</a>
                          </td>
                          <td data-label="Status">
                            {data.status == 'Success' ? <span style={{ background: "rgba(29, 201, 100, 0.28)", fontSize: '12px' }} className="badge rounded-pill text-success">Success</span> : <span style={{ background: "rgba(201, 34, 29, 0.28)", fontSize: '12px' }} className="badge rounded-pill bg-opacity-30 text-danger">Failed</span>}
                          </td>
                        </tr>
                      )
                    })
                    }
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>

      </div>
 
  )
}
