import { createRouter,createWebHistory } from 'vue-router'
import AllItem from '../AllItem.vue'

const history = createWebHistory()
const routes = [
    {
        path: '/',
        name: 'ListAllItem',
        component: AllItem
    }
]

const router = createRouter({history, routes})

export default router