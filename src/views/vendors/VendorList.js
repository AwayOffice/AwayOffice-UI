import React, {Component} from 'react';
import {
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    CDataTable,
    CLabel,
    CInput,
    CForm,
    CFormGroup,
    CCol,
    CTextarea,
    CCardFooter,
    CButton,
} from '@coreui/react';
import { Link } from 'react-router-dom';
//import vendorsData from '../resources/VendorsData';

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
const fields = ['id', 'name', 'address', 'email']


class VendorList extends Component {
    constructor(props){
        super(props)

        this.state = {
            token: '',
            vendors: [],
            vendorKeys: [],
            vendorByID: {},
            vendorID: null,
            deletedVendorByID: {},

            //for put request,
            updateVendorID: '',
            updateVendorName: '',
            updateVendorHomeAddress: '',
            updateVendorEmailAddress: '',
            updatedVendor: {},
        }
    }

    getVendors = () => {
        axios.post('http://localhost:8070/api/authenticate',
            {
                "username":"admin",
                "password":"admin",
            }).then(response =>{
                this.setState({token: response.data.accessToken});
                console.log(this.state.token)                   
                axios.get('http://localhost:8070/api/hr/vendors',
                {
                    headers:
                    {
                        'Authorization': 'Bearer ' + this.state.token,
                        "Content-Type": "application/json",                        
                    }}).then(response => {
                        console.log(Object.keys(response.data._embedded.vendorDTOList[0]))
                        this.setState({
                            vendors: response.data._embedded.vendorDTOList,
                            vendorKeys: Object.keys(response.data._embedded.vendorDTOList[0]).filter(item => item !== '_links')
                        })   
                       
                    })
                    .catch(error => console.log(error.toString()))                   
            }).catch(error => console.log(error.toString()));
    }

    componentDidMount() {
        this.getVendors();
    }

    onVendorIDChangeHandler = (event) => {
        this.setState(
            {
                [event.target.name]: event.target.value,
            }
        )
    }

    getVendorByID = () => {
        let vendorID = this.state.vendorID;

        axios.post('http://localhost:8070/api/authenticate',
            {
                "username":"admin",
                "password":"admin",
            }).then(response =>{
                this.setState({token: response.data.accessToken});
                console.log(this.state.token)  
                console.log(vendorID)                 
                axios.get(`http://localhost:8070/api/hr/vendors/${vendorID}`,
                {
                    headers:
                    {
                        'Authorization': 'Bearer ' + this.state.token,
                        "Content-Type": "application/json",
                        //"Access-Control-Allow-Headers": "X-Requested-With, content-type",
                    }}).then(response => {
                        this.setState({vendorByID: response.data})   
                        console.log(response)
                    })
                    .catch(error => console.log(error.toString()))                   
            }).catch(error => console.log(error.toString()));
    }

    inputChangeHandler = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    // Update Vendor Info Request
    updateVendorInfoHandler = (event) => {
        event.preventDefault();

        console.log("Here 1");
        let vendor = {
            id: this.state.updateVendorID,
            name: this.state.updateVendorName,
            address: this.state.updateVendorHomeAddress,
            email: this.state.updateVendorEmailAddress,
        }
        console.log("Here 2");
        axios.post('http://localhost:8070/api/authenticate',
        {
            "username":"admin",
            "password":"admin",
        }).then(response =>{
            this.setState({token: response.data.accessToken});
            console.log(this.state.token)  
            //console.log(vendorID)                 
            axios.put('http://localhost:8070/api/hr/vendors/', vendor,
            {
                headers:
                {
                    'Authorization': 'Bearer ' + this.state.token,
                    "Content-Type": "application/json",
                    //"Access-Control-Allow-Headers": "X-Requested-With, content-type",
                }}).then(response => {
                    this.setState({
                        updatedVendor: response.data
                    })   
                    console.log(response)
                })
                .catch(error => console.log(error.toString()))                   
        }).catch(error => console.log(error.toString()));
    }



    deleteVendorByID = (event) => {
        let vendorID = this.state.vendorID;

        axios.post('http://localhost:8070/api/authenticate',
            {
                "username":"admin",
                "password":"admin",
            }).then(response =>{
                this.setState({token: response.data.accessToken});
                console.log(this.state.token)  
                console.log(vendorID)                 
                axios.delete(`http://localhost:8070/api/hr/vendors/${vendorID}`,
                {
                    headers:
                    {
                        'Authorization': 'Bearer ' + this.state.token,
                        "Content-Type": "application/json",
                        //"Access-Control-Allow-Headers": "X-Requested-With, content-type",
                    }}).then(response => {
                        this.setState({deletedVendorByID: response.data})   
                        console.log(response)
                    })
                    .catch(error => console.log(error.toString()))                   
            }).catch(error => console.log(error.toString()));
    }

