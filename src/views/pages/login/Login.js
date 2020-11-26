import React, { Component } from 'react'


import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Logo from '../../../assets/favicon.png'
import './Login.css'

import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
      username: undefined,
      password: undefined,
      isLoggedin: undefined,
    }
  }

  inputChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  loginHandler = (event) => {
    event.preventDefault();
    console.log("Here 1")
    axios.post('http://localhost:8070/api/authenticate',
            {
                "username":"admin",
                "password":"admin",
            }).then(response =>{
                this.setState({token: response.data.accessToken});
                console.log(this.state.token);
                if(this.state.token && this.state.username === 'admin' && this.state.password === "admin") {
                  this.props.history.push(`/`);                                                                   
                } else this.setState({isLoggedin: false});
                
            }).catch(error => console.log(error.toString()));
    }
 
    render () {
      return (
        <div className="c-app c-default-layout flex-row align-items-center">
          <CContainer>
            <CRow className="justify-content-center">
              <CCol md="8">
                <CCardGroup>
                  <CCard className="p-4">
                    <CCardBody>
                      <CForm onSubmit={this.loginHandler}>
                        <span style={{textAlign:"center"}}><h1 style={{color:'rgb(18, 49, 110)'}}>Login</h1>
                        <p className="text-muted">Sign In to your Kuehne+Nagel account</p></span>
                        <hr/>
                        <br/>
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-user" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput name="username" onChange={this.inputChangeHandler} type="text" placeholder="Username" autoComplete="off" />
                        </CInputGroup>

                        <CInputGroup className="mb-4">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-lock-locked" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput name="password" onChange={this.inputChangeHandler} type="password" placeholder="Password" autoComplete="off" />
                        </CInputGroup>
                        {
                          this.state.isLoggedin === false  ?                        
                          <CAlert color="warning" style={{color: "black"}} closeButton>
                            Invalid Credentials!
                          </CAlert>
                          : null
                        }
                        <CRow>
                          <CCol xs="6">
                            <CButton  type="submit" className="px-4 LoginButton">Login</CButton>
                          </CCol>            
                        </CRow>
                      </CForm>
                    </CCardBody>
                  </CCard>
                  <CCard className="text-white bg-white py-5 d-md-down-none" style={{ width: '44%'}}>
                    <CCardBody className="text-center" >
                      <div>
                        <br/>
                        <img src={Logo} style={{ width: '60%'}} className='element' alt="Siktir"/>
                      </div>
                    </CCardBody>
                  </CCard>
                </CCardGroup>
              </CCol>
            </CRow>
          </CContainer>
          {/* {
            this.state.token !== '' ?
            this.props.history.push("/dashboard")
            : null                    
          } */}
        </div>

      )
    }
}

export default Login
