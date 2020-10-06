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
import { Link } from 'react-router-dom'
import usersData from '../users/UsersData'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as All from '@fortawesome/free-solid-svg-icons'

const getBadge = status => {
    switch (status) {
        case 'Active': return 'success'
        case 'Inactive': return 'secondary'
        case 'Pending': return 'warning'
        case 'Banned': return 'danger'
        default: return 'primary'
    }
}
const fields = ['name', 'registered', 'role', 'status']


const EmployeeList = () => {
    return (
        <CCard>
            <CCardHeader>
                Employee List
                <div className="card-header-actions">
                <FontAwesomeIcon icon={All.faUserPlus} /> <Link to={"/employee/employeeRegister"} className="card-header-action">Create New</Link>
                </div>
            </CCardHeader>
            <CCardBody>
                <CDataTable
                    items={usersData}
                    fields={fields}
                    dark
                    hover
                    striped
                    bordered
                    size="sm"
                    itemsPerPage={10}
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

export default EmployeeList
