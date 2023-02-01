import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { fetchjobLists } from '../../../service/JobSlice/JobSlice';
import { useSelector } from 'react-redux';
import { STATUES } from '../../../service/JobSlice/JobSlice';
import Loading from '../../Loading/Loading';
import './JobList.css'
export default function JobList({ jobInfo }) {

    const { jobListsData, status } = useSelector((state) => state.Job)
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(fetchjobLists());

    }, [])



    if (status == STATUES.LOADING) {
        return (
            <Loading />
        )
    }

    return (

        <div className="content-main">
            <div className="content-main">
                <div className="card-grid-job ">
                    {jobListsData.map((data) => {
                        return (
                            <div style={{ fontFamily:'Heebo' }} className="card card-bg mt-4">
                                <div className="card-body ">
                                    <h3 style={{ fontSize: '15px',color:'#4a4a4a' }}  className="text-muted ">#{data.id} </h3>
                                    <span className="h5 mb-0">{data.jobtitle} | {data.description.substring(0,40)}.... </span>
                                    <h3 style={{ fontSize: '15px',color:'#4a4a4a' }} className="mt-2">&nbsp;{data.publisherId}&nbsp;&nbsp;<i style={{ color: '#5799fa' }} className="bi bi-patch-check-fill"></i>
                                    </h3>
                                    <div style={{fontSize: '15px',color:'#4a4a4a'}} className="mb-2 mt-3"><i className="bi bi-briefcase"></i>&nbsp; Experience: {data.experience}&nbsp;&nbsp;| &nbsp; <i className="bi bi-file-earmark-person"></i>&nbsp;Job Role : {data.jobrole} &nbsp; | &nbsp; <i className="bi bi-geo-alt"></i> Job Location : {data.city}
                                    </div>
                                    <div style={{fontSize: '15px',color:'#4a4a4a'}} className=" mb-2"><i className="bi bi-currency-rupee"></i> Expected Salary : {data.salary}</div>
                                    <div style={{fontSize: '15px',color:'#4a4a4a'}} className=" mb-2"><i className="bi bi-star me-1"></i>{data.qualification.substring(0,60)}....</div>
                                    <div style={{fontSize: '13px',color:'#4a4a4a'}} className=" mb-2"><i className="bi bi-calendar-check me-2"></i>{data.date.substring(0,15)} &nbsp;&nbsp;| &nbsp; <i className="bi bi-person me-2"></i>{data.noofvacancy}</div>
                                    <br></br>
                                    <button style={{ background:'linear-gradient(149deg, rgba(79,188,245,1) 0%, rgba(87,149,252,1) 100%)', color: 'white' }} className="button " onClick={() => jobInfo(data)} type="button"  >
                                        Apply Now!!
                                    </button>
                                </div>
                            </div>

                        )

                    })}

                </div>
            </div>
        </div>
    )
}
