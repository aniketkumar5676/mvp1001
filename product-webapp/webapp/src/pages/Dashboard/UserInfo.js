import  {React,useState} from "react"
import './Dashboard.css';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
} from 'mdb-react-ui-kit';
import Updateuser from './Updateuser';


const UserInfo = ({user,merchant}) => {

  const [showUpdateUser,setshowUpdateUser] = useState(false)
  const [showUserInfo,setshowUserInfo] = useState(true)

    
  const updateuser = ()=> {
    setshowUpdateUser(true)
    setshowUserInfo(false)
  }
 
  
    return(
        <div >
          {showUserInfo &&  
            <section style={{ backgroundColor: 'white' }}>
              <MDBContainer className="py-5">
              <MDBRow>
                  <MDBCol lg="4">
                    <MDBCard className="mb-4">
                      <MDBCardBody className="text-center">
                        <MDBCardImage
                          src="https://img.freepik.com/premium-vector/male-avatar-flat-icon-design-vector-illustration_549488-103.jpg?w=740"
                          alt="avatar"
                          className="rounded-circle "
                          style={{ width: '150px' , marginLeft:"auto",marginRight:"auto"}}
                          fluid  /><br/>
                        <p className="text-muted mb-1"><b>{user.username}</b></p>
                        <br></br>
                        {/* <p className="text-muted mb-4"><b>Address</b></p> */}
                        <div className="d-flex justify-content-center mb-2">
                          {/* {/* <MDBBtn>Follow</MDBBtn> */}
                          {/* <MDBBtn outline className="ms-1" onClick={updateuser} >Update User</MDBBtn>  */}
                          <button type="submit" className="btn btn-sm btn-primary" onClick={updateuser} style = {{marginLeft:"auto",marginRight:"auto"}}>Update User</button>
                        </div>
                        
                      </MDBCardBody>
                    </MDBCard>
                    </MDBCol>
                  <MDBCol lg="8">
                    <MDBCard className="mb-4">
                      <MDBCardBody>
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText><i className="bi bi-person-fill"></i>&nbsp;&#160;<b>User Id</b></MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <MDBCardText className="text-muted">{user.userId}</MDBCardText>
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText><i className="bi bi-person-vcard-fill"></i>&#160;&#160;<b>User Name</b></MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <MDBCardText className="text-muted">{user.username}</MDBCardText>
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText><i className="bi bi-envelope-fill"></i>&#160;&#160;<b>Email</b></MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <MDBCardText className="text-muted">{user.email_id}</MDBCardText>
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText><i className="bi bi-telephone-fill"></i>&#160;&#160;<b>Contact</b></MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <MDBCardText className="text-muted">{user.contact_no}</MDBCardText>
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText><i className="bi bi-house-fill"></i>&#160;&#160;<b>Address</b></MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <MDBCardText className="text-muted">{user.address}</MDBCardText>
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText><i className="bi bi-buildings-fill"></i>&#160;&#160;<b>City</b></MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <MDBCardText className="text-muted">{user.city}</MDBCardText>
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText><i className="bi bi-geo-fill"></i>&#160;&#160;<b>Country</b></MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <MDBCardText className="text-muted">{user.country}</MDBCardText>
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBRow>
                          <MDBCol sm="3">
                            <MDBCardText><i className="bi bi-geo-alt-fill" ></i>&#160;&#160;<b>Zip Code</b></MDBCardText>
                          </MDBCol>
                          <MDBCol sm="9">
                            <MDBCardText className="text-muted">{user.zip}</MDBCardText>
                          </MDBCol>
                        </MDBRow>
                      </MDBCardBody>
                    </MDBCard>
                    </MDBCol>
                </MDBRow>
              </MDBContainer>
            </section>
            }
            { showUpdateUser && <Updateuser user={user}/>}

        </div>
    )
}

export default UserInfo

