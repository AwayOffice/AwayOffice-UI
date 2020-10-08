export default [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-chart-table',
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // }
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['WorkFlow']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Employees',
    to: '/employee/employeelist',
    icon: 'cil-user',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Vendors',
    to: '/vendor/vendorList',
    icon: 'cil-user',
  },


  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Employees',
  //   to: '/employee/employeelist',
  //   icon: 'cil-user',
  // }

  
]

