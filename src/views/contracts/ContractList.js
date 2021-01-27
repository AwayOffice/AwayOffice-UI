import React from 'react';

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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as All from '@fortawesome/free-solid-svg-icons';
//import contractData from '../resources/ContractData';

import {connect} from 'react-redux';
import ContractService from '../../api/ContractService'


const getBadge = status => {
    switch (status) {
        case 'Active': return 'primary'
        case 'Expired': return 'secondary'
        case 'Blocked': return 'danger'
        default: return 'primary'
    }
}
//const fields = ['type', 'description', 'status']


class ContractList extends React.Component {
    
    //constructor
    constructor(props){
        super(props)
        this.state = {
            token: '',
            vendors: [],
            vendorKeys: [],

            contracts: [],
            contractKeys: [],

            modalState: false,

            id: '',
            name: '',
            address: '',
            email: '',

            //contract
            type: '',
            description: '',
            status: '',


            contractByID: {},
            contractID: null,
            deletedContractByID: {},

            //for put request,
            updateContractID: '',
            updateContractType: '',
            updateContractDescription: '',
            updateContractStatus: '',
            updatedContract: {},
        }
    }

    // on page load
    componentDidMount() {
        this.getContractList();      
    }

    getContractList = () => { 

        let headers = {
            headers:
        {
            'Authorization': 'Bearer ' + this.props.token,
            "Content-Type": "application/json",                        
        }}

        console.log(this.props.token + "  => HEREEEEE1 with REDUX");

        ContractService.getContractList(headers)    
            .then(response => {
                //console.log(Object.keys(response.data._embedded.vendorDTOList[0]))
                console.log(response);
                this.setState({
                    contracts: response.data._embedded.contractDTOList,
                    contractKeys: Object.keys(response.data._embedded.contractDTOList[0]).filter(item => item !== '_links')
            })})
            .catch(error => console.log(error.toString()))   
    }
                                  
    getContractByID = (id) => {
        if(id === null){
            return null;
        }

        let headers = { 
            headers:
        {
            'Authorization': 'Bearer ' + this.props.token,
            "Content-Type": "application/json",                        
        }}

        console.log(this.props.token + "  => HEREEEEE2 with REDUX")

        ContractService.getContractById(id, headers)
        .then(response => {
                    this.setState({
                        contractByID: response.data,
                        id: response.data.id,
                        type: response.data.type,
                        description: response.data.description,
                        status: response.data.status,                        
                    })
                    this.toggleModalState(); 
                    console.log(response);
                })
                .catch(error => console.log(error.toString()))                    
    }

    // Update Vendor Info Request
    updateContractInfoHandler = (event) => {
        event.preventDefault();

        console.log(this.props.token + "  => HEREEEEE3 with REDUX")
        
        let updatedContract = {
            id: this.state.id,
            type: this.state.type,
            description: this.state.description,
            status: this.state.status,
        }

        let headers = {
            headers:
        {
            'Authorization': 'Bearer ' + this.props.token,
            "Content-Type": "application/json",                        
        }}

       ContractService.updateContractInfoHandler(updatedContract, headers)
        .then(response => {
                alert(`Contract with id: ${response.data.id} is successfully updated!`);
                this.setState({                        
                    updatedContract: response.data,
                    modalState: !this.state.modalState
                })
                this.getContractList();
                console.log(response);
            })
            .catch(error => console.log(error.toString()))            
    }

    deleteContractByID = (id) => {
        if(id === null) {
            return null;
        }
        
        let headers = {
            headers:
        {
            'Authorization': 'Bearer ' + this.props.token,
            "Content-Type": "application/json",                        
        }}

        console.log(this.props.token + "  => HEREEEEE4 with REDUX")

        ContractService.deleteContractByID(id, headers)
        .then(response => {
                alert(`Contract with id: ${response.data.id} is successfully deleted!`);
                this.setState({
                    deletedContractByID: response.data,
                    modalState: !this.state.modalState
                })  
                this.getContractList(); 
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
    
    render () {
        return (
            
            <CCard>
                <CCardHeader>
                    Contract List
                    <div className="card-header-actions">
                    <FontAwesomeIcon icon={All.faUserPlus} /> <Link to={"/contract/contractRegister"} className="card-header-action">Register New Contract</Link>
                    </div>
                </CCardHeader>
                <CCardBody>
                    <CDataTable
                        sorter={true}
                        columnFilter={true}
                        tableFilter={true}
                        items={this.state.contracts}
                        fields={this.state.contractKeys}
                        light
                        hover
                        striped
                        outlined
                        size="m"
                        itemsPerPage={5}
                        itemsPerPageSelect={true}
                        pagination
                        onRowClick={(row) => this.getContractByID(row.id)}
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
                        <CModalTitle>Contract Details</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CForm onSubmit={this.updateContractInfoHandler} encType="multipart/form-data" className="form-horizontal">
                            <CFormGroup row>
                                <CCol xs="3">
                                    <CFormGroup>
                                        <CLabel htmlFor="Id">Id</CLabel>
                                        <CInput id="Id" name="id" type="text" value={this.state.id} onChange={this.inputChangeHandler} required readOnly />
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="5">
                                    <CFormGroup>
                                        <CLabel htmlFor="name">Type</CLabel>
                                        <CInput id="name" name="type" type="text" value={this.state.type} onChange={this.inputChangeHandler} placeholder="Enter Contract New Type" required />
                                    </CFormGroup>
                                </CCol>                      
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
                                        placeholder="Enter Contract New Description"
                                    />
                                    </CFormGroup>
                                </CCol>
                            </CFormGroup>   

                            <CFormGroup row>
                                <CCol xs="12" md="9">
                                    <CFormGroup>
                                        <CLabel htmlFor="department-input">Status</CLabel>
                                        <CInput id="status" name="status" type="text" value={this.state.status} onChange={this.inputChangeHandler} placeholder="Enter Contract New Status" required />
                                    </CFormGroup>
                                </CCol>
                            </CFormGroup>         

                        </CForm>
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="info" onClick={this.updateContractInfoHandler}>Update Contract</CButton>{' '}
                        <CButton color="danger" onClick={() => this.deleteContractByID(this.state.id)}>Delete Contract</CButton>{' '}
                        <CButton color="secondary" onClick={this.toggleModalState}>Cancel</CButton>
                    </CModalFooter>
                </CModal>
            </CCard>        
        
    )};
}

export default connect((store) => {
    return {
      token: store.token
    }
  })(ContractList);