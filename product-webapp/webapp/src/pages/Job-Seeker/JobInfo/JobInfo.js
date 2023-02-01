import React from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { URL } from '../../../store/Const';

export default function JobInfo({ back, selectedJob,activeUserId}) {


    const applyIt = async(jobId)=>{

      
      
      const userId = activeUserId
        const response = await fetch(URL.SET+'job/apply/job',
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
            'Authorization': localStorage.getItem('auth0')
            },
          body: JSON.stringify({jobId,userId})
        })

        const message =await response.text();

        if(response.ok)
        { 
          toast.success(message)
        }
        if(!response.ok){
          toast.info(message)
        }
        

    }


    return (
        <div>
            <div className='mt-5' style={{ display: 'flex', "alignItems": 'center', "justifyContent": "flex-start" }}>
                <h2 onClick={back} type="button" aria-expanded="false" >
                    <i style={{ color: '#1983ff' }} className="bi bi-caret-left-fill"></i>
                </h2>
                <div className='content-header-intro' >
                    <h2 className=' ms-5' > Job Id:  {selectedJob.id}</h2>
                </div>
            </div>


            <div >
                <div className="card">
                    <div style={{ position: 'relative' }} className="p-2">
                        <img style={{ height: '400px', 'objectFit': 'cover' }} alt="..." src="https://source.unsplash.com/random/900x700/?technology" className="card-img" />

                        <div style={{ position: 'absolute', bottom: '-10%', left: '5%' }} >
                            <img alt="Avatar" style={{ width: '50%', objectFit: 'fill' }} className="rounded-circle" src="https://img.freepik.com/free-vector/businesswoman-working-writing-document-paper-character-people-cartoon-flat-design_40876-3339.jpg?w=256" />
                        </div>
                    </div>

                    <div className="card-body">
                        <h2 style={{ fontSize: '35px' }} className="h4 mt-5"><b>{selectedJob.jobtitle}</b></h2>
                        <span className="d-block text-sm font-semibold">Job Role :{selectedJob.jobrole}</span>


                        <nav >
                            <ul style={{justifyContent:'center'}} className="pagination">
                                <li className="page-item"><a className="page-link" >Job Type: {selectedJob.jobtype} </a></li>
                                <li className="page-item"><a className="page-link" >|</a></li>
                                <li className="page-item"><a className="page-link" >Experience Required: {selectedJob.experience} </a></li>
                                <li className="page-item"><a className="page-link" >|</a></li>
                                <li className="page-item"><a className="page-link" >Salary (In Rs): {selectedJob.salary}</a></li>
                            </ul>
                        </nav>

                        <span className="text-heading ">
                        <i className="bi bi-geo-alt"></i> Location: {selectedJob.city}
                        </span><br></br>
                        <div style={{marginTop:'1%'}} className="text-heading ">
                        <i className="bi bi-calendar-check"></i>  {selectedJob.date}
                        </div>
                        <div style={{marginTop:'1%'}} className="text-heading ">
                        <i className="bi bi-person"></i> No of Seats:  {selectedJob.noofvacancy}
                        </div>

                        <h2 style={{ fontSize: '20px' }} className="h4 mt-5"><b>Qualifications Required</b></h2>

                        <p style={{ whiteSpace: 'pre-wrap' }} className="mt-4 mb-6">
                        {selectedJob.qualification}
                        </p>

                        <h2 style={{ fontSize: '20px' }} className="h4 mt-5"><b>Job Description:</b></h2>

                        <p style={{ whiteSpace: 'pre-wrap' }} className="mt-4 mb-6">
                        {selectedJob.description}
                        </p>

                        <button onClick={()=>applyIt(selectedJob.id)}className='button is-success'> Apply Now!! </button>
                    </div>
                </div>
            </div>
     </div>






    )
}
