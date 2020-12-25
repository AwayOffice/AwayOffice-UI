import React, { Component } from 'react';
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
} from '@coreui/react';
import { Link } from 'react-router-dom';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as All from '@fortawesome/free-solid-svg-icons'

import { connect } from 'react-redux';
import AssetModelService from '../../../api/AssetModelService.js'

const getBadge = status => {
    switch (status) {
        case 'Active': return 'primary'
        case 'Resigned': return 'secondary'
        case 'Vacation': return 'secondary'
        case 'Fired': return 'danger'
        default: return 'primary'
    }
}
//const fields = ['id', 'name', 'address', 'email']


class AssetModelList extends Component {

    //constructor
    constructor(props) {
        super(props)
        this.state = {
            token: '',
            assetModels: [],
            assetModelKeys: [],

            modalState: false,

            id: '',
            name: '',
            description: '',
            model: '',
            manufacturer: '',


            assetModelByID: {},
            assetModelID: null,
            deletedAssetModelByID: {},

            //for put request,
            updateAssetModelID: '',
            updateAssetModelName: '',
            updateAssetModelDescription: '',
            updateAssetModelModel: '',
            updateAssetModelManufacturer: '',
            updatedAssetModel: {},
        }
    }

    // on page load
    componentDidMount() {
        this.getAssetModelList();
    }

    getAssetModelList = () => {

        let headers = {
            headers:
            {
                'Authorization': 'Bearer ' + this.props.token,
                "Content-Type": "application/json",
            }
        }


        AssetModelService.getAssetModelList(headers)
            .then(response => {
                console.log(Object.keys(response.data._embedded.assetModelDTOList[0]))
                this.setState({
                    assetModels: response.data._embedded.assetModelDTOList,
                    assetModelKeys: Object.keys(response.data._embedded.assetModelDTOList[0]).filter(item => item !== '_links')
                })
            })
            .catch(error => console.log(error.toString()))
    }

    getAssetModelByID = (id) => {
        if (id === null) {
            return null;
        }

        let headers = {
            headers:
            {
                'Authorization': 'Bearer ' + this.props.token,
                "Content-Type": "application/json",
            }
        }


        AssetModelService.getAssetModelById(id, headers)
            .then(response => {
                this.setState({
                    assetModelByID: response.data,
                    id: response.data.id,
                    name: response.data.name,
                    description: response.data.description,
                    model: response.data.model,
                    manufacturer: response.data.manufacturer,
                })
                this.toggleModalState();
            })
            .catch(error => console.log(error.toString()))
    }

    // Update Vendor Info Request
    updateAssetModelInfoHandler = (event) => {
        event.preventDefault();


        let updatedAssetModel = {
            id: this.state.id,
            name: this.state.name,
            description: this.state.description,
            model: this.state.model,
            manufacturer: this.state.manufacturer
        }

        let headers = {
            headers:
            {
                'Authorization': 'Bearer ' + this.props.token,
                "Content-Type": "application/json",
            }
        }

        AssetModelService.updateAssetModelInfoHandler(updatedAssetModel, headers)
            .then(response => {
                alert(`AssetModel with id: ${response.data.id} and name: ${response.data.name} is successfully updated!`);
                this.setState({
                    updatedAssetModel: response.data,
                    modalState: !this.state.modalState
                })
                this.getAssetModelList();
                console.log(response);
            })
            .catch(error => console.log(error.toString()))
    }

    deleteAssetModelByID = (id) => {
        if (id === null) {
            return null;
        }

        let headers = {
            headers:
            {
                'Authorization': 'Bearer ' + this.props.token,
                "Content-Type": "application/json",
            }
        }


        AssetModelService.deleteAssetModelByID(id, headers)
            .then(response => {
                alert(`AssetModel with id: ${response.data.id} and name: ${response.data.name} is successfully deleted!`);
                this.setState({
                    deletedAssetModelByID: response.data,
                    modalState: !this.state.modalState
                })
                this.getAssetModelList();
                console.log(response)
            })
            .catch(error => console.log(error.toString()))
    }

    toggleModalState = () => {
        this.setState({
            modalState: !this.state.modalState
        });
    }

    inputChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    render() {
        return (

            <CCard>
                <CCardHeader>
                    AssetModel List
                    <div className="card-header-actions">
                        <FontAwesomeIcon icon={All.faPlusSquare} /> <Link to={"/inventory/assetmodelregister"} className="card-header-action">Add New AssetModel</Link>
                    </div>
                </CCardHeader>
                <CCardBody>
                    <CDataTable
                        sorter={true}
                        columnFilter={true}
                        tableFilter={true}
                        items={this.state.assetModels}
                        fields={this.state.assetModelKeys}
                        light
                        hover
                        striped
                        outlined
                        size="m"
                        itemsPerPage={5}
                        itemsPerPageSelect={true}
                        pagination
                        onRowClick={(row) => this.getAssetModelByID(row.id)}
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
                        <CModalTitle>AssetModel Details</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CForm onSubmit={this.updateVendorInfoHandler} encType="multipart/form-data" className="form-horizontal">
                            <CFormGroup row>
                                <CCol xs="3">
                                    <CFormGroup>
                                        <CLabel htmlFor="Id">Id</CLabel>
                                        <CInput id="Id" name="id" type="text" value={this.state.id} onChange={this.inputChangeHandler} required readOnly />
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="5">
                                    <CFormGroup >
                                        <CLabel htmlFor="status-input">Name</CLabel>
                                        <CTextarea
                                            name="name"
                                            id="name"
                                            value={this.state.name}
                                            onChange={this.inputChangeHandler}
                                            rows="2"
                                            placeholder="Enter AssetModel New Name"
                                        />
                                    </CFormGroup>  </CCol>
                            </CFormGroup>

                            <CFormGroup row>
                                <CCol xs="12" md="9">
                                    <CFormGroup >
                                        <CLabel htmlFor="status-input">Description</CLabel>
                                        <CTextarea
                                            name="description"
                                            id="description"
                                            value={this.state.description}
                                            onChange={this.inputChangeHandler}
                                            rows="2"
                                            placeholder="Enter AssetModel New Description"
                                        />
                                    </CFormGroup>
                                </CCol>
                            </CFormGroup>

                            <CFormGroup >
                                <CLabel htmlFor="status-input">Model</CLabel>
                                <CTextarea
                                    name="model"
                                    id="model"
                                    value={this.state.model}
                                    onChange={this.inputChangeHandler}
                                    rows="2"
                                    placeholder="Enter AssetModel New Model"
                                />
                            </CFormGroup>

                            <CFormGroup >
                                <CLabel htmlFor="status-input">Manufacturer</CLabel>
                                <CTextarea
                                    name="manufacturer"
                                    id="manufacturer"
                                    value={this.state.manufacturer}
                                    onChange={this.inputChangeHandler}
                                    rows="2"
                                    placeholder="Enter AssetModel New Manufacturer"
                                />
                            </CFormGroup>

                        </CForm>
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="info" onClick={this.updateAssetModelInfoHandler}>Update AssetModel</CButton>{' '}
                        <CButton color="danger" onClick={() => this.deleteAssetModelByID(this.state.id)}>Delete AssetModelndor</CButton>{' '}
                        <CButton color="secondary" onClick={this.toggleModalState}>Cancel</CButton>
                    </CModalFooter>
                </CModal>
            </CCard>

        )
    };
}

export default connect((store) => {
    return {
        token: store.token
    }
})(AssetModelList);