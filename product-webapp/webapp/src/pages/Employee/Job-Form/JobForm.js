import React, { useState } from 'react'
import {
    MDBRow,
    MDBCol,
    MDBInput,

} from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { URL } from '../../../store/Const'
import './JobForm.css'


export default function JobForm({ setScrollableModal, activeUserId,showFormGroup }) {

    const [jobtitle, setjobtitle] = useState('')
    const [jobtype, setjobtype] = useState('')
    const [jobrole, setjobrole] = useState('')
    const [salary, setsalary] = useState('')
    const [experience, setexperience] = useState('')
    const [city, setcity] = useState('')
    const [noofvacancy, setnoofvacancy] = useState('')
    const [qualification, setqualification] = useState('')
    const [description, setdescription] = useState('')


    const addJob = async (e) => {
        e.preventDefault();

        const response = await fetch(URL.SET + 'job/addJob',
            {
                method: 'POST',
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json',
                    "origin": "*",
                    "optionsSuccessStatus": 200,
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS',
                    'Authorization': localStorage.getItem('auth0')
                },
                body: JSON.stringify({publisherId: activeUserId, jobtitle, jobtype, jobrole, salary, experience, city, qualification, description, date:Date(Date.now()),noofvacancy,"listed": true })
            })
        const message = await response.text();

        if (response.ok) {
            toast.success(message)

        }
        if (!response.ok) {
            toast.info(message)
        }


    }

    return (
        <>
            <div className='container'>
                <div className='mt-5' style={{ display: 'flex', "alignItems": 'center', "justifyContent": "flex-start" }}>
                    <h2 style={{cursor:'pointer'}} >
                        <i onClick={showFormGroup} style={{ color: '#1983ff' }} className="bi bi-caret-left-fill"></i>
                    </h2>
                    <div className='content-header-intro' >
                        <h2 className='ms-5' >Add Job Details </h2>
                        <p  className='ms-5' style={{fontSize: '12px',color:'#4a4a4a',fontFamily:'Heebo',fontStyle:'italic'}} >Fill Details Carefully</p>

                    </div>
                </div>
                <form style={{ margin: '5% 20% 10% 15%' }} onSubmit={addJob}>
                    <MDBRow className='mb-4'>
                        <MDBCol>
                            <div className="mb-3">
                                <label style={{ color: '#1E1E1E' }} className="form-label required-field">Job Title</label><br></br>
                                <input required style={{ color: '#1E1E1E' }} type="text" className=" formcss" value={jobtitle} onChange={(e) => setjobtitle(e.target.value)} />
                            </div>
                        </MDBCol>

                        <MDBCol>
                            <div className="mb-3">
                                <label style={{ color: '#1E1E1E' }} className="form-label required-field">Select Job Type</label><br></br>
                                <select required className="formcss" value={jobtype} onChange={(e) => setjobtype(e.target.value)} >
                                    <option hidden value="">Select</option>
                                    <option value="Full Time">Full Time</option>
                                    <option value="Part Time">Part Time</option>
                                    <option value="Internship">Internship</option>
                                    <option value="Work Form Home">Work Form Home</option>
                                </select>
                            </div>
                        </MDBCol>
                    </MDBRow>

                    <div className=" mb-3">
                        <label style={{ color: '#1E1E1E' }} className="form-label required-field">Select Job Role</label><br></br>
                        <select required className=" formcss " style={{ color: '#000' }} value={jobrole} onChange={(e) => setjobrole(e.target.value)}>
                            <option hidden value="">Select Role</option>
                            <option value="Animator">Animator</option>
                            <option value="Full Stack Developer">Full Stack Developer</option>
                            <option value="Java Developer">Java Developer</option>
                            <option value="Video Editor">Video Editor</option>
                        </select>
                    </div>

                    <div className=" mb-3" >
                        <label style={{ color: '#1E1E1E' }} className="form-label required-field" >Monthly Salary</label><br></br>
                        <input required style={{ color: '#1E1E1E' }} type="text" className="formcss" value={salary} onChange={(e) => setsalary(e.target.value)} />
                    </div>

                    <div className=" mb-3">
                        <label style={{ color: '#1E1E1E' }} className="form-label required-field" >Number of Seats</label><br></br>
                        <input required style={{ color: '#1E1E1E' }} type="number" className="formcss" value={noofvacancy} onChange={(e) => setnoofvacancy(e.target.value)} />
                    </div>


                    <div className=" mb-3">
                        <label style={{ color: '#1E1E1E' }} className="form-label required-field" >Experience</label><br></br>
                        <input required style={{ color: '#1E1E1E' }} type="text" className="formcss" value={experience} onChange={(e) => setexperience(e.target.value)} />
                    </div>

                    <div className=" mb-3">
                        <label style={{ color: '#1E1E1E' }} className="form-label required-field">City</label><br></br>
                        <input required style={{ color: '#1E1E1E' }} type="text" className="formcss" value={city} onChange={(e) => setcity(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label style={{ color: '#1E1E1E' }} className="form-label required-field" >Qualification Required</label><br></br>
                        <textarea required style={{ color: '#1E1E1E', height: '100px' }} className="formcss" rows="4" value={qualification} onChange={(e) => setqualification(e.target.value)}></textarea>
                    </div>

                    <div className=" mb-3">
                        <label style={{ color: '#1E1E1E' }} className="form-label required-field">Job Description</label><br></br>
                        <textarea required style={{ color: '#1E1E1E', whiteSpace: 'pre-wrap', height: '100px' }} className="formcss" rows="4" value={description} onChange={(e) => setdescription(e.target.value)}></textarea>

                    </div>
                    <div style={{ display: 'flex', justifyContent: 'end' }} >
                        <button style={{ width: '20%', height: '40px' }} className='button is-success ' type='submit' >Submit
                        </button>
                    </div>
                </form>

            </div>
        </>
    )
}
