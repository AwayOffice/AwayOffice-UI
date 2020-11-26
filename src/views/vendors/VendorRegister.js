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

import axios from "axios";

class VendorRegister extends Component {
    constructor(props) {
        super(props);

        this.state = {
        //   vendorID: '',
          vendorName: '',
          vendorHomeAddress: '',
          vendorEmailAddress: '',

          //create vendor,
          createVendorID: '',
          createVendorName: '',
          createVendorAddress: '',
          createVendorEmail: '',
          createdVendorData: {}
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

    createVendorHandler = (event) => {
        event.preventDefault();
    
        let vendor = {
            id: this.state.vendorID,
            name: this.state.vendorName,
            address: this.state.vendorHomeAddress,
            email: this.state.vendorEmailAddress,
        }
        
        axios.post('http://localhost:8070/api/authenticate',
        {
            "username":"admin",
            "password":"admin",
        }).then(response =>{
            this.setState({token: response.data.accessToken});
            console.log(this.state.token)                               
            axios.post('http://localhost:8070/api/hr/vendors/', vendor,
            {
                headers:
                {
                    'Authorization': 'Bearer ' + this.state.token,
                    "Content-Type": "application/json",                    
                }}).then(response => {
                    this.setState({createdVendorData: response.data})   
                    console.log(response)
                })
                .catch(error => console.log(error.toString()))                   
        }).catch(error => console.log(error.toString()));
    }

    render() {
        return (
            <CCard>
                <CCardHeader>Register New Vendor</CCardHeader>
                <CCardBody>
                    <CForm onSubmit={this.createVendorHandler} onReset={this.resetInputHandler} encType="multipart/form-data" className="form-horizontal">
                    {/* <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="email-input">Vendor ID</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="text" 
                                value={this.state.inputName} 
                                onChange={this.inputChangeHandler}
                                id="vendorID" 
                                name="vendorID" 
                                placeholder="Enter ID" 
                                autoComplete="id" />                                 
                            </CCol>                             
                        </CFormGroup> */}

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
                                <CLabel htmlFor="address-input">Home Address</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CTextarea
                                    name="vendorHomeAddress"
                                    id="homeAddress"
                                    value={this.state.inputAddress} 
                                    onChange={this.inputChangeHandler}
                                    rows="2"
                                    placeholder="Home Address"
                                />                            
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
                                name="vendorEmailAddress" 
                                placeholder="Enter Email" 
                                autoComplete="email" />
                            </CCol>
                        </CFormGroup>

                <CCardFooter >
                    <CButton style={{marginRight:"30px", marginLeft: "-20px"}} type="submit" size="md" color="success"><FontAwesomeIcon icon={All.faCheckCircle} />Submit</CButton>
                    <CButton style={{marginRight:"30px"}} type="reset" size="md" color="danger"> <FontAwesomeIcon icon={All.faCircle} /> Reset</CButton> 
                    <CButton style={{marginRight:"30px"}} to={"/vendor/vendorList"} type="reset" size="md" color="primary"> <FontAwesomeIcon  icon={All.faArrowAltCircleLeft} /> Back</CButton>
                </CCardFooter>    
                    </CForm> 
                    <CCardHeader>The Created Vendor is</CCardHeader>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">{this.state.createdVendorData.id}</th>
                            <td>{this.state.createdVendorData.name}</td>
                            <td>{this.state.createdVendorData.address}</td>
                            <td>{this.state.createdVendorData.email}</td>
                            </tr>                          
                        </tbody>
                        </table>    
                </CCardBody>               
            </CCard>
        )

    }
    
}

export default VendorRegister
