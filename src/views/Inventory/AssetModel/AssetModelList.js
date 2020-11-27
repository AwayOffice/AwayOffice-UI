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
const base_url = 'http://localhost:8070'
// const base_url = 'https://awayoffice.herokuapp.com'

class AssetModelList extends Component {
    constructor(props){
        super(props)

        this.state = {
            token: '',
            assetModels: [],
            assetModelsKeys: [],
            assetModelByID: {},
            
            deletedAssetModel: {},
            assetmodelID:null,

            //for put request,
            updateAssetModelID: '',
            updateAssetModelName: '',
            updateAssetModelDescription: '',
            updateAssetModelModel: '',
            updateAssetModelManufacturer: '',
            updatedAssetModel: {},

        }
    }

    getAssetModels = () => {
        axios.post('http://localhost:8070/api/authenticate',
            {
                "username":"admin",
                "password":"admin",
            }).then(response =>{
                this.setState({token: response.data.accessToken});
                axios.get(base_url+'/api/inventory/assetmodels',
                
                {
                    headers:
                    {
                        'Authorization': 'Bearer ' + this.state.token,
                        "Content-Type": "application/json",                        
                    }}).then(response => {
                        this.setState({
                            assetModels: response.data._embedded.assetModelDTOList,
                            assetModelKeys: Object.keys(response.data._embedded.assetModelDTOList[0]).filter(item => item !== '_links')
                        })   
                       
                    })
                    .catch(error => console.log(error.toString()))                   
            }).catch(error => console.log(error.toString()));
    }

    componentDidMount() {
        this.getAssetModels();
    }


    onAssetModelIDChangeHandler = (event) => {
        this.setState(
            {
                [event.target.name]: event.target.value,
            }
        )
    }

