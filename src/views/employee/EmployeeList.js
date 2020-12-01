import React, { Component } from 'react';
import classes from './EmployeeList.css'
import {
    CButton,
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    CDataTable,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CCol,
    CForm,
    CFormGroup,
    CTextarea,
    CInput,
    CLabel,
    CSelect
} from '@coreui/react';
import { Link } from 'react-router-dom'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as All from '@fortawesome/free-solid-svg-icons'

import axios from "axios";

const getBadge = status => {
    switch (status) {
        case 'Active': return 'primary'
        case 'Resigned': return 'secondary'
        case 'Vacation': return 'secondary'
        case 'Fired': return 'danger'
        default: return 'primary'
    }
}
const fields = ['full_name', 'registered', 'role', 'status']

class EmployeeList extends Component {

    //Constructor
    constructor(props) {
        super(props)

        this.state = {
            token: '',
            employees: [],
            employeeKeys: [],

            modalState: false,

            id: '',
            full_name: '',
            status: 'ACTIVE',
            department: 'IT',
            home_address: '',
            phone_number: '',
            email_address: ''
        }

        this.toggleModalState = this.toggleModalState.bind(this)
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.getEmployeeList = this.getEmployeeList.bind(this);
        this.getEmployeeById = this.getEmployeeById.bind(this);
    }

    //Hooks
    componentDidMount() {
        this.getEmployeeList();
    }

    //Methods
    getEmployeeList = () => {
        axios.post('http://localhost:8070/api/authenticate',
            {
                "username": "admin",
                "password": "admin",
            }).then(response => {
                this.setState({ token: response.data.accessToken });
                axios.get('http://localhost:8070/api/hr/employee',
                    {
                        headers:
                        {
                            'Authorization': 'Bearer ' + this.state.token,
                            "Content-Type": "application/json",
                        }
                    }).then(response => {
                        this.setState({
                            employees: response.data._embedded.employeeDTOList,
                            employeeKeys: Object.keys(response.data._embedded.employeeDTOList[0]).filter(item => item !== '_links')
                        })

                    })
                    .catch(error => console.log(error.toString()))
            }).catch(error => console.log(error.toString()));
    }

    getEmployeeById = (id) => {
        if (id == null) {
            return
        }
        axios.post('http://localhost:8070/api/authenticate',
            {
                "username": "admin",
                "password": "admin",
            }).then(response => {
                this.setState({ token: response.data.accessToken });
                axios.get(`http://localhost:8070/api/hr/employee/${id}`,
                    {
                        headers:
                        {
                            'Authorization': 'Bearer ' + this.state.token,
                            "Content-Type": "application/json",
                        }
                    }).then(response => {
                        this.setState({
                            //employees: response.data._embedded.employeeDTOList,
                            id: response.data.id,
                            full_name: response.data.full_name,
                            status: response.data.status,
                            department: response.data.department,
                            home_address: response.data.home_address,
                            phone_number: response.data.phone_number,
                            email_address: response.data.email_address
                        })
                        this.toggleModalState()
                    })
                    .catch(error => console.log(error.toString()))
            }).catch(error => console.log(error.toString()));
    }

    updateEmployee = () => {
        let updatedEmployee = {
            id: this.state.id,
            full_name: this.state.full_name,
            status: this.state.status,
            department: this.state.department,
            home_address: this.state.home_address,
            phone_number: this.phone_number,
            email_address: this.email_address
        }

        axios.post('http://localhost:8070/api/authenticate',
        {
            "username":"admin",
            "password":"admin",
        }).then(response =>{
            this.setState({token: response.data.accessToken});
            axios.put('http://localhost:8070/api/hr/employee/', updatedEmployee,
            {
                headers:
                {
                    'Authorization': 'Bearer ' + this.state.token,
                    "Content-Type": "application/json"
                }}).then(response => {
                    alert('Employee data updated !!!');
                    this.getEmployeeList();
                    console.log(response)
                })
                .catch(error => console.log(error.toString()))                   
        }).catch(error => console.log(error.toString()));
    }

    deleteEmployee = (id) => {
        if (id == null) {
            return
        }
        axios.post('http://localhost:8070/api/authenticate',
            {
                "username": "admin",
                "password": "admin",
            }).then(response => {
                this.setState({ token: response.data.accessToken });
                axios.delete(`http://localhost:8070/api/hr/employee/${id}`,
                    {
                        headers:
                        {
                            'Authorization': 'Bearer ' + this.state.token,
                            "Content-Type": "application/json"
                        }
                    }).then(response => {
                        alert('Employee Deleted');
                        this.setState({
                            modalState: !this.state.modalState
                        });
                        this.getEmployeeList();
                    })
                    .catch(error => console.log(error.toString()))
            }).catch(error => console.log(error.toString()));
    }

    toggleModalState = () => {
        this.setState({
            modalState: !this.state.modalState
        });
    }

    inputChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    //Render
    render() {
        return (
            <CCard>
                <CCardHeader>
                    Employee List
                <div className="card-header-actions">
                        <FontAwesomeIcon icon={All.faUserPlus} /> <Link to={"/employee/employeeRegister"} className="card-header-action">Create New</Link>
                    </div>
                </CCardHeader>
                <CCardBody>
                    <CDataTable
                        sorter={true}
                        columnFilter={true}
                        tableFilter={true}
                        items={this.state.employees}
                        fields={this.state.employeeKeys}
                        light
                        hover
                        striped
                        outlined
                        addTableClasses={classes.tablecolor}
                        size="sm"
                        itemsPerPageSelect={true}
                        itemsPerPage={20}
                        pagination
                        addition_props={classes.tablecolor}
                        onRowClick={(row) => this.getEmployeeById(row.id)}
                        scopedSlots={{
                            'status':
                                (item) => (
                                    <td>
                                        <CBadge color={getBadge(item.status)}>
                                            {item.status}
                                        </CBadge>
                                    </td>
                                )
                        }}
                    />
                </CCardBody>

                <CModal
                    show={this.state.modalState}
                    onClose={this.toggleModalState}
                    size="lg"
                >
                    <CModalHeader closeButton>
                        <CModalTitle>Employee Details</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CForm onSubmit={this.updateEmployee} encType="multipart/form-data" className="form-horizontal">
                            <CFormGroup row>
                                <CCol xs="2">
                                    <CFormGroup>
                                        <CLabel htmlFor="Id">Id</CLabel>
                                        <CInput id="Id" name="id" type="text" value={this.state.id} onChange={this.inputChangeHandler} required readOnly />
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="5">
                                    <CFormGroup>
                                        <CLabel htmlFor="name">Name</CLabel>
                                        <CInput id="name" name="full_name" type="text" value={this.state.full_name} onChange={this.inputChangeHandler} placeholder="Enter your name" required />
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="5">
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
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="info" onClick={this.updateEmployee}>Update</CButton>{' '}
                        <CButton color="danger" onClick={() => this.deleteEmployee(this.state.id)}>Delete</CButton>{' '}
                        <CButton color="secondary" onClick={this.toggleModalState}>Cancel</CButton>
                    </CModalFooter>
                </CModal>
            </CCard>
        )
    }
}

export default EmployeeList
