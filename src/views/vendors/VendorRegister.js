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


import {connect} from 'react-redux';
import VendorService from '../../api/VendorService.js'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class VendorRegister extends Component {

    // Constructor
    constructor(props) {
        super(props);

        this.state = {            
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

        let headers =  {
            headers:
            {
                'Authorization': 'Bearer ' + this.props.token,
                "Content-Type": "application/json",                    
            }}

        if (!this.props.token) {
            NotificationManager.warning("Authentication Error. Please Login Again");
        } else if(!vendor) {
            NotificationManager.warning("Incorrect Request Body");
        } else {
            VendorService.createVendorHandler(vendor, headers)
            .then(response => {
                console.log(response);
                if(response.status === 201) {
                    NotificationManager.success(`${this.state.name} is successfully registered`, response.statusText)             
                    //alert(`Vendor: ${this.state.name} is successfully registered!`);
                    this.setState({registeredVendor: response.data});                                           
                } else {
                    console.log(response);
                    NotificationManager.warning("Please check the console for details", response.statusText)
                }
            }).catch(error => {
                let errorMessage;
                if (error.response) {
                    errorMessage = "Some unknown error occurred!";
                    this.setState({errorMessage: errorMessage})
                } else if (error.request) {
                    errorMessage = "The request was made but no response was received";
                    this.setState({errorMessage: errorMessage})
                    console.log(error.request);
                } else {
                    errorMessage = error.message;
                    this.setState({errorMessage: errorMessage})
                    console.log('Error', error.message);
                }
                NotificationManager.warning(errorMessage, 'OOPS...');   
            })          
        }        
    }

    render() {
        return (
            <div>
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
                <NotificationContainer/>
            </div>
        )

    }
    
}

export default connect((store) => {
    return {
      token: store.token
    }
  })(VendorRegister);

