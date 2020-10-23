import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const EmployeeList = React.lazy(() => import('./views/employee/EmployeeList'));
const EmployeeRegister = React.lazy(() => import('./views/employee/EmployeeRegister'));
const VendorList = React.lazy(() => import('./views/vendors/VendorList'));
const VendorRegister = React.lazy(() => import('./views/vendors/VendorRegister'));
const BorrowRequestList = React.lazy(() => import('./views/borrowrequests/BorrowRequestList'));
const BorrowRequestForm = React.lazy(() => import('./views/borrowrequests/BorrowRequestForm'));
const ContractList = React.lazy(() => import('./views/contracts/ContractList'));
const ContractRegister = React.lazy(() => import('./views/contracts/ContractRegister'));
const PurchaseOrderList = React.lazy(() => import('./views/purchaseOrder/PurchaseOrderList'));
const PurchaseOrderRegister = React.lazy(() => import('./views/purchaseOrder/PurchaseOrderRegister'));
const ComplaintsList = React.lazy(() => import('./views/complaints/ComplaintsList'));
// const ComplaintsForm= React.lazy(() => import('./views/complaints/ComplaintsForm'));





const AssetModel = React.lazy(() => import('./views/Inventory/AssetModel/AssetModel'));
const AssetModelList = React.lazy(() => import('./views/Inventory/AssetModel/AssetModelList'));



const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/employee/employeelist', name: 'Employee', component: EmployeeList },
  { path: '/employee/employeeRegister', name: 'Employee', component: EmployeeRegister },
  { path: '/vendor/vendorList', name: 'Vendor', component: VendorList },
  { path: '/vendor/vendorRegister', name: 'Vendor Registration', component: VendorRegister },
  { path: '/borrowrequest/borrowRequestList', name: 'Borrow Requests', component: BorrowRequestList },
  { path: '/borrowrequest/borrowRequestForm', name: 'Borrow Requests Form', component: BorrowRequestForm },
  { path: '/contract/contractList', name: 'Contract', component: ContractList },
  { path: '/contract/contractRegister', name: 'Contract Registration', component: ContractRegister },
  { path: '/purchaseOrder/purchaseOrderList', name: 'Purchase Order', component: PurchaseOrderList },
  { path: '/purchaseOrder/purchaseOrderRegister', name: 'Purchase Order Registration', component: PurchaseOrderRegister },
  { path: '/vendor/vendorRegister', name: 'Vendor', component: VendorRegister },
  { path: '/inventory/assetmodel', name: 'Vendor', component: AssetModel },
  { path: '/inventory/assetmodellist', name: 'Vendor', component: AssetModelList },
  { path: '/borrowrequest/borrowRequestList', name: 'Borrow Requests', component: BorrowRequestList },
  { path: '/borrowrequest/borrowRequestForm', name: 'Borrow Requests Form', component: BorrowRequestForm },
  { path: '/complaints/complaintsList', name: 'Complaints List', component: ComplaintsList },
  { path: '/complaints/complaintsForm', name: 'Complaints Form', component: BorrowRequestForm }



];

export default routes;
