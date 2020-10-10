
export default [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-user',
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
    icon: 'cil-Bold',
  },

  {
    _tag: 'CSidebarNavItem',
    name: 'Borrow Requests',
    to: '/borrowrequest/borrowRequestList',
    icon: 'cil-star',
  },


  
]

