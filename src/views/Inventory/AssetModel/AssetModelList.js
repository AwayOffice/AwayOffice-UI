import React, { useState }  from 'react';
import axios from 'axios';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CDataTable,
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle
} from '@coreui/react';
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as All from '@fortawesome/free-solid-svg-icons'
// import assetModelData from '../../resources/AssetModelData';

// const getBadge = status => {
//     switch (status) {
//         case 'Active': return 'primary'
//         case 'Resigned': return 'secondary'
//         case 'Vacation': return 'secondary'
//         case 'Fired': return 'danger'
//         default: return 'primary'
//     }
// }
const fields = ['name', 'model', 'description', 'manufacturer']


const AssetModelList = () => {

    const [large, setLarge] = useState(false)
    const [assetModelData, setAssetModelData] = useState([])
    
    
    var toki =  axios.post('http://localhost:8070/api/authenticate',{"username":"admin","password":"admin"});
    toki.then(response =>{
      var token = response.data.accessToken
      var assetModelData = axios.get('http://localhost:8070/api/inventory/assetmodels',{headers:
      {'Authorization': 'Bearer ' +token,
        "Content-Type": "application/json"}})
        .then(response => {
          setAssetModelData(response.data._embedded.assetModelDTOList)
          //console.log(response)
        } )
          .catch(e => console.log(e.toString()));
    })
    // 

    return (
      
        <CCard>

            <CCardHeader>
                Asset Model List
                <div className="card-header-actions">
                    <FontAwesomeIcon icon={All.faArchive} /> <Link to={"/inventory/assetmodel"} className="card-header-action">Create New</Link>
                </div>
            </CCardHeader>
            <CCardBody>
                <CDataTable
                    items={assetModelData}
                    fields={fields}
                    light
                    hover
                    striped
                    outlined
                    size="sm"
                    itemsPerPage={10}
                    pagination
                    onRowClick={() => setLarge(!large)}
                />
            </CCardBody>

            <CModal 
              show={large} 
              onClose={() => setLarge(!large)}
              size="lg"
            >
              <CModalHeader closeButton>
                <CModalTitle>Associated Asset Items</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CDataTable
                    items={assetModelData}
                    fields={fields}
                    light
                    hover
                    striped
                    outlined
                    size="sm"
                    itemsPerPage={5}
                    pagination
                    onRowClick={() => setLarge(!large)}
                />
              </CModalBody>
              <CModalFooter>
                <CButton color="primary" onClick={() => setLarge(!large)}>Do Something</CButton>{' '}
                <CButton color="secondary" onClick={() => setLarge(!large)}>Cancel</CButton>
              </CModalFooter>
            </CModal>
        </CCard>
    )
}

export default AssetModelList
