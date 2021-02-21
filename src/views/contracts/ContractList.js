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


import {connect} from 'react-redux';
import ContractService from '../../api/ContractService'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

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

        
        if(!this.props.token) {
            NotificationManager.warning("Authentication Error. Please Login Again")
        } else {
            ContractService.getContractList(headers)    
            .then(response => {                
                console.log(response);
                if(response.status === 200) {
                    NotificationManager.success('Contracts Successfully Fetched', response.statusText)             
                    this.setState({
                        contracts: response.data._embedded.contractDTOList,
                        contractKeys: Object.keys(response.data._embedded.contractDTOList[0]).filter(item => item !== '_links')
                })} else {
                    console.log(response);
                    NotificationManager.warning("Please check the console for details", response.statusText)
                }})
            .catch(error => {
                let errorMessage;
                if (error.response) {
                    errorMessage = "Some unknown error occurred!";
                    this.setState({errorMessage: errorMessage})
                } else if (error.request) {
                    errorMessage = "The request was made but no response was received";
                    this.setState({errorMessage: errorMessage})
                    console.log(error.request);
                } else {
                    errorMessage = error.message;
                    this.setState({errorMessage: errorMessage})
                    console.log('Error', error.message);
                }
                NotificationManager.warning(errorMessage, 'OOPS...');  
            })   
        }
        
    }
                                  
    getContractByID = (id) => {
        
        let headers = { 
            headers:
        {
            'Authorization': 'Bearer ' + this.props.token,
            "Content-Type": "application/json",                        
        }}

        if(id === null){
            NotificationManager.warning("Missing or Invalid ID. Make sure you have selected a correct contract")
        } else if (!this.props.token) {
            NotificationManager.warning("Authentication Error. Please Login Again")
        } else {
            ContractService.getContractById(id, headers)
            .then(response => {
                console.log(response);
                if(response.status === 200) {
                    NotificationManager.success(`You are viewing information about contract with id ${response.data.id}`, response.statusText)             
                    this.setState({
                        contractByID: response.data,
                        id: response.data.id,
                        type: response.data.type,
                        description: response.data.description,
                        status: response.data.status,                        
                    })
                    this.toggleModalState(); 
                } else {
                    console.log(response);
                    NotificationManager.warning("Please check the console for details", response.statusText)
            }})
            .catch(error => {
                let errorMessage;
                if (error.response) {
                    errorMessage = "Some unknown error occurred!";
                    this.setState({errorMessage: errorMessage})
                } else if (error.request) {
                    errorMessage = "The request was made but no response was received";
                    this.setState({errorMessage: errorMessage})
                    console.log(error.request);
                } else {
                    errorMessage = error.message;
                    this.setState({errorMessage: errorMessage})
                    console.log('Error', error.message);
                }
                NotificationManager.warning(errorMessage, 'OOPS...');   
            })                    
        }        
    }

    // Update Vendor Info Request
    updateContractInfoHandler = (event) => {
        event.preventDefault();        
        
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

        if (!this.props.token) {
            NotificationManager.warning("Authentication Error. Please Login Again");
        } else if(!updatedContract) {
            NotificationManager.warning("Incorrect Request Body");
        } else {
            ContractService.updateContractInfoHandler(updatedContract, headers)
            .then(response => {
                console.log(response);
                if(response.status === 200) {
                    NotificationManager.success(`You have updated information about contract with id ${response.data.id}`, response.statusText);                    
                    this.setState({                        
                        updatedContract: response.data,
                        modalState: !this.state.modalState
                    });
                    this.getContractList();
                } else {
                    console.log(response);
                    NotificationManager.warning("Please check the console for details", response.statusText)
            }})
            .catch(error => {
                let errorMessage;
                if (error.response) {
                    errorMessage = "Some unknown error occurred!";
                    this.setState({errorMessage: errorMessage})
                } else if (error.request) {
                    errorMessage = "The request was made but no response was received";
                    this.setState({errorMessage: errorMessage})
                    console.log(error.request);
                } else {
                    errorMessage = error.message;
                    this.setState({errorMessage: errorMessage})
                    console.log('Error', error.message);
                }
                NotificationManager.warning(errorMessage, 'OOPS...');   
            })            
        }    
    }

    deleteContractByID = (id) => {        

        let headers = {
            headers:
        {
            'Authorization': 'Bearer ' + this.props.token,
            "Content-Type": "application/json",                        
        }}
        
        if (!this.props.token) {
            NotificationManager.warning("Authentication Error. Please Login Again");
        } else if(id === null) {
            NotificationManager.warning("Missing or Invalid ID. Make sure you have selected a correct vendor");
        } else {
            ContractService.deleteContractByID(id, headers)
            .then(response => {
                console.log(response);
                if(response.status === 200) {
                    NotificationManager.success(`You have deleted information about contract with id ${response.data.id}`, response.statusText)             
                    //alert(`Contract with id: ${response.data.id} is successfully deleted!`);
                    this.setState({
                        deletedContractByID: response.data,
                        modalState: !this.state.modalState
                    })  
                    this.getContractList(); 
                } else {
                    console.log(response);
                    NotificationManager.warning("Please check the console for details", response.statusText)
            }})
            .catch(error => {
                let errorMessage;
                if (error.response) {
                    errorMessage = "Some unknown error occurred!";
                    this.setState({errorMessage: errorMessage})
                } else if (error.request) {
                    errorMessage = "The request was made but no response was received";
                    this.setState({errorMessage: errorMessage})
                    console.log(error.request);
                } else {
                    errorMessage = error.message;
                    this.setState({errorMessage: errorMessage})
                    console.log('Error', error.message);
                }
                NotificationManager.warning(errorMessage, 'OOPS...');  
            })            
        }        
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
            <div>
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
                <NotificationContainer/>       
            </div>
        
    )};
}

export default connect((store) => {
    return {
      token: store.token
    }
  })(ContractList);