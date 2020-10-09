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

const AssetModel = () => {
    return (
        <CCard>
            <CCardHeader>Register Asset Model</CCardHeader>
            <CCardBody>
                <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                    <CFormGroup row>
                        <CCol xs="6">
                            <CFormGroup>
                                <CLabel htmlFor="asset-name">Name</CLabel>
                                <CInput type="text" id="asset-name" name="asset-name" maxLength="100" placeholder="Enter asset name" required />
                            </CFormGroup>
                        </CCol>
                        <CCol xs="6">
                            <CFormGroup>
                                <CLabel htmlFor="asset-model">Model</CLabel>
                                <CInput type="text" id="asset-model" name="asset-model" maxLength="100" placeholder="Enter asset model number" required />
                            </CFormGroup>
                        </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                        <CCol md="3">
                            <CLabel htmlFor="asset-manufacturer">Manufacturer</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                            <CInput type="text" id="asset-manufacturer" name="asset-manufacturer" placeholder="Provide asset manufacturer details"/>
                        </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                        <CCol md="3">
                            <CLabel htmlFor="asset-description">Description</CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                            <CTextarea
                                name="asset-description"
                                id="asset-description"
                                rows="3"
                                placeholder="Provide any additional information here..."
                            />
                        </CCol>
                    </CFormGroup>

                </CForm>
            </CCardBody>
            <CCardFooter >
                <CButton style={{marginRight:"30px"}} type="submit" size="md" color="success"><FontAwesomeIcon icon={All.faCheckCircle} />Submit</CButton>
                <CButton style={{marginRight:"30px"}} type="reset" size="md" color="danger"> <FontAwesomeIcon icon={All.faCircle} /> Reset</CButton> 
                <CButton style={{marginRight:"30px"}} to={"/employee/employeelist"} type="reset" size="md" color="primary"> <FontAwesomeIcon  icon={All.faArrowAltCircleLeft} /> Back</CButton>
            </CCardFooter>
        </CCard>
    )
}

export default AssetModel
