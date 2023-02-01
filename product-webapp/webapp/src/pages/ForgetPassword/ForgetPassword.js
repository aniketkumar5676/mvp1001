import React, { useState } from 'react'
import './ForgetPassword.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { URL } from '../../store/Const';
import emailjs from 'emailjs-com';
import { FadeIn } from 'react-slide-fade-in';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; 

export default function ForgetPassword({ change }) {


    const [role, setRole] = useState('');
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [style, setStyle] = useState('');

    const [verify, setVerify] = useState(true)
    const [showOTP, setOTP] = useState(false);

    const [code, setcode] = useState('');
    const [otpGenerated, setotpGenerated] = useState('')




    const checkId = async (e) => {
        e.preventDefault();

        if (cpassword != password) {
            setStyle('cpassword')
        } else {
            setStyle('')
            // dispatch(forgetPassword({"role":role,"emailId":emailId}))

            const response = await fetch(URL.SET + 'api/checkUser',
                {
                    method: 'POST',
                    statusCode: 200,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "role": role, "emailId": emailId })
                })

            const data = await response.text();

            if (response.ok) {

                generateOtp();

            }
            if (!response.ok) {
                toast.error("Invalid Credentials")
                return "";
            }

            setOTP(true)
            setVerify(false)

        }
    }


    const generateOtp = () => {

        var val = Math.floor(1000 + Math.random() * 9000);
        setotpGenerated(val)

        emailjs.init('KhXiosFgdG5z3YLm-');
        emailjs.send("service_wthnv46", "template_qahjien", {

            email: emailId,
            otp: val,
        });

    }


    const verifyOTP = async (e) => {
        e.preventDefault();
        if (code == otpGenerated) {

            const response = await fetch(URL.SET + 'api/updatePass',
                {
                    method: 'POST',
                    statusCode: 200,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "role": role, "emailId": emailId, "password": password })
                })

            const data = await response.text();

            if (response.ok) {

                confirmAlert({
                    title: 'Successful',
                    message: 'Your Password have Been Changed Successfully',
                    buttons: [
                      {
                        label: 'Ok',
                        onClick: () => window.location='/'
                      }
                    ]
                  });


            }
            if (!response.ok) {
                toast.error("Invalid Credentials")
                return "";
            }


        } else {
            toast.warning("Wrong OTP")
        }

    }

    return (
        <div>
            {showOTP ? <>
                <FadeIn
                    from="right"
                    positionOffset={200}
                    triggerOffset={100}
                    delayInMilliseconds={50}
                >

                    <h3 className='mb-3'> We sent your code </h3>
                    <form onSubmit={verifyOTP}>
                        <div style={{ width: '70%' }}>
                            <div >
                                <label className="form-label" for="formInputExample1">You will receive the OTP , if your email have registered with us</label>
                                <input required style={{ borderRadius: 20 }} type="number" className="form-control fsign mb-5" id="formInputExample1" placeholder="Enter Your OTP" value={code} onChange={(e) => setcode(e.target.value)} />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                            <button style={{
                                    borderRadius: 20, height: 55, backgroundColor: '#f53232', fontFamily: 'roboto', color: 'white',
                                    textTransform: 'unset', fontSize: '16px', boxShadow: '2px 19px 31px rgba(0, 0, 0, 0.2)'
                                }} onClick={change}
                                    className='form-control mb-4'>Back</button>

                            <input className="form-control mb-4"
                                style={{
                                    borderRadius: 20, height: 55, backgroundColor: '#4461f2', fontFamily: 'roboto', color: 'white',
                                    textTransform: 'unset', fontSize: '16px', boxShadow: '2px 19px 31px rgba(0, 0, 0, 0.2)'
                                }} type='submit' value="Submit" block>
                            </input>

                            </div>
                        </div>
                    </form>
                </FadeIn>
            </> : <></>}

            {verify ? <>

                <FadeIn
                    from="right"
                    positionOffset={200}
                    triggerOffset={100}
                    delayInMilliseconds={50}
                >
                    <h3 className='mb-3'> Recover your Password </h3>
                    <form onSubmit={checkId}>

                        <div style={{ width: '70%' }}>
                            <span className='me-3'> <b>Select Role: </b></span>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value='User' required onChange={(e) => setRole(e.target.value)} />
                                <label className="form-check-label" for="inlineRadio1">User</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value='Employee' onChange={(e) => setRole(e.target.value)} />
                                <label className="form-check-label" for="inlineRadio2">Employee</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value='Institute' disabled onChange={(e) => setRole(e.target.value)} />
                                <label className="form-check-label" for="inlineRadio3">Institute</label>
                            </div>

                            <div >
                                <label className="form-label" for="formInputExample1"></label>
                                <input style={{ borderRadius: 20 }} type="text" className="form-control fsign" id="formInputExample1" placeholder="Email Address" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
                            </div>

                            <p style={{ fontSize: 14 }} className="mt-3 ms-3" >You will get the OTP , if your email have registered with us</p>

                            <div >
                                <label className="form-label" for="formInputExample2"></label>
                                <input style={{ borderRadius: 20 }} type="password" className="form-control fsign" id="formInputExample2" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            <div className="mb-4">
                                <label className="form-label" for="formInputExample3"></label>
                                <input style={{ borderRadius: 20 }} id={style} type="password" className="form-control fsign" placeholder="Confirm Password" value={cpassword}
                                    onChange={(e) => setCpassword(e.target.value)} />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                                <button style={{
                                    borderRadius: 20, height: 55, backgroundColor: '#f53232', fontFamily: 'roboto', color: 'white',
                                    textTransform: 'unset', fontSize: '16px', boxShadow: '2px 19px 31px rgba(0, 0, 0, 0.2)'
                                }} onClick={change}
                                    className='form-control mb-4'>Back</button>

                                <input className="form-control mb-4"
                                    style={{
                                        borderRadius: 20, height: 55, backgroundColor: '#4461f2', fontFamily: 'roboto', color: 'white',
                                        textTransform: 'unset', fontSize: '16px', boxShadow: '2px 19px 31px rgba(0, 0, 0, 0.2)'
                                    }} type='submit' value="Next" block>
                                </input>


                            </div>


                        </div>

                    </form>
                </FadeIn>
            </> : <></>}



        </div>
    )
}
