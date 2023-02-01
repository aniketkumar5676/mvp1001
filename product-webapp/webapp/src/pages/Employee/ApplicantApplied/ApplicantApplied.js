import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { saveAs } from 'file-saver';
import {URL} from '../../../store/Const'
import { toast } from 'react-toastify';

export default function ApplicantApplied({jobId,jobData}) {


const [subscribedJob,setSubscribedjob]=useState([])

const[resume,setResume] =useState()

    useEffect(()=>{

        async function fetchData() {

            const response = await fetch(URL.SET+`job/subscribedjobs/${jobId}`,
                {
                    method: 'GET',
                    statusCode: 200,
                    headers: {
                        "origin": "*",
                        "optionsSuccessStatus": 200,
                        'Authorization': localStorage.getItem('auth0')
                    },
                })
            if (response.ok) {
                setSubscribedjob(await response.json())
            }


            if (!response.ok) {
                alert("Something went wrong")
            }

        }
        fetchData();

    },[jobId])


const resumeDL = async(id)=>{
const requestOptions = {
    method: 'GET',
    statusCode: 200,
    headers: {
        "origin": "*",
        "optionsSuccessStatus": 200,
        'Authorization': localStorage.getItem('auth0')
    },
    };
    
    fetch(URL.SET+`job/downloadResume/${id}`, requestOptions)
    .then((res) => {

        if(res.ok)
        {
            return res.blob();
        }
        if(!res.ok){
            alert('File not Found')
        }

    })
    .then((blob) => {
        saveAs(blob, id+".pdf");

    }).catch((err) => {
        return Promise.reject({ Error: 'Something Went Wrong', err });
    })


}


async function hireCandidate(userId){

  
            const response = await fetch(URL.SET+`job/hire`,
                {
                    method: 'POST',
                    statusCode: 200,
                    headers: {
                        "origin": "*",
                        'Content-Type':'application/json',
                        "optionsSuccessStatus": 200,
                        'Authorization': localStorage.getItem('auth0')
                    },

                    body:JSON.stringify({jobId,userId,'jobTitle':jobData.jobtitle})
                })

                if (response.ok) {
                    toast.success("Successfully Hired this Candidate!, Candidate will get notified soon")
                }
    
                    if (!response.ok) {
                        toast.info("Already Hired this candidate")
                    }
    
}


return (

    <> 
    <h5 className='mb-4'> No of Applicant Applied : <b style={{color:'Green'}}>{subscribedJob.length}</b></h5>
   { subscribedJob.length == 0 ? <h5 className='text-center mt-5'> No Subcriptions Yet </h5>:  <div className="table-responsive">
  <table className="table table-hover table-nowrap">
    <thead className="table-light">
      <tr>
        <th scope="col">Applicant Id</th>
        <th scope="col">Resume</th>
        <th scope="col">Hire</th>
      </tr>
    </thead>

    <tbody>
         {subscribedJob.map((data, id) => {
                 return(
                    <tr key={id}>
                    <td data-label="Job Title">
                        <img alt="..." src={"https://avatars.dicebear.com/api/croodles/" + data.userId + ".svg"} className="avatar avatar-xl rounded-circle me-2" />
                        <a className="text-heading font-semibold" href="#">
                        {data.userId}
                        </a>
                    </td>
                    <td data-label="Resume">
                        <h3 style={{cursor:'pointer'}} onClick={()=>resumeDL(data.userId)}><i className="bi bi-file-earmark-arrow-down-fill"></i></h3>
                    </td>

                    <td >
                        <button style={{cursor:'pointer',marginLeft:'-15px'}} className='button is-warning ' onClick={()=>hireCandidate(data.userId)}>Hire Him</button>
                    </td>

                </tr>
                 )
                 
          })}
      </tbody>
  </table>
 
</div>}


</>

  )
}
