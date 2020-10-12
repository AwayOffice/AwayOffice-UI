import React, { useState }  from 'react';
import {
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle
} from '@coreui/react';
import { Link } from 'react-router-dom'
import tempData from '../../resources/tempData/assetModelData'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as All from '@fortawesome/free-solid-svg-icons'

const getBadge = status => {
    switch (status) {
        case 'Active': return 'primary'
        case 'Resigned': return 'secondary'
        case 'Vacation': return 'secondary'
        case 'Fired': return 'danger'
        default: return 'primary'
    }
}
const fields = ['name', 'model', 'description', 'manufacturer']


const AssetModelList = () => {

    const [large, setLarge] = useState(false)

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
                    items={tempData}
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
                    items={tempData}
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
