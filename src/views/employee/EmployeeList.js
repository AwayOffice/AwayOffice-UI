import React from 'react';
import classes from './EmployeeList.css'
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
import employeeData from '../employee/EmployeesData'


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
const fields = ['full_name', 'registered', 'role', 'status']


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
                    items={employeeData}
                    fields={fields}
                    light
                    hover
                    striped
                    outlined
                    addTableClasses={classes.tablecolor}
                    size="sm"
                    itemsPerPage={20}
                    pagination
                    addition_props = {classes.tablecolor}
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
