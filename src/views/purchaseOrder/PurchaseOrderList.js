import React from 'react';

import {
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    CDataTable,
} from '@coreui/react';
import { Link } from 'react-router-dom';
import purchaseOrderData from '../resources/PurchaseOrderData';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as All from '@fortawesome/free-solid-svg-icons'

const getBadge = status => {
    switch (status) {
        case 'Pending': return 'secondary'
        case 'Accepted': return 'primary'
        case 'Rejected': return 'secondary'
        case 'Cancelled': return 'danger'
        case 'Received': return 'secondary'
        case 'Completed': return 'primary'
        default: return 'primary'
    }
}
const fields = ['issue_date', 'payment_schedule', 'status', 'contact_email']


const PurchaseOrderList = () => {
    return (
        <CCard>
            <CCardHeader style={{fontSize: "15px"}}>
                Purchase Orders
                <div className="card-header-actions">
                <FontAwesomeIcon icon={All.faUserPlus} /> <Link to={"/purchaseOrder/purchaseOrderRegister"} className="card-header-action">Create New PO</Link>
                </div>
            </CCardHeader>
            <CCardBody>
                <CDataTable style={{color: "blue"}}
                    items={purchaseOrderData}
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

export default PurchaseOrderList
