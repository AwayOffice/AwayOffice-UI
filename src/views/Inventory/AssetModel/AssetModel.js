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

    CTextarea,
    CInput,

    CLabel,

} from '@coreui/react';
import axios from "axios";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as All from '@fortawesome/free-solid-svg-icons'
const base_url = 'https://awayoffice.herokuapp.com'

class AssetModel extends Component {
    constructor(props) {
        super(props);

        this.state = {
        //   vendorID: '',

          //create vendor,
          assetModelID: '',
          assetModelName: '',
          assetModelModel: '',
          assetModelManufacturer: '',
          createdAssetModel:{},
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

    createAssetModelHandler = (event) => {
        event.preventDefault();
    
        let assetModel = {
            id: this.state.assetModelID,
            name: this.state.assetModelName,
            model: this.state.assetModelModel,
            manufacturer: this.state.assetModelManufacturer,
        }
        
        axios.post('http://localhost:8070/api/authenticate',
        {
            "username":"admin",
            "password":"admin",
        }).then(response =>{
            this.setState({token: response.data.accessToken});
            console.log(this.state.token)                               
            axios.post('http://localhost:8070/api/inventory/assetmodel', assetModel,
            {
                headers:
                {
                    'Authorization': 'Bearer ' + this.state.token,
                    "Content-Type": "application/json",                    
                }}).then(response => {
                    this.setState({createdAssetModel: response.data})   
                    console.log(response)
                })
                .catch(error => console.log(error.toString()))                   
        }).catch(error => console.log(error.toString()));
    }

    render() {
        return (        
        <CCard>
            <CCardHeader>Register Asset Model</CCardHeader>
            <CCardBody>
                <CForm onSubmit={this.createAssetModelHandler}  onReset={this.resetInputHandler} encType="multipart/form-data" className="form-horizontal">
                <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="email-input">Name</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="text" 
                                value={this.state.inputName} 
                                onChange={this.inputChangeHandler}
                                id="vendorName" 
                                name="assetModelName" 
                                placeholder="Enter Name" 
                                autoComplete="name" />                                 
                            </CCol>                             
                        </CFormGroup>                           
    
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="address-input">Model</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CTextarea
                                    name="assetModelModel"
                                    id="assetModelModel"
                                    value={this.state.inputAddress} 
                                    onChange={this.inputChangeHandler}
                                    rows="2"
                                    placeholder="for e.g. Macbook Air 2020 256GB"
                                />                            
                            </CCol>
                        </CFormGroup>

                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="email-input">Manufacturer</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                            <CTextarea
                                value={this.state.inputEmail} 
                                onChange={this.inputChangeHandler}
                                id="assetModelManufacturer" 
                                name="assetModelManufacturer" 
                                placeholder="for e.g. Apple"  />
                            </CCol>
                        </CFormGroup>


            <CCardFooter >
                <CButton style={{marginRight:"30px"}} type="submit" size="md" color="success"><FontAwesomeIcon icon={All.faCheckCircle} />Submit</CButton>
                <CButton style={{marginRight:"30px"}} type="reset" size="md" color="danger"> <FontAwesomeIcon icon={All.faCircle} /> Reset</CButton> 
                <CButton style={{marginRight:"30px"}} to={"/inventory/assetmodellist"} type="reset" size="md" color="primary"> <FontAwesomeIcon  icon={All.faArrowAltCircleLeft} /> Back</CButton>
            </CCardFooter>

            </CForm>
            </CCardBody>
            <CCardHeader>The Created Vendor is</CCardHeader>
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
                            <th scope="row">{this.state.createdAssetModel.id}</th>
                            <td>{this.state.createdAssetModel.name}</td>
                            <td>{this.state.createdAssetModel.model}</td>
                            <td>{this.state.createdAssetModel.manufacturer}</td>
                            </tr>                          
                        </tbody>
                        </table>    
        </CCard>
    )
}}

export default AssetModel
