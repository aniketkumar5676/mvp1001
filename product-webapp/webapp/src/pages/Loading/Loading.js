import React from 'react'
import loading_anim from './images/loading_anim.gif'
import './Loading.css'

export default function Loading() {
  return (
    <div className="center_anim">  
        <img style={{width:"150px"}} src={loading_anim}></img>
        <br></br>
        <h5>Checking Coupan Availability</h5>
    </div>
  )
}
