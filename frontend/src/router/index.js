import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'

Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'FrontEnd',
        component: () => import ('@/views/frontend/index'),
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/',
        name: 'Home',
        component: () => import ('@/containers/TheContainer'),
        children: [{
                path: 'dashboard',
                name: 'Dashboard',
                component: () => import ('@/views/Dashboard'),
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: 'order-management',
                redirect: '/',
                name: 'orderManagement',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [{
                        path: 'pre-orders',
                        name: 'PreOrder',
                        component: () => import ('@/views/pre-order/List'),
                        meta: {
                            requiresAuth: true
                        }
                    }
                ]
            },
        ]
    },
    {
        path: '/pages',
        redirect: '/pages/404',
        name: 'Pages',
        component: {
            render(c) { return c('router-view') }
        },
        children: [{
                path: '404',
                name: 'Page404',
                component: () => import ('@/views/pages/Page404'),
                meta: {
                    requiresAuth: false
                }
            },
            {
                path: 'login',
                name: 'Login',
                component: () => import ('@/views/pages/Login'),
                meta: {
                    requiresAuth: false
                }
            }
        ]
    }
]


const router = new Router({
    linkActiveClass: 'active',
    scrollBehavior: () => ({ y: 0 }),
    routes: routes,
    mode: 'history'
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next()
            return
        }
        next('/pages/login')
    } else {
        next()
    }
})

export default router