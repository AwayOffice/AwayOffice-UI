import React from 'react';
import classes from './VendorList.css'
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
import vendorsData from '../resources/VendorsData';

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
const fields = ['name', 'address', 'email']


const VendorList = () => {
    return (
        <CCard>
            <CCardHeader style={{fontSize: "15px"}}>
                Vendor List
                <div className="card-header-actions">
                <FontAwesomeIcon icon={All.faUserPlus} /> <Link to={"/vendor/vendorRegister"} className="card-header-action">Register New Vendor</Link>
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
                    addTableClasses={classes.tablecolor}
                    size="sm"
                    itemsPerPage={5}
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

export default VendorList
