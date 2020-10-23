import React, {Component} from 'react';
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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as All from '@fortawesome/free-solid-svg-icons'

class PurchaseOrderRegister extends Component {
    constructor(props) {
        super(props);

        this.state = {
          inputName: '',
          inputAddress: '',
          inputEmail: ''
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
            inputName: '',
            inputAddress: '',
            inputEmail: ''
        })
    }

    render() {
        return (
            <CCard>
                <CCardHeader>Create new Purchase Order</CCardHeader>
                <CCardBody>
                    <CForm action="" method="post" onReset={this.resetInputHandler} encType="multipart/form-data" className="form-horizontal">
                    <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="email-input">Issue Date</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="text" 
                                value={this.state.inputName} 
                                onChange={this.inputChangeHandler}
                                id="date-input" 
                                name="dateInput" 
                                placeholder="Enter Date" 
                                autoComplete="date" /> 
                                
                            </CCol> 
                            
                        </CFormGroup>
    
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="email-input">Payment Schedule</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput 
                                type="email" 
                                value={this.state.inputEmail} 
                                onChange={this.inputChangeHandler}
                                id="schedule-input" 
                                name="scheduleInput" 
                                placeholder="Enter Schedule - Date Format" 
                                autoComplete="email" />
                            </CCol>
                        </CFormGroup>
    
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="address-input">Status</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput
                                // a dropdown should be used here!!!
                                    name="inputAddress"
                                    value={this.state.inputAddress} 
                                    onChange={this.inputChangeHandler}
                                    id="status-input"
                                    rows="2"
                                    placeholder="Status"
                                />
                            </CCol>
                        </CFormGroup>


                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="address-input">Contact</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput
                                    name="inputContactEmail"
                                    value={this.state.inputAddress} 
                                    onChange={this.inputChangeHandler}
                                    id="status-input"
                                    rows="2"
                                    placeholder="Contact Email"
                                />
                            </CCol>
                        </CFormGroup>

                <CCardFooter >
                    <CButton style={{marginRight:"30px", marginLeft: "-20px"}} type="submit" size="md" color="success"><FontAwesomeIcon icon={All.faCheckCircle} />Submit</CButton>
                    <CButton style={{marginRight:"30px"}} type="reset" size="md" color="danger"> <FontAwesomeIcon icon={All.faCircle} /> Reset</CButton> 
                    <CButton style={{marginRight:"30px"}} to={"/purchaseOrder/purchaseOrderList"} type="reset" size="md" color="primary"> <FontAwesomeIcon  icon={All.faArrowAltCircleLeft} /> Back</CButton>
                </CCardFooter>
    
                    </CForm>
                </CCardBody>
            </CCard>
        )

    }
    
}

export default PurchaseOrderRegister
