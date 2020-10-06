import React from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CCollapse,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CFade,
    CForm,
    CFormGroup,
    CFormText,
    CValidFeedback,
    CInvalidFeedback,
    CTextarea,
    CInput,
    CInputFile,
    CInputCheckbox,
    CInputRadio,
    CInputGroup,
    CInputGroupAppend,
    CInputGroupPrepend,
    CDropdown,
    CInputGroupText,
    CLabel,
    CSelect,
    CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as All from '@fortawesome/free-solid-svg-icons'

const EmployeeRegister = () => {
    return (
        <CCard>
            <CCardHeader>Register New Employee</CCardHeader>
            <CCardBody>
                <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                    <CFormGroup row>
                        <CCol xs="6">
                            <CFormGroup>
                                <CLabel htmlFor="name">Name</CLabel>
                                <CInput id="name" placeholder="Enter your name" required />
                            </CFormGroup>
                        </CCol>
                        <CCol xs="6">
                            <CFormGroup>
                                <CLabel htmlFor="contact">Contact</CLabel>
                                <CInput type="number" min="0" id="contact" placeholder="Enter your contact" required />
                            </CFormGroup>
                        </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                        <CCol md="6">
                            <CFormGroup >
                                <CLabel htmlFor="text-input">Role</CLabel>
                                <CSelect custom name="role-input" id="role-input">
                                    <option value="0">Please select</option>
                                    <option value="1">User</option>
                                    <option value="2">Admin</option>
                                </CSelect>
                            </CFormGroup>
                        </CCol>

                        <CCol md="6">
                            <CFormGroup>
                                <CLabel htmlFor="text-input">Department</CLabel>
                                <CSelect custom name="department-input" id="department-input">
                                    <option value="0">Please select</option>
                                    <option value="1">IT</option>
                                    <option value="2">Production</option>
                                    <option value="3">HR</option>
                                    <option value="4">Accounts</option>
                                </CSelect>
                            </CFormGroup>
                        </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                        <CCol md="3">
                            <CLabel htmlFor="email-input">Email Address</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                            <CInput type="email" id="email-input" name="email-input" placeholder="Enter Email" autoComplete="email" />
                        </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                        <CCol md="3">
                            <CLabel htmlFor="address-input">Home Address</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                            <CTextarea
                                name="address-input"
                                id="address-input"
                                rows="2"
                                placeholder="Home Address..."
                            />
                        </CCol>
                    </CFormGroup>

                </CForm>
            </CCardBody>
            <CCardFooter>
                <CButton type="submit" size="sm" color="success"><FontAwesomeIcon icon={All.faCheckCircle} />Submit</CButton>
                <CButton type="reset" size="sm" color="danger"> <FontAwesomeIcon icon={All.faCircle} /> Reset</CButton> 
                <CButton to={"/employee/employeelist"} type="reset" size="sm" color="primary"> <FontAwesomeIcon  icon={All.faArrowAltCircleLeft} /> Back</CButton>
            </CCardFooter>
        </CCard>
    )
}

export default EmployeeRegister
