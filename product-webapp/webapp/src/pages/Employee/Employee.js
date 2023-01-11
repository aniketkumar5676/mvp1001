import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '../../components/Navbar/Navbar'
import './Employee.css'
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,

} from 'mdb-react-ui-kit'
import JobForm from './Job-Form/JobForm';
import JobList from './Job-List/JobList'
import Footer from '../../components/Footer/Footer';


export default function Employee() {

  const [scrollableModal, setScrollableModal] = useState(false);
  const [showInfo, setshowInfo] = useState(true)
  const [showMenu, setshowMenu] = useState(false)
  const [menuactive, setmenuactive] = useState("")
  const [infoactive, setinfoactive] = useState("active")

  const[showTabs,setshowTabs] = useState(true)
  
  const navigate = useNavigate();
  const[activeUserId,setActiveUserId]=useState();


  useEffect(() => {

    const item = localStorage.getItem("auth0")
    if (item == null) {
      window.location='/'
    }


      const token = localStorage.getItem("auth0").replace('Bearer ','');
      var decode = jwt_decode(token);
      if(decode.role!=='Employee'){
        toast.error('Not Authorised')
        window.location='/'
      }

      setActiveUserId(decode.sub)
  
    

  }, [])


  const info = () => {
    setshowMenu(false);
    setshowInfo(true);
    setmenuactive("")
    setinfoactive("active")

  }


  const menu = () => {
    setshowMenu(true);
    setshowInfo(false);
    setmenuactive("active")
    setinfoactive("")
  }

  const tabs=()=>{
   setshowTabs(!showTabs)
  }
  
  return (
    <div className='resBody'>
    <Navbar/>
    <div style={{flex:1}}>
      <main className="main">
        <div className="responsive-wrapper">
        

       {showTabs? 
              <>
                <div className="main-header">
                  <h1>Dashboard</h1>
                  <div className="search">

                  </div>
                </div>

                <div className="horizontal-tabs">
                  <a onClick={info} className={infoactive} >Add Job</a>
                  <a onClick={menu} className={menuactive} >Published Jobs</a>
                </div></> :<div style={{marginTop:"-5%"}}></div>
        }
         


          {showInfo && 
           
            <div style={{boxShadow:'rgba(0, 0, 0, 0.04) 0px 3px 5px',padding:'1rem',borderRadius:'10px'}} className="content-header mt-4">
            <div className="content-header-intro ">
              <h2> Adding Job is just a single click away</h2>
              <p> <b>Suggestions:</b>
               <br></br> Make sure all words are spelled correctly
               <br></br> Try more general keywords.
               <br></br> Try fewer keywords.
                Try entire words and avoid abbreviations.</p>
              </div>
            <div className="content-header-actions">
              <a></a>
            
             <button className='button-37' onClick={() => setScrollableModal(!scrollableModal)}> <i className="bi bi-plus"></i> Add Job</button>
             
       <MDBModal show={scrollableModal} setShow={setScrollableModal} tabIndex='-1'>
        <MDBModalDialog scrollable>
          <MDBModalContent>
            <MDBModalHeader className='bg-img'>
              <MDBModalTitle style={{color:'#fff'}}>Add Job Description
                <p style={{fontSize:'13px',fontWeight:'300'}}>Read all fields properly</p>
              </MDBModalTitle>
              <a 
                className='btn-close'
                color='none'
                onClick={() => setScrollableModal(!scrollableModal)}
              ></a>
            </MDBModalHeader>
           
            <JobForm setScrollableModal={setScrollableModal} activeUserId={activeUserId}/>

          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
            
            </div>
          </div>
            
            }      

          {showMenu && 
          <>
              <JobList activeUserId={activeUserId} tabs={tabs}/>
          </>
          }

        </div>
      </main>


    </div>
    <Footer></Footer>
    </div>
  )
}
