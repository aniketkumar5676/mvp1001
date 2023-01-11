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
                            <div className="card card-bg mt-4">
                                <div className="card-body ">
                                    <h3 className="text-base font-semibold">Job Id : {data.id} </h3>
                                    <span className="d-block h3 mb-0"><i style={{ fontSize: '25px', color: '#5799fa' }} className="bi bi-bookmark-check-fill"></i> {data.jobtitle} <i style={{ color: '#5799fa' }} className="bi bi-patch-check-fill"></i></span>
                                    <h3 style={{ marginTop: '1.5%' }} className="text-base  font-semibold mb-3"><i className="bi bi-alarm"></i>&nbsp; Experience: {data.experience}&nbsp;&nbsp;
                                    </h3>

                                    <div style={{ display: 'flex' }}>
                                        <h5 className="text-base  font-semibold mb-3 "><i className="bi bi-file-earmark-person"></i> Job Role : {data.jobrole} &nbsp; | &nbsp; </h5>
                                        <h5 className="text-base  font-semibold mb-3"><i className="bi bi-geo-alt"></i> Job Location : {data.city}</h5>
                                    </div>
                                    <h5 className="text-base  font-semibold mb-3"><i className="bi bi-currency-rupee"></i> Expected Salary : {data.salary}</h5>

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
