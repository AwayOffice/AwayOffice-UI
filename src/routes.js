import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const EmployeeList = React.lazy(() => import('./views/employee/EmployeeList'));
const EmployeeRegister = React.lazy(() => import('./views/employee/EmployeeRegister'));


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/employee/employeelist', name: 'Employee', component: EmployeeList },
  { path: '/employee/employeeRegister', name: 'Employee', component: EmployeeRegister }
];

export default routes;
