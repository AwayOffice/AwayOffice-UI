import React, {Component} from 'react';
import {
    CButton,
    CCard,
    CTextarea,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CForm,
    CFormGroup,
    CInput,
    CLabel,
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as All from '@fortawesome/free-solid-svg-icons'

class VendorRegister extends Component {
    constructor(props) {
        super(props);

        this.state = {
          vendorName: '',
          homeAddress: '',
          emailAddress: ''
        };
      }

    inputChangeHandler = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    resetInputHandler = () => {
        this.setState({
            vendorName: '',
            homeAddress: '',
            emailAddress: ''
        })
    }

    render() {
        return (
            <CCard>
                <CCardHeader>Register New Vendor</CCardHeader>
                <CCardBody>
                    <CForm action="" method="post" onReset={this.resetInputHandler} encType="multipart/form-data" className="form-horizontal">
                    <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="email-input">Vendor Name</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="text" 
                                value={this.state.inputName} 
                                onChange={this.inputChangeHandler}
                                id="vendorName" 
                                name="vendorName" 
                                placeholder="Enter Name" 
                                autoComplete="name" /> 
                                
                            </CCol> 
                            
                        </CFormGroup>
    
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="email-input">Email Address</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput 
                                type="email" 
                                value={this.state.inputEmail} 
                                onChange={this.inputChangeHandler}
                                id="emailAddress" 
                                name="emailAddress" 
                                placeholder="Enter Email" 
                                autoComplete="email" />
                            </CCol>
                        </CFormGroup>
    
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="address-input">Home Address</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CTextarea
                                    name="homeAddress"
                                    id="homeAddress"
                                    // value={this.state.inputAddress} 
                                    onChange={this.inputChangeHandler}
                                    rows="2"
                                    placeholder="Home Address"
                                />

                                {/* <CInput
                                    name="inputAddress"
                                    value={this.state.inputAddress} 
                                    onChange={this.inputChangeHandler}
                                    id="address-input"
                                    rows="2"
                                    placeholder="Home Address..."
                                /> */}
                            </CCol>
                        </CFormGroup>

                <CCardFooter >
                    <CButton style={{marginRight:"30px", marginLeft: "-20px"}} type="submit" size="md" color="success"><FontAwesomeIcon icon={All.faCheckCircle} />Submit</CButton>
                    <CButton style={{marginRight:"30px"}} type="reset" size="md" color="danger"> <FontAwesomeIcon icon={All.faCircle} /> Reset</CButton> 
                    <CButton style={{marginRight:"30px"}} to={"/vendor/vendorList"} type="reset" size="md" color="primary"> <FontAwesomeIcon  icon={All.faArrowAltCircleLeft} /> Back</CButton>
                </CCardFooter>
    
                    </CForm>
                </CCardBody>
                {/* <CCardFooter >
                    <CButton style={{marginRight:"30px"}} type="submit" size="md" color="success"><FontAwesomeIcon icon={All.faCheckCircle} />Submit</CButton>
                    <CButton style={{marginRight:"30px"}} type="reset" size="md" color="danger"> <FontAwesomeIcon icon={All.faCircle} /> Reset</CButton> 
                    <CButton style={{marginRight:"30px"}} to={"/vendor/vendorList"} type="reset" size="md" color="primary"> <FontAwesomeIcon  icon={All.faArrowAltCircleLeft} /> Back</CButton>
                </CCardFooter> */}
            </CCard>
        )

    }
    
}

export default VendorRegister
