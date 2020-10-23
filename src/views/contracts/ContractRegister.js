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
    CTextarea,
    CSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as All from '@fortawesome/free-solid-svg-icons'

class ContractRegister extends Component {
    constructor(props) {
        super(props);

        this.state = {
        contractType: '',
        contractDescription: '',
        contractStatus: ''
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
            contractType: '',
            contractDescription: '',
            contractStatus: ''
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
                                id="contractType" 
                                name="contractType" 
                                placeholder="Contract Type" 
                                autoComplete="name" /> 
                                
                            </CCol> 
                            
                        </CFormGroup>
    
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="email-input">Contract Description</CLabel>
                            </CCol>

                            <CCol xs="12" md="9">
                            <CTextarea
                                name="contractDescription"
                                id="contractDescription"
                                value={this.state.inputAddress} 
                                onChange={this.inputChangeHandler}
                                rows="2"
                                placeholder="Contract Description"
                            />
                            </CCol>
                        </CFormGroup>
    
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="address-input">Contract Status</CLabel>
                            </CCol>
                            {/* Status can also be a dropdown */}
                            <CCol xs="12" md="9">
                                <CSelect custom name="contractStatus" id="contractStatus" 
                                    value={this.state.inputAddress} 
                                    onChange={this.inputChangeHandler}>
                                    <option value="0">Select Status</option>
                                    <option value="1">Active</option>
                                    <option value="2">Blocked</option>
                                    <option value="3">Expired</option>
                                </CSelect>
                            </CCol>
                        </CFormGroup>

                <CCardFooter >
                    <CButton style={{marginRight:"30px", marginLeft: "-20px"}} type="submit" size="md" color="success"><FontAwesomeIcon icon={All.faCheckCircle} />Register</CButton>
                    <CButton style={{marginRight:"30px"}} type="reset" size="md" color="danger"> <FontAwesomeIcon icon={All.faCircle} /> Reset </CButton> 
                    <CButton style={{marginRight:"30px"}} to={"/contract/contractList"} type="reset" size="md" color="primary"> <FontAwesomeIcon  icon={All.faArrowAltCircleLeft} /> Go Back </CButton>
                </CCardFooter>
    
                    </CForm>
                </CCardBody>
            </CCard>
        )

    }
    
}

export default ContractRegister
