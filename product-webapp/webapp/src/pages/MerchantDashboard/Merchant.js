import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import { toast } from 'react-toastify';
import { URL } from '../../store/Const';

function Merchant() {

  const [Merchant, setMerchant] = useState( [] )

  const [giftCardId, setGiftCardId] = useState("");
  const [giftCardName, setGiftCardName] = useState("");
  const [giftCardPrice, setGiftCardPrice] = useState();
  const [giftCardQty, setGiftCardQty] = useState();
  const [giftCardCategory, setGiftCardCategory] = useState("");
  const [image,setImage ] = useState("");

  const navigate=useNavigate();


  useEffect(()=>{

    const token = localStorage.getItem("auth0").replace('Bearer ','');
    var decode = jwt_decode(token);
    setMerchant({"UserId":decode.sub,"username":decode.username})
    
  },[])

  async function UploadGiftCard(e) {
     e.preventDefault()
    let item = {giftCardId, giftCardName, giftCardPrice, giftCardQty, merchantId:Merchant.UserId, merchantName:Merchant.username, giftCardCategory,image }

      
    const response= await fetch(URL.SET+`/gift/addCards`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('auth0')

      },
      body: JSON.stringify(item)

    })
    var log= await response.text();
    
    if(response.ok){
      toast.success("Gift-Card Added Successfully")
    }
    
    if(!response.ok){
      toast.error(JSON.stringify(log))
    }
    
    
  }
   
  return (

    <div  style={{ border: "5px"  ,marginTop:"3%" ,marginLeft:"20%",marginRight:"30%"}}>
      <div className="mb-4">
        <h5 className="mb-0">Add GiftCard</h5>
        </div>
        <form className="mb-6" onSubmit={UploadGiftCard}>
          <div className="row mb-3">
                <div className="col-md-6">
                  <div className="">
                    <label className="form-label" for="first_name">Gift Card Id</label>
                    <input type="text" required className="form-control" id="first_name" value={giftCardId} onChange={(e) => { setGiftCardId(e.target.value) }}/>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="">
                    <label className="form-label" for="last_name">Gift Card Name</label>
                    <input type="text" required className="form-control" id="last_name" value={giftCardName} onChange={(e) => { setGiftCardName(e.target.value) }}/>
                  </div>
                </div>
              </div>

              <div className="row g-4">
                <div className="col-md-6">
                  <div className="">
                    <label className="form-label" for="email">Gift Card Price</label>
                    <input type="number" required className="form-control" id="email" value={giftCardPrice} onChange={(e) => { setGiftCardPrice(e.target.value) }}/>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="">
                    <label className="form-label" for="phone_number">Gift Card Qty</label>
                    <input type="number" required className="form-control" id="phone_number" value={giftCardQty} onChange={(e) => { setGiftCardQty(e.target.value) }}/>
                  </div>
                </div>

                {/* <div className="col-12">
                  <div className="">
                    <label className="form-label" for="address">Merchant Id</label>
                    <input type="text" disabled className="form-control" id="address" value={Merchant.UserId} />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="">
                    <label className="form-label" for="city">Merchant Name</label>
                    <input type="text" disabled className="form-control" id="city" value={Merchant.username} />
                  </div>
                </div> */}

                <div className="col-12">
                  <div className="">
                    <label className="form-label" for="address">Gift Card Category</label>
                    <select type="text" required className="form-control" id="address"  onChange={(e) => { setGiftCardCategory(e.target.value) }}>
                <option value="none" selected disabled hidden>Select an Option</option>
                <option value="Shopping">Shopping</option>
                <option value="Fashion">Fashion</option>
                <option value="Entertainment">Entertainment</option>

                    </select>
                    

                  </div>
                </div>

                <div className="col-12">
                  <div className="">
                    <label className="form-label" for="address">Gift Card Image Url</label>
                    <input type="url" required className="form-control" id="address" value={image} onChange={(e) => { setImage(e.target.value) }}/>
                  </div>
                </div>
                
              </div>
              <div className="text-end mt-5">
                <button type="button" className="btn btn-sm btn-neutral ">Cancel</button>
                <button type="submit" className="btn btn-sm btn-primary  " style={{marginRight:'35%',marginLeft:'2%'}}>Add Gift Card</button>
              </div>
            </form>

    </div>
  )
}

export default Merchant