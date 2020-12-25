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
import axios from "axios";

import { connect } from 'react-redux';
import AssetModelService from '../../../api/AssetModelService.js'

class AssetModelRegister extends Component {

    // Constructor
    constructor(props) {
        super(props);

        this.state = {
            token: '',
            registeredAssetModel: {},

            id: '',
            name: '',
            model: '',
            description: '',
            manufacturer: ''
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
            model: '',
            description: '',
            manufacturer: ''
        })
    }

    createAssetModelHandler = (event) => {
        event.preventDefault();

        let assetModel = {
            name: this.state.name,
            description: this.state.description,
            model: this.state.model,
            manufacturer: this.state.manufacturer,
        }

        let headers = {
            headers:
            {
                'Authorization': 'Bearer ' + this.props.token,
                "Content-Type": "application/json",
            }
        }


        AssetModelService.createAssetModelHandler(assetModel, headers)
            .then(response => {
                alert(`AssetModel: ${this.state.name} is successfully registered!`)
                this.setState({ registeredAssetModel: response.data })
            })
            .catch(error => console.log(error.toString()))
    }

    render() {
        return (
            <CCard>
                <CCardHeader>Register New AssetModel</CCardHeader>
                <CCardBody>
                    <CForm onSubmit={this.createAssetModelHandler} onReset={this.resetInputHandler} encType="multipart/form-data" className="form-horizontal">
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="">AssetModel Name</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="text"
                                    value={this.state.name}
                                    onChange={this.inputChangeHandler}
                                    id="name"
                                    name="name"
                                    placeholder="Enter AssetModel Name"
                                    autoComplete="name" />
                            </CCol>
                        </CFormGroup>

                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="">Description</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CTextarea
                                    name="description"
                                    id="description"
                                    value={this.state.description}
                                    onChange={this.inputChangeHandler}
                                    rows="2"
                                    placeholder="Enter AssetModel Description"
                                />
                            </CCol>
                        </CFormGroup>

                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="model-input">Model</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CTextarea
                                    name="model"
                                    id="model"
                                    value={this.state.model}
                                    onChange={this.inputChangeHandler}
                                    rows="2"
                                    placeholder="Enter Vendor Model"
                                />
                            </CCol>
                        </CFormGroup>


                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="manufacturer-input">Manufacturer</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CTextarea
                                    name="manufacturer"
                                    id="modmanufacturerel"
                                    value={this.state.manufacturer}
                                    onChange={this.inputChangeHandler}
                                    rows="2"
                                    placeholder="Enter AssetModel Manufacturer"
                                />
                            </CCol>
                        </CFormGroup>

                        <CCardFooter> <br />
                            <CButton style={{ marginRight: "30px", marginLeft: "-20px" }} type="submit" size="md" color="success"><FontAwesomeIcon icon={All.faCheckCircle} /> Add Asset Model</CButton>
                            <CButton style={{ marginRight: "30px" }} type="reset" size="md" color="danger"> <FontAwesomeIcon icon={All.faCircle} /> Reset</CButton>
                            <CButton style={{ marginRight: "30px" }} to={"/inventory/assetmodellist"} type="reset" size="md" color="primary"> <FontAwesomeIcon icon={All.faArrowAltCircleLeft} /> Back</CButton>
                        </CCardFooter> <hr />
                    </CForm>
                    <CCardHeader>The Created AssetModel is</CCardHeader>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Model</th>
                                <th scope="col">Manufacturer</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">{this.state.registeredAssetModel.id}</th>
                                <td>{this.state.registeredAssetModel.name}</td>
                                <td>{this.state.registeredAssetModel.description}</td>
                                <td>{this.state.registeredAssetModel.model}</td>
                                <td>{this.state.registeredAssetModel.manufacturer}</td>
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
})(AssetModelRegister);

