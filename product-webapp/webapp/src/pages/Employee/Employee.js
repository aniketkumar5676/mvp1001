import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../components/Navbar/Navbar'
import './Employee.css'
import JobForm from './Job-Form/JobForm';
import JobList from './Job-List/JobList'
import Footer from '../../components/Footer/Footer';


export default function Employee() {

  const [showInfo, setshowInfo] = useState(true)
  const [showMenu, setshowMenu] = useState(false)
  const [menuactive, setmenuactive] = useState("")
  const [infoactive, setinfoactive] = useState("active")
  const [showForm, setshowForm] = useState(false)
  const[showTabs,setshowTabs] = useState(true)
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

  
  const showFormGroup=()=>{
    setshowTabs(!showTabs)
    setshowInfo(!showInfo)
    setshowForm(!showForm)
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
                  <a  onClick={info} className={infoactive} >Add Job</a>
                  <a  onClick={menu} className={menuactive} >Published Jobs</a>
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
            
             <button className='button-37' onClick={() => showFormGroup()}> <i className="bi bi-plus"></i> Add Job</button>
          

                   
            </div>
          </div>
            
            }      

          {showMenu && 
          <>
              <JobList activeUserId={activeUserId} tabs={tabs}/>
          </>
          }

        {showForm && 
          <> <JobForm showFormGroup={showFormGroup} activeUserId={activeUserId}/>
          </>
          }

        </div>
      </main>


    </div>
    <Footer></Footer>
    </div>
  )
}
