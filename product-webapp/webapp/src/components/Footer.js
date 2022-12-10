import React from 'react'
import logo from './images/logo.png'
import './Footer.css'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (

    <div>
    
<footer className="new_footer_area bg_color">
            <div className="new_footer_top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="f_widget company_widget wow fadeInLeft" data-wow-delay="0.2s" style={{"visibility":"visible","animationDelay":"0.2s","animationName":"fadeInLeft"}}>
                        
                                <img style={{width:"70%"}} src={logo}></img>
                                <h4 className="f-title f_600 t_color f_size_18 mt-4">Gift your Loved ones a new Happiness</h4>
                               
                            </div>
                        </div>
                       {/*  <div className="col-lg-3 col-md-6">
                            <div className="f_widget about-widget pl_70 wow fadeInLeft" data-wow-delay="0.4s" style={{"visibility":"visible","animationDelay":"0.4s","animationName":"fadeInLeft"}}>
                                <h3 className="f-title f_600 t_color f_size_18">Download</h3>
                                <ul className="list-unstyled f_list">
                                    <li><a href="#">Company</a></li>
                                    <li><a href="#">Android App</a></li>
                                    <li><a href="#">ios App</a></li>
                                    <li><a href="#">Desktop</a></li>
                                    <li><a href="#">Projects</a></li>
                                    <li><a href="#">My tasks</a></li>
                                </ul>
                            </div>
                        </div> */}
                        <div className="col-lg-3 col-md-6">
                            <div className="f_widget about-widget pl_70 wow fadeInLeft" data-wow-delay="0.6s" style={{"visibility":"visible","animationDelay":"0.6s","animationName":"fadeInLeft"}}>
                                <h3 className="f-title f_600 t_color f_size_18">Section</h3>
                                <ul className="list-unstyled f_list">
                                    <li><Link to='/help'>FAQ</Link></li>
                                    <li><Link to='/dashboard' >Dashboard</Link></li>
                                    <li><a >Term &amp; conditions</a></li>
                                    <li><Link to='/help'>Contact Us</Link></li>
                                    <li><Link to='/help'>Support Policy</Link></li>
                                    </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="f_widget social-widget pl_70 wow fadeInLeft" data-wow-delay="0.8s" style={{"visibility":"visible","animationDelay":"0.8s","animationName":"fadeInLeft"}}>
                                <h3 className="f-title f_600 t_color f_size_18">Team Solutions</h3>
                                <div className="f_social_icon">
                                    <a href="#" className="fab fa-facebook"></a>
                                    <a href="#" className="fab fa-twitter"></a>
                                    <a href="#" className="fab fa-linkedin"></a>
                                    <a href="#" className="fab fa-pinterest"></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer_bg">
                    <div className="footer_bg_one"></div>
                    <div className="footer_bg_two"></div>
                </div>
            </div>
            <div className="footer_bottom">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-sm-7">
                            <p className="mb-0 f_400">© Gift Card.. 2022 All rights reserved.</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </footer>
     
      
    </div>
  )
}
