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

class BorrowRequestForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputEmployeeID: '',
            inputAssetModelName: '',
            inputAssetModelManafacturer: '',
            inputQuantity: '',
            inputStartDate: '',
            inputEndDate: ''
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
            inputEmployeeID: '',
            inputAssetModelName: '',
            inputAssetModelManafacturer: '',
            inputQuantity: '',
            inputStartDate: '',
            inputEndDate: ''
        })
    }

    render() {
        return (
            <CCard>
                <CCardHeader>Create a Borrow Request</CCardHeader>
                <CCardBody>
                    <CForm action="" method="post" onReset={this.resetInputHandler} encType="multipart/form-data" className="form-horizontal">
                    <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="email-input">Employee ID</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="text" 
                                value={this.state.inputEmployeeID} 
                                onChange={this.inputChangeHandler}
                                id="employeeId-input" 
                                name="employeeId" 
                                placeholder="for e.g. EX124" 
                                autoComplete="name" /> 
                                
                            </CCol> 
                            
                        </CFormGroup>
    
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="assetmodelame-input">Asset Model Name</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput 
                                type="text" 
                                value={this.state.inputAssetModelName} 
                                onChange={this.inputChangeHandler}
                                id="assetModel-input" 
                                name="inputassetModel" 
                                placeholder='for e.g. Macbook 13" '
                                autoComplete="name" />
                            </CCol>
                        </CFormGroup>
    
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="assetmodelmanafacturer-input">Asset Manafacturer</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput
                                    name="inputAddress"
                                    type="text" 
                                    value={this.state.inputAssetModelManafacturer} 
                                    onChange={this.inputChangeHandler}
                                    id="manafacturer-input"
                                    rows="2"
                                    placeholder="for e.g. Apple"
                                />
                            </CCol>
                        </CFormGroup>
{/* 
                        inputQuantity: '',
            inputStartDate: '',
            inputEndDate: '' */}


                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="quantity-input">Quantity</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput
                                    name="inputQuantity"
                                    type="text" 
                                    value={this.state.inputQuantity} 
                                    onChange={this.inputChangeHandler}
                                    id="quantity-input"
                                    rows="2"
                                    placeholder="for e.g. 1"
                                />
                            </CCol>
                        </CFormGroup>

                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="startdate-input">Start Date</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput
                                    name="inputStartDate"
                                    type="date" 
                                    value={this.state.inputStartDate} 
                                    onChange={this.inputChangeHandler}
                                    id="startdate-input"
                                    rows="2"
                                />
                            </CCol>
                        </CFormGroup>

                            <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="enddate-input">End Date</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput
                                    name="inputEndDate"
                                    type="date" 
                                    value={this.state.inputEndDate} 
                                    onChange={this.inputChangeHandler}
                                    id="enddate-input"
                                    rows="2"
                                />
                            </CCol>
                        </CFormGroup>


                <CCardFooter >
                    <CButton style={{marginRight:"30px", marginLeft: "-20px"}} type="submit" size="md" color="success"><FontAwesomeIcon icon={All.faCheckCircle} />Submit</CButton>
                    <CButton style={{marginRight:"30px"}} type="reset" size="md" color="danger"> <FontAwesomeIcon icon={All.faCircle} /> Reset</CButton> 
                    <CButton style={{marginRight:"30px"}} to={"/borrowrequest/borrowRequestList"} type="reset" size="md" color="primary"> <FontAwesomeIcon  icon={All.faArrowAltCircleLeft} /> Back</CButton>
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

export default BorrowRequestForm ;

