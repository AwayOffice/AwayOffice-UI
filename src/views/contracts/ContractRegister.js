import React, { Component } from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CForm,
    CFormGroup,
    CInput,
    CLabel,
} from '@coreui/react'
import CIcon from '@coreui/icons-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as All from '@fortawesome/free-solid-svg-icons'

class ContractRegister extends Component {
    constructor(props) {
        super(props);

        this.state = {
          inputType: '',
          inputDescription: '',
          inputStatus: ''
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
            inputType: '',
            inputDescription: '',
            inputStatus: ''
        })
    }

    render() {
        return (
            <CCard>
                <CCardHeader>Register New Contract</CCardHeader>
                <CCardBody>
                    <CForm action="" method="post" onReset={this.resetInputHandler} encType="multipart/form-data" className="form-horizontal">
                    <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="email-input">Contract Type</CLabel>
                            </CCol>
                            {/* Contract type can be a dropdown */}
                            <CCol xs="12" md="9">
                                <CInput type="text" 
                                value={this.state.inputName} 
                                onChange={this.inputChangeHandler}
                                id="name-input" 
                                name="inputName" 
                                placeholder="Contract Type" 
                                autoComplete="name" /> 
                                
                            </CCol> 
                            
                        </CFormGroup>
    
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="email-input">Contract Description</CLabel>
                            </CCol>

                            {/* Contract Description can be a textarea */}
                            <CCol xs="12" md="9">
                                <CInput 
                                type="email" 
                                value={this.state.inputEmail} 
                                onChange={this.inputChangeHandler}
                                id="email-input" 
                                name="inputEmail" 
                                placeholder="Contract Description" 
                                autoComplete="email" />
                            </CCol>
                        </CFormGroup>
    
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="address-input">Contract Status</CLabel>
                            </CCol>
                            {/* Status can also be a dropdown */}
                            <CCol xs="12" md="9">
                                <CInput
                                    name="inputAddress"
                                    value={this.state.inputAddress} 
                                    onChange={this.inputChangeHandler}
                                    id="address-input"
                                    rows="2"
                                    placeholder="Contract Status..."
                                />
                            </CCol>
                        </CFormGroup>

                <CCardFooter >
                    <CButton style={{marginRight:"30px", marginLeft: "-20px"}} type="submit" size="md" color="success"><FontAwesomeIcon icon={All.faCheckCircle} />Register</CButton>
                    <CButton style={{marginRight:"30px"}} type="reset" size="md" color="danger"> <FontAwesomeIcon icon={All.faCircle} /> Reset </CButton> 
                    <CButton style={{marginRight:"30px"}} to={"/vendor/vendorList"} type="reset" size="md" color="primary"> <FontAwesomeIcon  icon={All.faArrowAltCircleLeft} /> Go Back </CButton>
                </CCardFooter>
    
                    </CForm>
                </CCardBody>
            </CCard>
        )

    }
    
}

export default ContractRegister
