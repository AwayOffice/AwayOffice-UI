import React from 'react'
// import {
//   CButton,
//   CCard,
//   CCardBody,
//   CCardGroup,
//   CCol,
//   CContainer,
//   CForm,
//   CInput,
//   CInputGroup,
//   CInputGroupPrepend,
//   CInputGroupText,
//   CRow
// } from '@coreui/react'
// import CIcon from '@coreui/icons-react'
import ErdDiagram from '../../../assets/HomeAssetClassDiagram.png' 
// import './Login.css'

const Login = () => {

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
                    <img src={ErdDiagram} style={{ width: '70%'}} className='img-rotate' alt="Siktir"/>
    </div>
  )
}

export default Login
