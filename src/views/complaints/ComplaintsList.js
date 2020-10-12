import React from 'react';
import {
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CButton
} from '@coreui/react';
import { Link } from 'react-router-dom';
import complaintsData from './ComplaintsData';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as All from '@fortawesome/free-solid-svg-icons'

const getBadge = status => {
    switch (status) {
        case 'Accepted': return 'primary'
        case 'Pending': return 'secondary'
        case 'Rejected': return 'danger'

    }
}
const fields = ['title','description', 'asset','employee']


const BorrowRequestList = () => {
    return (
        <CCard>
            <CCardHeader style={{fontSize: "15px"}}>
                Complaints List
                <div className="card-header-actions">
                <FontAwesomeIcon icon={All.faLaptopHouse} size='2x' /><FontAwesomeIcon icon={All.faPlusCircle} /><Link to={"/comlaints/ComplaintsForm"} className="card-header-action">File Complain</Link>
                </div>
            </CCardHeader>
            <CCardBody>
                <CDataTable style={{color: "blue"}}
                    items={complaintsData}
                    fields={fields}
                    light
                    hover
                    
                    striped
                    outlined
                    size="m"
                    itemsPerPage={5}
                    pagination
                    scopedSlots={{
                        'asset':
                            (item) => (
                                <td>
                                {item.asset.model}-{item.asset.manafacturer}
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
