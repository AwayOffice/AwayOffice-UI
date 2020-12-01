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

    CTextarea,
    CInput,

    CLabel,
    CSelect,
} from '@coreui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as All from '@fortawesome/free-solid-svg-icons'

import axios from "axios";

class EmployeeRegister extends Component {

    //Constructor
    constructor(props) {
        super(props)

        this.state = {
            registeredEmployee: {},

            full_name: '',
            status: 'ACTIVE',
            department: 'IT',
            home_address: '',
            phone_number: '',
            email_address: ''
        }

        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.createEmployee = this.createEmployee.bind(this);
    }

    //Hooks

    //Custom Methods
    inputChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    resetInputHandler = () => {
        this.setState({
            full_name: '',
            status: 'ACTIVE',
            department: 'IT',
            home_address: '',
            phone_number: '',
            email_address: ''
        })
    }

    createEmployee(event) {
        console.log("Im Triggered");
        event.preventDefault();

        let employee = {
            full_name: this.state.full_name,
            status: this.state.status,
            department: this.state.department,
            home_address: this.state.home_address,
            phone_number: this.state.phone_number,
            email_address: this.state.email_address
        }

        axios.post('http://localhost:8070/api/authenticate',
            {
                "username": "admin",
                "password": "admin",
            }).then(response => {
                this.setState({ token: response.data.accessToken });
                console.log(this.state.token)
                axios.post('http://localhost:8070/api/hr/employee/', employee,
                    {
                        headers:
                        {
                            'Authorization': 'Bearer ' + this.state.token,
                            "Content-Type": "application/json",
                        }
                    }).then(response => {
                        this.setState({ registeredEmployee: response.data })
                        alert('Employee Created');
                        console.log(response)
                    })
                    .catch(error => console.log(error.toString()))
            }).catch(error => console.log(error.toString()));
    }


    //Render Method
    render() {
        return (
            <CCard>
                <CCardHeader>Register New Employee</CCardHeader>
                <CCardBody>
                    <CForm onSubmit={this.createEmployee} onReset={this.resetInputHandler} encType="multipart/form-data" className="form-horizontal">
                        <CFormGroup row>
                            <CCol xs="6">
                                <CFormGroup>
                                    <CLabel htmlFor="name">Name</CLabel>
                                    <CInput id="name" name="full_name" type="text" value={this.state.full_name} onChange={this.inputChangeHandler} placeholder="Enter your name" required />
                                </CFormGroup>
                            </CCol>
                            <CCol xs="6">
                                <CFormGroup>
                                    <CLabel htmlFor="contact">Contact</CLabel>
                                    <CInput type="text" id="contact" name="phone_number" value={this.state.phone_number} onChange={this.inputChangeHandler} placeholder="Enter your contact" required />
                                </CFormGroup>
                            </CCol>
                        </CFormGroup>

                        <CFormGroup row>
                            <CCol md="6">
                                <CFormGroup >
                                    <CLabel htmlFor="status-input">Status</CLabel>
                                    <CSelect custom name="status" value={this.state.status} onChange={this.inputChangeHandler} id="status-input">
                                        <option value="ACTIVE">Active</option>
                                        <option value="FIRED">Fired</option>
                                        <option value="RESIGNED">Resigned</option>
                                        <option value="VACATION">Vacation</option>
                                        <option value="RETIRED">Retired</option>
                                    </CSelect>
                                </CFormGroup>
                            </CCol>

                            <CCol md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="department-input">Department</CLabel>
                                    <CSelect custom name="department" id="department-input" value={this.state.department} onChange={this.inputChangeHandler}>
                                        <option value="IT">IT</option>
                                        <option value="Production">Production</option>
                                        <option value="HR">HR</option>
                                        <option value="Accounts">Accounts</option>
                                    </CSelect>
                                </CFormGroup>
                            </CCol>
                        </CFormGroup>

                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="email-input">Email Address</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="email" id="email-input" name="email_address" value={this.state.email_address} onChange={this.inputChangeHandler} placeholder="Enter Email" autoComplete="email" />
                            </CCol>
                        </CFormGroup>

                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="address-input">Home Address</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CTextarea
                                    name="home_address"
                                    id="address-input"
                                    value={this.state.home_address}
                                    onChange={this.inputChangeHandler}
                                    rows="2"
                                    placeholder="Home Address..."
                                />
                            </CCol>
                        </CFormGroup>

                    </CForm>
                </CCardBody>
                <CCardFooter >
                    <CButton style={{ marginRight: "30px" }} type="submit" onClick={this.createEmployee} size="md" color="success"><FontAwesomeIcon icon={All.faCheckCircle} />Submit</CButton>
                    <CButton style={{ marginRight: "30px" }} type="reset" onClick={this.resetInputHandler} size="md" color="danger"> <FontAwesomeIcon icon={All.faCircle} /> Reset</CButton>
                    <CButton style={{ marginRight: "30px" }} to={"/employee/employeelist"} size="md" color="primary"> <FontAwesomeIcon icon={All.faArrowAltCircleLeft} /> Back</CButton>
                </CCardFooter>
            </CCard>
        )
    }
}

export default EmployeeRegister
