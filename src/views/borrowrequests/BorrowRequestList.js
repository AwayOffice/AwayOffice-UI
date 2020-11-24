import React from 'react';
import axios from 'axios';  
import {
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    // CCol,
    CDataTable,
    // CRow,
    // CButton
} from '@coreui/react';
import { Link } from 'react-router-dom';
import vendorsData from '../resources/BorrowRequestData';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as All from '@fortawesome/free-solid-svg-icons'

const getBadge = status => {
    switch (status) {
        case 'Accepted': return 'primary'
        case 'Pending': return 'secondary'
        case 'Rejected': return 'danger'
        default: 
    }
}
const fields = ['assetModelName','assetModelManafacturer', 'quantity','startDate','endDate','status','employee']


const BorrowRequestList = () => {
    
   
    return (
        <CCard>
            <CCardHeader style={{fontSize: "15px"}}>
                BorrowRequest List
                <div className="card-header-actions">
                <FontAwesomeIcon icon={All.faLaptopHouse} size='2x' /><FontAwesomeIcon icon={All.faPlusCircle} /><Link to={"/borrowrequest/borrowRequestForm"} className="card-header-action">Device Borrow Request</Link>
                </div>
            </CCardHeader>
            <CCardBody>
                <CDataTable style={{color: "blue"}}
                    items={vendorsData}
                    fields={fields}
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
                            ),
                         'employee':
                         (item) => (
                             <td>
                                        {item.employee.full_name}

                             </td>
                         ),
            



                    }}
                />
            </CCardBody>
        </CCard>
    )
}

export default BorrowRequestList