    render () {
        return (
            <>
            <CCard>
                <CCardHeader style={{fontSize: "15px"}}>
                    Vendor List
                    <div className="card-header-actions">
                    <FontAwesomeIcon icon={All.faUserPlus} /> <Link to={"/vendor/vendorRegister"} className="card-header-action">Register New Vendor</Link>
                    </div>
                </CCardHeader>
                <CCardBody>
                    <CDataTable style={{color: "blue"}}
                        items={this.state.vendors}
                        fields={this.state.vendorKeys}
                        light
                        hover
                        striped
                        outlined
                        size="m"
                        itemsPerPage={5}
                        pagination
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
            </CCard>

            {/* Fetch Vendor by its ID */}
            <CCard>
                <CCardHeader style={{fontSize: "15px"}}>                    
                    <div>
                    <CLabel style={{}}>Search for a Vendor</CLabel> <br/>
                    <CInput
                        type="text"
                        id="vendor-id"
                        name="vendorID" onChange={this.onVendorIDChangeHandler}
                        placeholder="Enter Vendor ID.."
                        autoComplete="off"
                        style={{width: "400px", float:"left", marginRight: "10px"}}
                    />  <button onClick={this.getVendorByID} type="button" style={{float: "left"}} className="btn btn-info">Search Vendor</button>
                    {/* <FontAwesomeIcon icon={All.faUserPlus} /> <Link to={"/vendor/vendorRegister"} className="card-header-action">Register New Vendor</Link> */}
                    </div>
                </CCardHeader>
                <CCardBody>
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
                            <th scope="row">{this.state.vendorByID.id}</th>
                            <td>{this.state.vendorByID.name}</td>
                            <td>{this.state.vendorByID.address}</td>
                            <td>{this.state.vendorByID.email}</td>
                            </tr>                          
                        </tbody>
                        </table>
                </CCardBody>
            </CCard>

            {/* Update Vendor Info */}
            <CCard>
                <CCardHeader>Update Vendor's Information</CCardHeader>
                <CCardBody>
                    <CForm id="update-vendor" onSubmit={this.updateVendorInfoHandler} encType="multipart/form-data" className="form-horizontal">
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="email-input">ID</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="text" 
                                value={this.state.inputName} 
                                onChange={this.inputChangeHandler}
                                id="vendorID" 
                                name="updateVendorID" 
                                placeholder="Enter New ID" 
                                autoComplete="id" />                                 
                            </CCol>                             
                        </CFormGroup>

                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="email-input">Name</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="text" 
                                value={this.state.inputName} 
                                onChange={this.inputChangeHandler}
                                id="vendorName" 
                                name="updateVendorName" 
                                placeholder="Enter New Name" 
                                autoComplete="name" />                                 
                            </CCol>                             
                        </CFormGroup>

                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="address-input">Home Address</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CTextarea
                                    name="updateVendorHomeAddress"
                                    id="homeAddress"
                                    // value={this.state.inputAddress} 
                                    onChange={this.inputChangeHandler}
                                    rows="2"
                                    placeholder="Enter New Home Address"
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
                                name="updateVendorEmailAddress" 
                                placeholder="Enter New Email Address" 
                                autoComplete="email" />
                            </CCol>
                        </CFormGroup>                        
                        <CCardFooter >
                            <CButton style={{marginRight:"30px", marginLeft: "-20px"}} type="submit" size="md" color="success"><FontAwesomeIcon icon={All.faCheckCircle} />Update</CButton>
                        </CCardFooter>                                                
                    </CForm>                   
                </CCardBody>
                <CCardHeader>The Updated Vendor is</CCardHeader>
                    <CCardBody>
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
                                        <th scope="row">{this.state.updatedVendor.id}</th>
                                        <td>{this.state.updatedVendor.name}</td>
                                        <td>{this.state.updatedVendor.address}</td>
                                        <td>{this.state.updatedVendor.email}</td>
                                        </tr>                          
                                    </tbody>
                                    </table> 
                                </CCardBody>  
            </CCard>

          
            {/* Delete a Vendor by ID */}
            <CCard>
                <CCardHeader style={{fontSize: "15px"}}>                    
                    <div>
                    <CLabel style={{}}>Delete a Vendor</CLabel> <br/>
                    <CInput
                        type="text"
                        id="vendor-id"
                        name="vendorID" onChange={this.onVendorIDChangeHandler}
                        placeholder="Enter Vendor ID.."
                        autoComplete="off"
                        style={{width: "400px", float:"left", marginRight: "10px"}}
                    />  <button onClick={this.deleteVendorByID} type="button" style={{float: "left"}} className="btn btn-danger">Delete Vendor</button>
                    {/* <FontAwesomeIcon icon={All.faUserPlus} /> <Link to={"/vendor/vendorRegister"} className="card-header-action">Register New Vendor</Link> */}
                    </div>
                </CCardHeader>
                <CCardBody>
                <CLabel style={{}}>The Deleted Vendor is: </CLabel> <br/>
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
                            <th scope="row">{this.state.deletedVendorByID.id}</th>
                            <td>{this.state.deletedVendorByID.name}</td>
                            <td>{this.state.deletedVendorByID.address}</td>
                            <td>{this.state.deletedVendorByID.email}</td>
                            </tr>                          
                        </tbody>
                        </table>
                </CCardBody>
            </CCard>
            </>
                )};
}

export default VendorList
