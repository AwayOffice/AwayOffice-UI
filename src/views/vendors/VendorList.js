import React, {Component} from 'react';
import {
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    CDataTable,
    CLabel,
    CInput,
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
            vendorByID: {},
            vendorID: null,
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
                        //"Access-Control-Allow-Headers": "X-Requested-With, content-type",
                    }}).then(response => {
                        this.setState({vendors: response.data._embedded.vendorDTOList })   
                        console.log(response)
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
                        fields={fields}
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

            <CCard>
                <CCardHeader style={{fontSize: "15px"}}>                    
                    <div>
                    <CLabel style={{}}>Search for a Vendor by the Id</CLabel> <br/>
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
                    {/* <CDataTable style={{color: "blue"}}
                        items={this.state.vendorByID}
                        fields={fields}
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
                    /> */}
                </CCardBody>
            </CCard>

            </>
                )
    }
}

export default VendorList
