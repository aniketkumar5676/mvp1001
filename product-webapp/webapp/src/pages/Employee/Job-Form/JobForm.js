import React, { useState } from 'react'
import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBModalBody
} from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {URL} from '../../../store/Const'


export default function JobForm({ setScrollableModal,activeUserId}) {

    const [publisherId, setpublisherId] = useState('demo1')
    const [jobtitle, setjobtitle] = useState('')
    const [jobtype, setjobtype] = useState('')
    const [jobrole, setjobrole] = useState('')
    const [salary, setsalary] = useState('')
    const [experience, setexperience] = useState('')
    const [city, setcity] = useState('')
    const [qualification, setqualification] = useState('')
    const [description, setdescription] = useState('')


    const addJob=async(e) =>{
        e.preventDefault();

        const response = await fetch(URL.SET+'job/addJob',
        {
          method: 'POST',
          statusCode: 200,
          headers:{
            'Content-Type':'application/json',
            "origin": "*",
            "optionsSuccessStatus": 200,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS',
            'Authorization':localStorage.getItem('auth0')
            },
          body: JSON.stringify({publisherId:activeUserId,jobtitle,jobtype,jobrole,salary,experience,city,qualification,description,"listed":true})
        })
        const message =await response.text();

        if(response.ok)
        { toast.success(message)
        
        }
        if(!response.ok){
          toast.info(message)
        }
        

    }



    return (

        <div>
            <MDBModalBody >
                <form onSubmit={addJob}> 
                    <MDBRow className='mb-4'>
                        <MDBCol>
                            <div className="form-outline mb-4">
                                <input style={{ color: '#1E1E1E' }} type="text" className="form-control" value={jobtitle} onChange={(e) => setjobtitle(e.target.value)} />
                                <label style={{ color: '#1E1E1E' }} className="form-label">Job Title</label>
                            </div>
                        </MDBCol>

                        <MDBCol>
                            <select className="form-outline" value={jobtype} onChange={(e) => setjobtype(e.target.value)} >
                                <option hidden value="">Job Type</option>
                                <option value="Full Time">Full Time</option>
                                <option value="Part Time">Part Time</option>
                                <option value="Internship">Internship</option>
                                <option value="Work Form Home">Work Form Home</option>
                            </select>
                        </MDBCol>
                    </MDBRow>

                    <select required className="form-outline mb-4" style={{ color: '#000' }} value={jobrole} onChange={(e) => setjobrole(e.target.value)}>
                        <option hidden value="">Select Role</option>
                        <option value="Animator">Animator</option>
                        <option value="Full Stack Developer">Full Stack Developer</option>
                        <option value="Java Developer">Java Developer</option>
                        <option value="Video Editor">Video Editor</option>
                    </select>


                    <div className="form-outline mb-4" >
                        <input style={{ color: '#1E1E1E' }} type="text" className="form-control" value={salary} onChange={(e) => setsalary(e.target.value)} />
                        <label style={{ color: '#1E1E1E' }} className="form-label" >Monthly Salary</label>
                    </div>

                    <div className="form-outline mb-4">
                        <input style={{ color: '#1E1E1E' }} type="text" className="form-control" value={experience} onChange={(e) => setexperience(e.target.value)} />
                        <label style={{ color: '#1E1E1E' }} className="form-label" >Experience</label>
                    </div>

                    <div className="form-outline mb-4">
                        <input style={{ color: '#1E1E1E' }} type="text" className="form-control" value={city} onChange={(e) => setcity(e.target.value)} />
                        <label style={{ color: '#1E1E1E' }} className="form-label">City</label>
                    </div>

                    <div className="form-outline mb-4">
                        <textarea style={{ color: '#1E1E1E' }} className="form-control" rows="4" value={qualification} onChange={(e) => setqualification(e.target.value)}></textarea>
                        <label style={{ color: '#1E1E1E' }} className="form-label" >Qualification Required</label>
                    </div>

                    <div className="form-outline mb-4">
                        <textarea style={{ color: '#1E1E1E', whiteSpace:'pre-wrap'}} className="form-control" rows="4" value={description} onChange={(e) => setdescription(e.target.value)}></textarea>
                        <label style={{ color: '#1E1E1E' }} className="form-label">Job Description</label>
                    </div>

                    <MDBInput className='mb-4' type='submit' >
                    </MDBInput>
                </form>
            </MDBModalBody >



        </div>
    )
}
