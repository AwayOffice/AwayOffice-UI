
export default [
    {
        _tag: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-browser',
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
        icon: 'cil-people',
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Vendors',
        to: '/vendor/vendorList',
        icon: 'cil-bank',
    },
  {
    _tag: 'CSidebarNavItem',
    name: 'Borrow Requests',
    to: '/borrowrequest/borrowRequestList',
    icon: 'cil-devices',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Contracts',
    to: '/contract/contractList',
    icon: 'cil-color-border',
  },  {
    _tag: 'CSidebarNavItem',
    name: 'Purchase Order',
    to: '/purchaseOrder/purchaseOrderList',
    icon: 'cil-note-add',
  },
    {
        _tag: 'CSidebarNavItem',
        name: 'Complaints',
        to: '/complaints/complaintsList',
        icon: 'cil-warning',
    },
    // {
    //     _tag: 'CSidebarNavItem',
    //     name: 'Login',
    //     to: '/login',
    //     icon: 'cil-warning',

    // },

    {
        _tag: 'CSidebarNavDropdown',
        name: 'Inventory',
        route: '',
        icon: 'cil-library',
        _children: [
            {
                _tag: 'CSidebarNavItem',
                name: 'Asset Models',
                to: '/inventory/assetmodellist',
                icon: 'cil-storage',
            }
        ],
    },

]

