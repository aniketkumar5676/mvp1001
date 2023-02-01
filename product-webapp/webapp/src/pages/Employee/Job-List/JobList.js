import React from 'react'
import { useState, useEffect } from 'react'
import ApplicantApplied from '../ApplicantApplied/ApplicantApplied'
import { URL } from '../../../store/Const'
import './JobList.css'
import jwt_decode from "jwt-decode";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showAlertConfirmarion } from "mui-react-alert";


export default function JobList({ activeUserId, tabs }) {

    const [jobList, setJobList] = useState([])
    const [jobInfo, setjobInfo] = useState(true)
    const [currentJobId, setcurrentJobId] = useState('')



    useEffect(() => {
        async function fetchData() {
            const response = await fetch(URL.SET + `job/joblist/${activeUserId}`
                ,
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
                setJobList(await response.json())
            }

            if (!response.ok) {
                alert("Something went wrong")
            }

        }
        fetchData();

    }, [activeUserId])


    const showInfo = (id) => {
        setjobInfo(false)
        setcurrentJobId(id)
        tabs();

    }
    const back = () => {
        setjobInfo(true)
        tabs();
    }

    const onConfirm = async (id) => {
        const token = localStorage.getItem("auth0").replace('Bearer ', '');
        var decode = jwt_decode(token);

        const requestOptions = {
            method: 'DELETE',
            statusCode: 200,
            headers: {
                "origin": "*",
                "optionsSuccessStatus": 200,
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem('auth0')
            },
            body: JSON.stringify({ "userId": decode.sub, "jobId": id })
        };

        fetch(URL.SET + `job/delete/job`, requestOptions)
            .then((res) => {

                if (res.ok) {
                    toast.success("Deleted Successful")
                }
                if (!res.ok) {
                    toast.error('Something went Wrong')
                }

            })
            .then((res) => {

            }).catch((err) => {
                return Promise.reject({ Error: 'Something Went Wrong', err });
            })

    }


    return (
        <>
            {jobInfo == true ? <>
                <div className="content-main">
                    <div className="content-main">
                        <div className="card-grid">
                            {jobList.map((data, index) => {
                                return (

                                    <div style={{ 'background': "linear-gradient(149deg, rgba(23,182,79,0.15) 0%, rgba(0,146,255,0.15) 100%)", position: 'relative' }}
                                        className="card">
                                        <button onClick={() => {
                                            showAlertConfirmarion({
                                                title: "Warning",
                                                cancelLabel: "Cancel",
                                                confirmLabel: "Delete",
                                                subtitle:
                                                    "Do you really want to delete this Job?",
                                                onConfirmation: function () {
                                                    onConfirm(data.id);
                                                },
                                            });
                                        }}
                                            className="x"> x </button>

                                        <div className="card-body">
                                            <h3 className="text-base font-semibold">Job Id: {data.id}</h3>
                                            <span className="d-block h3 mb-0"><i style={{ fontSize: '25px' }} className="bi bi-bookmark-check-fill"></i> {data.jobtitle}</span>
                                            <h3 style={{ marginTop: '5%' }} className="text-base  font-semibold mb-3">Experience: {data.experience + " "}
                                                <i style={{ color: 'green' }} className="bi bi-patch-check-fill"></i></h3>

                                            <div style={{ display: 'flex', 'justifyContent': 'space-between', 'alignItems': 'center' }}>
                                                <h5 className="text-base  font-semibold mb-3">Job Role : {data.jobrole}</h5>
                                                <h5 className="text-base  font-semibold mb-3">Job Location : {data.city}</h5>
                                            </div>

                                            <br></br>

                                            <button className="button is-primary is-light" onClick={() => showInfo(data.id)} type="button"  >
                                                More Details...
                                            </button>

                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                    </div>
                </div>
            </>

                :
                <>
                    <div className='mt-5' style={{ display: 'flex', "alignItems": 'center', "justifyContent": "flex-start" }}>
                        <h2 onClick={back} type="button" aria-expanded="false" >
                            <i style={{ color: '#1983ff' }} className="bi bi-caret-left-fill"></i>
                        </h2>
                        <div className='content-header-intro' >
                            <h2 className=' ms-5' > Job Id:  {currentJobId}</h2>
                        </div>
                    </div>
                    {jobList.filter((data) => data.id == currentJobId).map((data, id) => {
                        return (
                            <>
                                <div key={id} className=' ms-5 '  >

                                    <div className="card">
                                        <div style={{ position: 'relative' }} className="p-2">
                                            <img style={{ height: '300px', 'objectFit': 'cover' }} alt="..." src="https://i.pinimg.com/originals/f6/96/3f/f6963f82d35a8432cd3d1a9736e0e524.jpg" className="card-img" />

                                            <div style={{ position: 'absolute', bottom: '-10%', left: '5%' }} >
                                                <img alt="Avatar" style={{ width: '50%', objectFit: 'fill' }} className="rounded-circle" src="https://img.freepik.com/free-vector/businesswoman-working-writing-document-paper-character-people-cartoon-flat-design_40876-3339.jpg?w=256" />
                                            </div>
                                        </div>

                                        <div className="card-body">
                                            <h2 style={{ fontSize: '35px' }} className="h4 mt-5"><b>{data.jobtitle}</b></h2>
                                            <span className="d-block text-sm font-semibold">Job Role :{data.jobrole}</span>


                                            <nav >
                                                <ul style={{ justifyContent: 'center' }} className="pagination">
                                                    <li className="page-item"><a className="page-link" >Job Type: {data.jobtype} </a></li>
                                                    <li className="page-item"><a className="page-link" >|</a></li>
                                                    <li className="page-item"><a className="page-link" >Experience Required: {data.experience} </a></li>
                                                    <li className="page-item"><a className="page-link" >|</a></li>
                                                    <li className="page-item"><a className="page-link" >Salary (In Rs): {data.salary}</a></li>
                                                </ul>
                                            </nav>

                                            <span className="text-heading">
                                                <i className="bi bi-geo-alt"></i> Location: {data.city}
                                            </span>

                                            <h2 style={{ fontSize: '20px' }} className="h4 mt-5"><b>Qualifications Required</b></h2>

                                            <p style={{ whiteSpace: 'pre-wrap' }} className="mt-4 mb-6">
                                                {data.qualification}
                                            </p>

                                            <h2 style={{ fontSize: '20px' }} className="h4 mt-5"><b>Job Description:</b></h2>

                                            <p style={{ whiteSpace: 'pre-wrap' }} className="mt-4 mb-6">
                                                {data.description}
                                            </p>


                                            <ApplicantApplied jobId={currentJobId} jobData={data}></ApplicantApplied>

                                        </div>
                                    </div>
                                </div>

                            </>
                        )

                    })

                    }



                </>
            }







        </>
    )
}
