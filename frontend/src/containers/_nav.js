export default [{
    _name: 'CSidebarNav',
    _children: [{
            _name: 'CSidebarNavItem',
            name: 'Dashboard',
            to: '/dashboard',
            icon: 'cil-speedometer',
            items: []
        },
        {
            _name: 'CSidebarNavItem',
            name: 'PreOrder',
            to: '/order-management/pre-orders',
            icon: 'cil-list',
            items: []
        }
    ]
}]