    getAssetModelsByID = () => {
        let assetmodelID = this.state.assetmodelID;
        axios.post('http://localhost:8070/api/authenticate',
            {
                "username":"admin",
                "password":"admin",
            }).then(response =>{
                this.setState({token: response.data.accessToken});
                axios.get(base_url+'/api/inventory/assetmodel/'+assetmodelID,
                {
                    headers:
                    {
                        'Authorization': 'Bearer ' + this.state.token,
                        "Content-Type": "application/json",
                        //"Access-Control-Allow-Headers": "X-Requested-With, content-type",
                    }}).then(response => {
                        this.setState({assetModelByID: response.data})   
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
    updateAssetModelInfoHandler = (event) => {
        event.preventDefault();

        let assetModel = {
            id: this.state.updateAssetModelID,
            name: this.state.updateAssetModelName,
            // description: this.state.updateAssetModelDescription,
            model: this.state.updateAssetModelModel,
            manufacturer: this.state.updateAssetModelManufacturer,
        }
        axios.post('http://localhost:8070/api/authenticate',
        {
            "username":"admin",
            "password":"admin",
        }).then(response =>{
            this.setState({token: response.data.accessToken});
            axios.put(base_url+'/api/inventory/assetmodel/', assetModel,
            {
                headers:
                {
                    'Authorization': 'Bearer ' + this.state.token,
                    "Content-Type": "application/json",
                    //"Access-Control-Allow-Headers": "X-Requested-With, content-type",
                }}).then(response => {
                    this.setState({
                        updatedAssetModel: response.data
                    })   
                })
                .catch(error => console.log(error.toString()))                   
        }).catch(error => console.log(error.toString()));
    }



    deleteAssetModelByID = (event) => {
        let assetmodelID = this.state.assetmodelID;

        axios.post('http://localhost:8070/api/authenticate',
            {
                "username":"admin",
                "password":"admin",
            }).then(response =>{
                this.setState({token: response.data.accessToken});
                axios.delete(base_url+'/api/inventory/assetmodel/'+assetmodelID,
                {
                    headers:
                    {
                        'Authorization': 'Bearer ' + this.state.token,
                        "Content-Type": "application/json",
                        //"Access-Control-Allow-Headers": "X-Requested-With, content-type",
                    }}).then(response => {
                        this.setState({deletedAssetModel: response.data})   
                    })
                    .catch(error => console.log(error.toString()))                   
            }).catch(error => console.log(error.toString()));
    }

    render () {
        return (
            <>
            <CCard>
                <CCardHeader style={{fontSize: "15px"}}>
                    AssetModel List
                    <div className="card-header-actions">
                    <FontAwesomeIcon icon={All.faLaptopMedical} size='2x'/><Link to={"/inventory/assetmodel"} className="card-header-action">Add new AssetModel</Link>
                    </div>
                </CCardHeader>
                <CCardBody>
                    <CDataTable style={{color: "blue"}}
                        items={this.state.assetModels}
                        fields={this.state.assetModelKeys}
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

            {/* Fetch AssetModel by its ID */}
            <CCard>
                <CCardHeader style={{fontSize: "15px"}}>                    
                    <div>
                    <CLabel style={{}}>Search for a AssetModel</CLabel> <br/>
                    <CInput
                        type="text"
                        id="assetmodel-id"
                        name="assetmodelID" onChange={this.onAssetModelIDChangeHandler}
                        placeholder="Enter AssetModel ID.."
                        autoComplete="off"
                        style={{width: "400px", float:"left", marginRight: "10px"}}
                    />  <button onClick={this.getAssetModelsByID} type="button" style={{float: "left"}} className="btn btn-info">Search Vendor</button>
                    {/* <FontAwesomeIcon icon={All.faUserPlus} /> <Link to={"/vendor/vendorRegister"} className="card-header-action">Register New Vendor</Link> */}
                    </div>
                </CCardHeader>
                <CCardBody>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            {/* <th scope="col">Description</th> */}
                            <th scope="col">Model</th>
                            <th scope="col">Manufacturer</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">{this.state.assetModelByID.id}</th>
                            <td>{this.state.assetModelByID.name}</td>
                            {/* <td>{this.state.assetModelByID.description}</td> */}
                            <td>{this.state.assetModelByID.model}</td>
                            <td>{this.state.assetModelByID.manufacturer}</td>

                            </tr>                          
                        </tbody>
                        </table>
                </CCardBody>
            </CCard>

            {/* Update Vendor Info */}
            <CCard>
                <CCardHeader>Update AssetModel's Information</CCardHeader>
                <CCardBody>
                    <CForm id="update-assetmodel" onSubmit={this.updateAssetModelInfoHandler} encType="multipart/form-data" className="form-horizontal">
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="email-input">ID</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="text" 
                                value={this.state.inputName} 
                                onChange={this.inputChangeHandler}
                                id="assetmodelID" 
                                name="updateAssetModelID" 
                                placeholder="Enter AssetModel ID" 
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
                                name="updateAssetModelName" 
                                placeholder="Enter New Name" 
                                autoComplete="name" />                                 
                            </CCol>                             
                        </CFormGroup>
{/* 
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="address-input">Description</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CTextarea
                                    name="updateAssetModelDescription"
                                    id="homeAddress"
                                    // value={this.state.inputAddress} 
                                    onChange={this.inputChangeHandler}
                                    rows="2"
                                    placeholder="Enter Asset Model Description"
                                />                            
                            </CCol>
                        </CFormGroup>
     */}
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="email-input">Model</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                            <CTextarea
                                    name="updateAssetModelModel"
                                    id="AssetModelModel"
                                    // value={this.state.inputAddress} 
                                    onChange={this.inputChangeHandler}
                                    rows="2"
                                    placeholder="Enter AssetModel Model"
                                /> 
                            </CCol>
                        </CFormGroup>  

                         <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="email-input">Manufacturer</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                            <CTextarea
                                    name="updateAssetModelManufacturer"
                                    id="AssetModelManufacturer"
                                    // value={this.state.inputAddress} 
                                    onChange={this.inputChangeHandler}
                                    rows="2"
                                    placeholder="Enter AssetModel Manufacturer"
                                /> 
                            </CCol>
                        </CFormGroup>                                              
                        <CCardFooter >
                            <CButton style={{marginRight:"30px", marginLeft: "-20px"}} type="submit" size="md" color="success"><FontAwesomeIcon icon={All.faCheckCircle} />Update</CButton>
                        </CCardFooter>                                                
                    </CForm>                   
                </CCardBody>
                <CCardHeader>The Updated AssetModel is</CCardHeader>
                    <CCardBody>
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Name</th>
                                        {/* <th scope="col">Description</th> */}
                                        <th scope="col">Model</th>
                                        <th scope="col">Manufacturer</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <th scope="row">{this.state.updatedAssetModel.id}</th>
                                        <td>{this.state.updatedAssetModel.name}</td>
                                        {/* <td>{this.state.updatedAssetModel.description}</td> */}
                                        <td>{this.state.updatedAssetModel.model}</td>
                                        <td>{this.state.updatedAssetModel.manufacturer}</td>

                                        </tr>                          
                                    </tbody>
                                    </table> 
                                </CCardBody>  
            </CCard>

          
            {/* Delete a Vendor by ID */}
            <CCard>
                <CCardHeader style={{fontSize: "15px"}}>                    
                    <div>
                    <CLabel style={{}}>Delete a AssetModel</CLabel> <br/>
                    <CInput
                        type="text"
                        id="assetmodelID-id"
                        name="assetmodelID" onChange={this.onAssetModelIDChangeHandler}
                        placeholder="Enter AssetModel ID.."
                        autoComplete="off"
                        style={{width: "400px", float:"left", marginRight: "10px"}}
                    />  <button onClick={this.deleteAssetModelByID} type="button" style={{float: "left"}} className="btn btn-danger">Delete AssetModel</button>
                    {/* <FontAwesomeIcon icon={All.faUserPlus} /> <Link to={"/vendor/vendorRegister"} className="card-header-action">Register New Vendor</Link> */}
                    </div>
                </CCardHeader>
                <CCardBody>
                <CLabel style={{}}>The Deleted AssetModel is: </CLabel> <br/>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Model</th>
                            <th scope="col">Manufacturer</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">{this.state.deletedAssetModel.id}</th>
                            <td>{this.state.deletedAssetModel.name}</td>
                            <td>{this.state.deletedAssetModel.model}</td>
                            <td>{this.state.deletedAssetModel.manufacturer}</td>
                            </tr>                          
                        </tbody>
                        </table>
                </CCardBody>
            </CCard>
            </>
                )};
}

export default AssetModelList
