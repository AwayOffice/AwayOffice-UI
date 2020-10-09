import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const EmployeeList = React.lazy(() => import('./views/employee/EmployeeList'));
const EmployeeRegister = React.lazy(() => import('./views/employee/EmployeeRegister'));
const VendorList = React.lazy(() => import('./views/vendors/VendorList'));
const VendorRegister = React.lazy(() => import('./views/vendors/VendorRegister'));

const AssetModel = React.lazy(() => import('./views/Inventory/AssetModel/AssetModel'));
const AssetModelList = React.lazy(() => import('./views/Inventory/AssetModel/AssetModelList'));



const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/employee/employeelist', name: 'Employee', component: EmployeeList },
  { path: '/employee/employeeRegister', name: 'Employee', component: EmployeeRegister },
  { path: '/vendor/vendorList', name: 'Vendor', component: VendorList },
  { path: '/vendor/vendorRegister', name: 'Vendor', component: VendorRegister },

  { path: '/Inventory/assetmodel', name: 'Vendor', component: AssetModel },
  { path: '/Inventory/assetmodellist', name: 'Vendor', component: AssetModelList }
];

export default routes;
