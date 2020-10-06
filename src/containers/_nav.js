export default [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
    badge: {
      color: 'info',
      text: 'NEW',
    }
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Employee']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Employee',
    to: '/employee/employeelist',
    icon: 'cil-user',
  }
]

