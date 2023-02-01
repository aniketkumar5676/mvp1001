import React from 'react'
import { useSelector } from 'react-redux';

export default function SearchJob({ query, jobInfo }) {


    const { jobListsData } = useSelector((state) => state.Job)


    return (


        < div >

            <div className="content-main">
                <div className="content-main">
                    <div className="card-grid-job ">
                        {jobListsData.filter(data => {
                            if (query === '') {
                                return data;
                            } else if (data.jobtitle.toLowerCase().includes(query.toLowerCase()) || data.jobrole.toLowerCase().includes(query.toLowerCase()) || data.city.toLowerCase().includes(query.toLowerCase())) {
                                return data;
                            }
                        }).map((data, id) => (

                            <div key={id}style={{ fontFamily:'Heebo' }} className="card card-bg mt-4">
                            <div className="card-body ">
                                <h3 style={{ fontSize: '15px',color:'#4a4a4a' }}  className="text-muted ">#{data.id} </h3>
                                <span className="h5 mb-0">{data.jobtitle} | {data.description.substring(0,40)}.... </span>
                                <h3 style={{ fontSize: '15px',color:'#4a4a4a' }} className="mt-2">&nbsp;{data.publisherId}&nbsp;&nbsp;<i style={{ color: '#5799fa' }} className="bi bi-patch-check-fill"></i>
                                </h3>
                                <div style={{fontSize: '15px',color:'#4a4a4a'}} className="mb-2 mt-3"><i className="bi bi-briefcase"></i>&nbsp; Experience: {data.experience}&nbsp;&nbsp;| &nbsp; <i className="bi bi-file-earmark-person"></i>&nbsp;Job Role : {data.jobrole} &nbsp; | &nbsp; <i className="bi bi-geo-alt"></i> Job Location : {data.city}
                                </div>
                                <div style={{fontSize: '15px',color:'#4a4a4a'}} className=" mb-2"><i className="bi bi-currency-rupee"></i> Expected Salary : {data.salary}</div>
                                <div style={{fontSize: '15px',color:'#4a4a4a'}} className=" mb-2"><i className="bi bi-star me-1"></i>{data.qualification.substring(0,60)}....</div>
                                <div style={{fontSize: '13px',color:'#4a4a4a'}} className=" mb-2"><i className="bi bi-calendar-check me-2"></i>22/03/1998 &nbsp;&nbsp;| &nbsp; <i className="bi bi-person me-2"></i>32</div>
                                <br></br>
                                <button style={{ background:'linear-gradient(149deg, rgba(79,188,245,1) 0%, rgba(87,149,252,1) 100%)', color: 'white' }} className="button " onClick={() => jobInfo(data)} type="button"  >
                                    Apply Now!!
                                </button>
                            </div>
                        </div>

                        ))
                        }
                    </div >


                </div>
            </div>
        </div>

    )
}
