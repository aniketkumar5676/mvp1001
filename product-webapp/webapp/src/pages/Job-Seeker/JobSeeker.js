import React, { useState, useEffect } from 'react'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import jwt_decode from "jwt-decode";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JobList from './Job-List/JobList';
import JobInfo from './JobInfo/JobInfo';
import { URL } from '../../store/Const';
import axios from 'axios';
import './JobSeeker.css'

import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,

} from 'mdb-react-ui-kit'
import SearchJob from './SearchJob/SearchJob';

export default function JobSeeker() {

  const [activeUserId, setActiveUserId] = useState();
  const [mainMenu, setmainMenu] = useState(true)
  const [selectedJob, setselectedJob] = useState([])
  const [scrollableModal, setScrollableModal] = useState(false);
  const [file, setSelectedFile] = useState([]);
  const [query, setQuery] = useState([]);



  useEffect(() => {

    const item = localStorage.getItem("auth0")
    if (item == null) {
      window.location = '/'
    }

    const token = localStorage.getItem("auth0").replace('Bearer ', '');
    var decode = jwt_decode(token);
    if (decode.role !== 'User') {
      toast.error('Not Authorised')
      window.location = '/'
    }
    setActiveUserId(decode.sub)
  }, [])


  const jobInfo = (id) => {
    setmainMenu(false)
    setselectedJob(id)
  }

  const back = () => {
    setmainMenu(true)
  }

  const uploadResume = async () => {


    const formData = new FormData();
    formData.append('file', file);



    const config = {
      headers: {
        "content-type": "multipart/form-data; boundary=<calculated when request is sent>",
        'Authorization': localStorage.getItem('auth0')
      },
    };

    axios.post(URL.SET + `job/resume/${activeUserId}`, formData, config)
      .then(res => {
        if (res.ok) {
          toast.success(res.data)
          setSelectedFile([])

        }
        if (!res.ok) {
          toast.info(res.data)
        }
      })

  }



  return (
    <div className='resBody headbg'>
      <Navbar />
      <div className='container' style={{ flex: 1 }}>
        {mainMenu ? <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <h2 className='text-center mt-5' style={{ fontFamily: 'poppins', fontWeight: '700' }}> Find your dream job now </h2>
              <p className='text-center text-muted' style={{ fontFamily: 'poppins' }}>2 lakh+ jobs for you to explore</p>
            </div>

            <div>
              <button className='button is-success' onClick={() => setScrollableModal(!scrollableModal)} >Upload Resume</button>

              <MDBModal className='mt-5' show={scrollableModal} setShow={setScrollableModal} tabIndex='-1'>
                <MDBModalDialog scrollable>
                  <MDBModalContent>
                    <MDBModalHeader >
                      <MDBModalTitle >Upload Resume

                      </MDBModalTitle>
                      <a className='btn-close'
                        color='none' onClick={() => setScrollableModal(!scrollableModal)}
                      ></a>
                    </MDBModalHeader>

                    <div style={{ margin: ' 10% 20% 10% 20%', display: 'block' }} className="file is-right is-info">

                      <label className="file-label">

                        <input className="file-input" type="file" name="resume" accept=".pdf" onChange={(e) => setSelectedFile(e.target.files[0])} />

                        <span className="file-cta">
                          <span className="file-icon">
                            <i className="fas fa-upload"></i>
                          </span>
                          <span className="file-label">
                            Upload Resume
                          </span>
                        </span>
                        <span className="file-name">
                          {file.length>=0? 'No File Selected' : file.type}
                        </span>
                      </label>
                      <br></br>
                      <div className="field is-grouped">
                        <p className="control">
                          <a className="button is-primary" onClick={() => uploadResume()}>
                            Submit
                          </a>
                        </p>
                      </div>
                    </div>


                  </MDBModalContent>
                </MDBModalDialog>
              </MDBModal>

            </div>


          </div>


          <input style={{ background: '#fff', border: 'none', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px', padding: '2% 0% 2% 2%' }} className="input is-rounded mt-3" type="text" placeholder="🔍 Search Jobs" value={query} onChange={(e) => setQuery(e.target.value)} />

          {query.length > 0 ? <> {

            <SearchJob query={query} jobInfo={jobInfo} />

          }</> : <JobList jobInfo={jobInfo} />}

        </> : <>

          <JobInfo back={back} selectedJob={selectedJob} activeUserId={activeUserId} />

        </>}
      </div>

      <Footer />
    </div>
  )
}
