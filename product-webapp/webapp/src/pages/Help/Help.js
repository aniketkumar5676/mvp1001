import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer';
import emailjs from 'emailjs-com';
import './style.css';
import { toast } from 'react-toastify';

export default function Help() {

  const[name,setName]=useState('')
  const[email,setEmail]=useState('')
  const[content,setContent]=useState('')




  const sendEmail= async  (e)=>{
    e.preventDefault();
 
     emailjs.init('KhXiosFgdG5z3YLm-');
     emailjs.send("service_wthnv46","template_uknytlc",{

       from_name:name,
       email:email,
       message:content,

     });
     toast.success("Message Sent")
   
  }
  
  return (
    <>
    <div className="helpcontainer">
      
      <div className="helpinfo">

      <h1 className="text-left mb-4 pb-2 text-dark fw-bold">Frequently asked questions</h1>
          <p className="text-left fs-20 me-20 mb-5">
            Here are some of the most frequent questions we get from our customers.
            <br></br>
            <br></br>
            If you have any further questions, get in touch with our friendly team😃
          </p>

      </div>


      <div className="helpquestions">

        <div className="accordion" id="accordionExampleY">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOneY">
              <button className="accordion-button" type="button" data-mdb-toggle="collapse"
                data-mdb-target="#collapseOneY" aria-expanded="true" aria-controls="collapseOneY">
                <i className="fas fa-paper-plane text-dark pe-2"></i><b>What can I purchase using my Gift Card?</b>
              </button>
            </h2>
            <div id="collapseOneY" className="accordion-collapse collapse show" aria-labelledby="headingOneY"
              data-mdb-parent="#accordionExampleY">
              <div className="accordion-body">
                <strong>Absolutely Anything!!!</strong> Using your Gift Voucher, you can purchase that’s available on its online store or mobile application. 
                This includes foodgrains, beverages, fruits & vegetables, gourmet & world food. 
                There are no restrictions on what you can purchase from this online retailer.
              </div>
            </div>
          </div>
          
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwoY">
              <button className="accordion-button collapsed" type="button" data-mdb-toggle="collapse"
                data-mdb-target="#collapseTwoY" aria-expanded="false" aria-controls="collapseTwoY">
                <i className="fas fa-pen-alt text-dark pe-2"></i><b>I have multiple Vouchers with me. Can I use them during a single transaction?</b>
              </button>
            </h2>
            <div id="collapseTwoY" className="accordion-collapse collapse" aria-labelledby="headingTwoY"
              data-mdb-parent="#accordionExampleY">
              <div className="accordion-body">
                <strong>Ofcourse...!</strong> Yes, you can use all your GiftCard Vouchers during a single transaction without any issue.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThreeY">
              <button className="accordion-button collapsed" type="button" data-mdb-toggle="collapse"
                data-mdb-target="#collapseThreeY" aria-expanded="false" aria-controls="collapseThreeY">
                <i className="fas fa-user text-dark pe-2"></i><b>What is the validity of any e-Voucher Gift Voucher available?</b> 
              </button>
            </h2>
            <div id="collapseThreeY" className="accordion-collapse collapse" aria-labelledby="headingThreeY"
              data-mdb-parent="#accordionExampleY">
              <div className="accordion-body">
                <strong>Minimum 3 Months....</strong> The validity of any e-Voucher being sold is between 3 to 12 months. 
                You will get these details via email and SMS with your Voucher code.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFourY">
              <button className="accordion-button" type="button" data-mdb-toggle="collapse"
                data-mdb-target="#collapseFourY" aria-expanded="true" aria-controls="collapseFourY">
                <i className="fas fa-rocket text-dark pe-2"></i><b>How do I send e-Gift Voucher to someone directly?</b>
              </button>
            </h2>
            <div id="collapseFourY" className="accordion-collapse collapse " aria-labelledby="headingFourY"
              data-mdb-parent="#accordionExampleY">
              <div className="accordion-body">
                <strong>These steps let you send e-Gift Voucher directly to your nears, dears, and acquaintances: </strong><br></br><br></br>
                1. Select the Voucher value & quantity you want to send them.<br></br>
                2. Check the box saying “I am Gyfting.”<br></br>
                3. Choose your message, occasion and mention the contact details of the recipient.<br></br>
                4. Make the payment through available methods.<br></br><br></br>
                They will receive the Voucher in their SMS/Email inbox in a few minutes.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFiveY">
              <button className="accordion-button" type="button" data-mdb-toggle="collapse"
                data-mdb-target="#collapseFiveY" aria-expanded="true" aria-controls="collapseFiveY">
                <i className="fas fa-home text-dark pe-2"></i><b>I have lost my Gift Card. Can I get the duplicate Voucher code?</b>
              </button>
            </h2>
            <div id="collapseFiveY" className="accordion-collapse collapse " aria-labelledby="headingFiveY"
              data-mdb-parent="#accordionExampleY">
              <div className="accordion-body">
                <strong></strong>We are happy to help you get a duplicate Voucher in case you have lost your original one. 
                You can use the virtual chat assistant for this purpose. Here’s how:<br></br>
                1. Select the Voucher value & quantity you want to send them.<br></br>
                2. Check the box saying “I am Gyfting.”<br></br>
                3. Choose your message, occasion and mention the contact details of the recipient.<br></br>
                4. Make the payment through available methods.<br></br><br></br>
              </div>
            </div>
          </div>

        </div>
      </div>  

    
      <div className="helpform" onSubmit={sendEmail} >
      
        <form>
            <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
              <h3 className="text-center mb-4 me-3">Still have any questions? Contact us to get your answer!</h3>
            </div>

          <div className="form-outline mb-4">
            <input type="text" id="form4Example1" className="form-control" value={name} onChange={(e) => setName(e.target.value)}/>
            <label className="form-label" for="form4Example1">Name</label>
          </div>

          
          <div className="form-outline mb-4">
            <input type="email" id="form4Example2" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label className="form-label" for="form4Example2">Email address</label>
          </div>
          
          <div className="form-outline mb-4">
            <textarea className="form-control" id="form4Example3" rows="4" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            <label className="form-label" for="form4Example3">Message</label>
          </div>

          <button type="submit" className="btn btn-secondary mb-2">Send</button>
          
        </form>
      </div>
      <br></br>
        <br></br>
       
    </div>

    <Footer/>
    </>
  )
}
