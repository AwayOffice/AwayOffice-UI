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

import {connect} from 'react-redux';

class VendorRegister extends Component {

    // Constructor
    constructor(props) {
        super(props);

        this.state = {
            token: '',
            registeredVendor: {},

            id: '',
            name: '',
            address: '',
            email: '',
        };
      }


    // custom methods
       
    inputChangeHandler = (event) => {        
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    resetInputHandler = () => {
        this.setState({
            name: '',
            address: '',
            email: ''
        })
    }

    createVendorHandler = (event) => {
        event.preventDefault();
    
        let vendor = {            
            name: this.state.name,
            address: this.state.address,
            email: this.state.email,
        }

        console.log(this.props.token + " => HERE5 RegisterVendor");

        axios.post('http://localhost:8070/api/hr/vendors/', vendor,
        {
            headers:
            {
                'Authorization': 'Bearer ' + this.props.token,
                "Content-Type": "application/json",                    
            }}).then(response => {
                alert(`Vendor: ${this.state.name} is successfully registered!`)
                this.setState({registeredVendor: response.data})                       
                console.log(response)
            })
            .catch(error => console.log(error.toString()))  
        
        // axios.post('http://localhost:8070/api/authenticate',
        // {
        //     "username":"admin",
        //     "password":"admin",
        // }).then(response =>{
        //     this.setState({token: response.data.accessToken});
        //     console.log(this.state.token)                               
        //     axios.post('http://localhost:8070/api/hr/vendors/', vendor,
        //     {
        //         headers:
        //         {
        //             'Authorization': 'Bearer ' + this.state.token,
        //             "Content-Type": "application/json",                    
        //         }}).then(response => {
        //             alert(`Vendor: ${this.state.name} is successfully registered!`)
        //             this.setState({registeredVendor: response.data})                       
        //             console.log(response)
        //         })
        //         .catch(error => console.log(error.toString()))                   
        // }).catch(error => console.log(error.toString()));
    }

    render() {
        return (
            <CCard>
                <CCardHeader>Register New Vendor</CCardHeader>
                <CCardBody>
                    <CForm onSubmit={this.createVendorHandler} onReset={this.resetInputHandler} encType="multipart/form-data" className="form-horizontal">                
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="email-input">Vendor Name</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="text" 
                                value={this.state.name} 
                                onChange={this.inputChangeHandler}
                                id="name" 
                                name="name" 
                                placeholder="Enter Vendor Name" 
                                autoComplete="name" />                                 
                            </CCol>                             
                        </CFormGroup>                           
    
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="address-input">Home Address</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CTextarea
                                    name="address"
                                    id="address"
                                    value={this.state.address} 
                                    onChange={this.inputChangeHandler}
                                    rows="2"
                                    placeholder="Enter Vendor Home Address"
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
                                value={this.state.email} 
                                onChange={this.inputChangeHandler}
                                id="email" 
                                name="email" 
                                placeholder="Enter Vendor Email" 
                                autoComplete="email" />
                            </CCol>
                        </CFormGroup>

                <CCardFooter> <br/> 
                    <CButton style={{marginRight:"30px", marginLeft: "-20px"}} type="submit" size="md" color="success"><FontAwesomeIcon icon={All.faCheckCircle} /> Register Vendor</CButton>
                    <CButton style={{marginRight:"30px"}} type="reset" size="md" color="danger"> <FontAwesomeIcon icon={All.faCircle} /> Reset</CButton> 
                    <CButton style={{marginRight:"30px"}} to={"/vendor/vendorList"} type="reset" size="md" color="primary"> <FontAwesomeIcon  icon={All.faArrowAltCircleLeft} /> Back</CButton>
                </CCardFooter> <hr/>
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
                            <th scope="row">{this.state.registeredVendor.id}</th>
                            <td>{this.state.registeredVendor.name}</td>
                            <td>{this.state.registeredVendor.address}</td>
                            <td>{this.state.registeredVendor.email}</td>
                            </tr>                          
                        </tbody>
                        </table>    
                </CCardBody>               
            </CCard>
        )

    }
    
}

export default connect((store) => {
    return {
      token: store.token
    }
  })(VendorRegister);

