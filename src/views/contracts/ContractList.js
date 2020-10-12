import React from 'react';

import {
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    CDataTable,
} from '@coreui/react';
import { Link } from 'react-router-dom';

import contractData from './ContractData';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as All from '@fortawesome/free-solid-svg-icons'

const getBadge = status => {
    switch (status) {
        case 'Active': return 'primary'
        case 'Expired': return 'secondary'
        case 'Blocked': return 'danger'
        default: return 'primary'
    }
}
const fields = ['type', 'description', 'status']


const ContractList = () => {
    return (
        <CCard>
            <CCardHeader style={{fontSize: "15px"}}>
                Vendor List
                <div className="card-header-actions">
                <FontAwesomeIcon icon={All.faUserPlus} /> <Link to={"/contract/contractRegister"} className="card-header-action">Create New Contract</Link>
                </div>
            </CCardHeader>
            <CCardBody>
                <CDataTable style={{color: "blue"}}
                    items={contractData}
                    fields={fields}
                    light
                    hover
                    striped
                    outlined
                    size="sm"
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
    )
}

export default ContractList
