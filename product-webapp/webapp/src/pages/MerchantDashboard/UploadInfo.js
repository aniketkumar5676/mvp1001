import React from 'react'
import { toast } from 'react-toastify'
import { URL } from '../../store/Const'


const UploadInfo = ({merchant})=>{

  
  const onDelete = async (id) => {

  
      //Getting Gift Cards uploaded Info
      const response = await fetch (URL.SET+`/gift/delete/${id}`,
      {
        method: 'DELETE',
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
        toast.success("Successfully Deleted")

        window.location = '/merchantdash'
        
      }
      if(!response.ok){
        toast.error(await response.text())
      }
    

  }


  return (
<>
{ merchant.length > 0 ?  
   <div>
  <div style={{marginLeft:'10%',marginRight:'10%'}} className="content-main">
    <div className="content-main">
      <div className="card-grid">
 
       {merchant.map((data, index) => {
           console.log(data)
          return (
            <div key={index} className="card">
              <div className="px-2 pt-2 position-relative">
                <img alt="..." src={data.image} className="card-img" />
              </div>
              <div className="card-body">
                <h3 className="text-base text-muted font-semibold mb-3">{data.giftCardName}</h3>
                <span className="d-block h3 mb-0">{data.giftCardPrice}</span>
                <h3 style={{ marginTop: '3%' }} className="text-base text-muted font-semibold mb-3">Sold By : {data.merchantName} <i style={{ color: 'green' }} className="bi bi-patch-check-fill"></i></h3>
                <h5 style={{ marginTop: '3%' }} className="text-base text-muted font-semibold mb-3">Available : {data.giftCardQty}</h5>

                <br></br>
               {/*  <button  className="button-delete" onClick={onDelete(data.giftCardId)} role="button"><i className="bi bi-trash-fill"></i>Remove</button> */}

                <button type="button" className="button-delete" data-mdb-toggle="modal" data-mdb-target="#confirmDelete">
                <i className="bi bi-trash-fill"></i>Remove
                </button>

               {/*  Modal */}

                <div className="modal fade" id="confirmDelete" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Confirm Delete???</h5>
                        <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                      </div>
                      {/* <div className="modal-body">...</div> */}
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">Close</button>
                        <button onClick={()=>onDelete(data.giftCardId)} type="button"  className="btn btn-danger">Delete it</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })
    } 
      </div>
    </div>
  </div>

</div>
:
<> <p style={{marginLeft:"40%",marginRight:"40%",marginTop:"10%",fontSize:"1.5vw"}}> No GiftCard Published 🙁</p></>
}
</>
  )
}


export default UploadInfo

