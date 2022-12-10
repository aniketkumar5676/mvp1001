import React from 'react'
import gits from './images/gits.jpg'
import git2 from './images/git2.jpg'
import git3 from './images/git3.jpg'



export default function Carousel() {
  return (
    <div id="carouselExampleControls" className="carousel slide" data-mdb-ride="carousel">
    <div className="carousel-inner">
      <div className="carousel-item active ">
        <img src={gits} className="d-block-img  " alt="Wild Landscape"/>
      </div>
      <div className="carousel-item">
        <img src={git2} className="d-block-img " alt="Camera"/>
      </div>
      <div className="carousel-item">
        <img src={git3} className="d-block-img " alt="Exotic Fruits"/>
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-mdb-target="#carouselExampleControls" data-mdb-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-mdb-target="#carouselExampleControls" data-mdb-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
    </div>
  )
}
