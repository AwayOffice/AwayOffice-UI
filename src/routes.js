import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const EmployeeList = React.lazy(() => import('./views/employee/EmployeeList'));
const EmployeeRegister = React.lazy(() => import('./views/employee/EmployeeRegister'));
const VendorList = React.lazy(() => import('./views/vendors/VendorList'));
const VendorRegister = React.lazy(() => import('./views/vendors/VendorRegister'));
const BorrowRequestList = React.lazy(() => import('./views/borrowrequests/BorrowRequestList'));
const BorrowRequestForm = React.lazy(() => import('./views/borrowrequests/BorrowRequestForm'));
const ComplaintsList = React.lazy(() => import('./views/complaints/ComplaintsList'));
const ComplaintsForm= React.lazy(() => import('./views/complaints/ComplaintsForm'));






const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/employee/employeelist', name: 'Employee', component: EmployeeList },
  { path: '/employee/employeeRegister', name: 'Employee', component: EmployeeRegister },
  { path: '/vendor/vendorList', name: 'Vendor', component: VendorList },
  { path: '/vendor/vendorRegister', name: 'Vendor', component: VendorRegister },
  { path: '/borrowrequest/borrowRequestList', name: 'Borrow Requests', component: BorrowRequestList },
  { path: '/borrowrequest/borrowRequestForm', name: 'Borrow Requests Form', component: BorrowRequestForm },
  { path: '/complaints/complaintsList', name: 'Complaints List', component: ComplaintsList },
  { path: '/complaints/complaintsForm', name: 'Complaints Form', component: BorrowRequestForm }


];

export default routes;
