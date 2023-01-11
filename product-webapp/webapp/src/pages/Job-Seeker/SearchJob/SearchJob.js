import React from 'react'
import { fetchjobLists } from '../../../service/JobSlice/JobSlice';
import { useSelector } from 'react-redux';
import { STATUES } from '../../../service/JobSlice/JobSlice';
import { useDispatch } from 'react-redux';

export default function SearchJob({ query, jobInfo }) {


    const { jobListsData, status } = useSelector((state) => state.Job)
    const dispatch = useDispatch();


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

                            <div key={id} className="card card-bg mt-4">
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

                                    <button style={{ backgroundColor: '#67d1f8', color: 'white' }} className="button " onClick={() => jobInfo(data)} type="button"  >
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
