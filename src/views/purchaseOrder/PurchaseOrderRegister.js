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
    CSelect,
} from '@coreui/react'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as All from '@fortawesome/free-solid-svg-icons'

class PurchaseOrderRegister extends Component {
    constructor(props) {
        super(props);

        this.state = {
          issueDate: '',
          paymentSchedule: '',
          poStatus: '',
          contactEmail: ''
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
            issueDate: '',
            paymentSchedule: '',
            poStatus: '',
            contactEmail: ''
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
                                <CInput type="date" 
                                value={this.state.inputName} 
                                onChange={this.inputChangeHandler}
                                id="issueDate" 
                                name="issueDate"                                 
                                autoComplete="date" />             
                            </CCol>                             
                        </CFormGroup>
    
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="email-input">Payment Schedule</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput 
                                type="date" 
                                value={this.state.inputEmail} 
                                onChange={this.inputChangeHandler}
                                id="paymentSchedule" 
                                name="paymentSchedule"             
                            />
                            </CCol>
                        </CFormGroup>
    
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="poStatus"> PO Status</CLabel>
                            </CCol>
                            
                            <CCol xs="12" md="9">
                            <CSelect custom name="poStatus" id="poStatus" 
                                    value={this.state.inputAddress} 
                                    onChange={this.inputChangeHandler}>
                                    <option value="0">Select Status</option>
                                    <option value="1">Pending</option>
                                    <option value="2">Accepted</option>
                                    <option value="3">Rejected</option>
                                    <option value="4">Cancelled</option>
                                    <option value="5">Received</option>
                                    <option value="6">Completed</option>
                                </CSelect>
                                
                                {/* <CInput name="inputAddress"
                                    value={this.state.inputAddress} 
                                    onChange={this.inputChangeHandler}
                                    id="status-input"
                                    rows="2"
                                    placeholder="Status"
                                /> */}
                            </CCol>
                        </CFormGroup>


                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="contactEmail">Contact Email</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                {/* <CTextarea
                                    name="contactEmail"
                                    id="contactEmail"
                                    value={this.state.contactEmail} 
                                    onChange={this.inputChangeHandler}
                                    rows="2"
                                    placeholder="Contact Email"
                                /> */}
                                <CInput
                                    name="contactEmail"
                                    value={this.state.contactEmail} 
                                    onChange={this.inputChangeHandler}
                                    id="contactEmail"
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
