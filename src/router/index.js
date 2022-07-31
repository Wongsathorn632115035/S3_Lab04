import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import AboutView from '../views/AboutView.vue'
import EventDetails from '../views/event/EventDetailView.vue'
import EventRegisterView from '../views/event/EventRegisterView.vue'
import EventEditView from '../views/event/EventEditView.vue'
import EventLayoutView from '../views/event/EventLayoutView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [{
        path: '/',
        name: 'EventList',
        component: EventListView,
        props: (route) => ({
            page: parseInt(route.query.page) || 1,
            perPage: parseInt(route.query.perPage) || 3
        })
    },
    {
        path: '/about',
        name: 'about',
        component: AboutView
    },
    {
        path: '/event/:id',
        name: 'EventLayout',
        props: true,
        component: EventLayoutView,
        children: [{
                path: '',
                name: 'EventDetails',
                component: EventDetails,
                props: true
            },
            {
                path: 'register',
                name: 'EventRegister',
                props: true,
                component: EventRegisterView
            },
            {
                path: 'edit',
                name: 'EventEdit',
                props: true,
                component: EventEditView
            }
        ]
    },
    {
        path: '/404/:resource',
        name: '404Resource',
        component: NotFoundView,
        props: true
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFoundView
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router