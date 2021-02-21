import React, { Component } from 'react';
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
import ContractService from '../../api/ContractService.js'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class ContractRegister extends Component {
    constructor(props) {
        super(props);

        this.state = {        
        registeredContract: {},

        id: '',
        type: '',
        description: '',
        status: ''
        };
      }

    //custom methods

    inputChangeHandler = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    resetInputHandler = () => {
        this.setState({
            type: '',
            description: '',
            status: ''
        })
    }

    createContractHandler = (event) => {
        event.preventDefault();
    
        let contract = {            
            type: this.state.type,
            description: this.state.description,
            status: this.state.status,
        }

        let headers =  {
            headers:
            {
                'Authorization': 'Bearer ' + this.props.token,
                "Content-Type": "application/json",                    
            }}        

        if (!this.props.token) {
            NotificationManager.warning("Authentication Error. Please Login Again");
        } else if(!contract) {
            NotificationManager.warning("Incorrect Request Body");
        } else {
            ContractService.createContractHandler(contract, headers)
            .then(response => {
                console.log(response);
                if(response.status === 201) {
                    NotificationManager.success(`Contract with id: ${response.data.id} is successfully registered`, response.statusText)             
                    this.setState({registeredContract: response.data})                                           
                }                    
                })
                .catch(error => console.log(error.toString()))          
        }        
    }

    render() {
        return (
            <div>
                <CCard>
                <CCardHeader>Register New Contract</CCardHeader>
                <CCardBody>
                    <CForm onSubmit={this.createContractHandler} onReset={this.resetInputHandler} encType="multipart/form-data" className="form-horizontal">                
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="email-input">Contract Type</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="text" 
                                value={this.state.type} 
                                onChange={this.inputChangeHandler}
                                id="type" 
                                name="type" 
                                placeholder="Enter Contract Type" 
                                autoComplete="type" />                                 
                            </CCol>                             
                        </CFormGroup>                           

                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="address-input">Description</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CTextarea
                                    name="description"
                                    id="description"
                                    value={this.state.description} 
                                    onChange={this.inputChangeHandler}
                                    rows="2"
                                    placeholder="Enter Contract Description"
                                />                            
                            </CCol>
                        </CFormGroup>

                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="email-input">Status</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput 
                                type="text" 
                                value={this.state.status} 
                                onChange={this.inputChangeHandler}
                                id="status" 
                                name="status" 
                                placeholder="Enter Contract Status" 
                                autoComplete="status" />
                            </CCol>
                        </CFormGroup>

                <CCardFooter> <br/> 
                    <CButton style={{marginRight:"30px", marginLeft: "-20px"}} type="submit" size="md" color="success"><FontAwesomeIcon icon={All.faCheckCircle} />Register Contract</CButton>
                    <CButton style={{marginRight:"30px"}} type="reset" size="md" color="danger"> <FontAwesomeIcon icon={All.faCircle} />Reset</CButton> 
                    <CButton style={{marginRight:"30px"}} to={"/contract/contractList"} type="reset" size="md" color="primary"> <FontAwesomeIcon  icon={All.faArrowAltCircleLeft} />Back</CButton>
                </CCardFooter> <hr/>
                    </CForm> 
                    <CCardHeader>The Created Contract is</CCardHeader>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Type</th>
                            <th scope="col">Description</th>
                            <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">{this.state.registeredContract.id}</th>
                            <td>{this.state.registeredContract.type}</td>
                            <td>{this.state.registeredContract.description}</td>
                            <td>{this.state.registeredContract.status}</td>
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
  })(ContractRegister);
