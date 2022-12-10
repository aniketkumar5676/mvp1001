import React from 'react'
import { useSelector } from 'react-redux';
import { useState} from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { add } from '../service/GiftCardSlice/GiftCardSlice'


export default function Search({query}) {

const {giftCardData} = useSelector((state)=>state.giftcard)
const dispatch =useDispatch();

  return (
    < div >
      <div className="content-main">
            <div className="content-main">
              <div className="card-grid">


        {giftCardData &&
            giftCardData.filter(data => {
                if (query === '') {
                    return data;
                } else if (data.giftCardName.toLowerCase().includes(query.toLowerCase())) {
                    return data;
                }
            }).map((data, index) => (

                      <div key={index} className="card">
                      <div className="px-2 pt-2 position-relative">
                        <img alt="..." src={data.image} className="card-img" />
                      </div>
                      <div className="card-body">
                        <h3 className="text-base text-muted font-semibold mb-3">{data.giftCardName}</h3>
                        <span className="d-block h3 mb-0"> <i className="bi bi-currency-rupee"></i>{data.giftCardPrice}</span>
                        <h3 style={{ marginTop: '3%' }} className="text-base text-muted font-semibold mb-3">Sold By : {data.merchantName} <i style={{ color: 'green' }} className="bi bi-patch-check-fill"></i></h3>
                        <h5 style={{ marginTop: '3%' }} className="text-base text-muted font-semibold mb-3">Available : {data.giftCardQty}</h5>

                        <br></br>
                        <Link to='/product' ><button onClick = {()=>{dispatch(add(data))}} className="button-37" role="button"><i className="bi bi-cart-fill"></i> Buy Now</button></Link> 
                      </div>
                    </div>
              
            ))
        }
    </div >


    </div>
        </div>
    </div>

  )
}
